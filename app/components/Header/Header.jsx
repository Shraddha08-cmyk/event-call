"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import useDimension from "../../customHooks/useDimensionHook";
import logo from "../../../public/images/eventcall-transparent.png";
import "./Header.css";
import Container from "../Container/Container";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import {
  RecaptchaVerifier,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { GoogleAuthProvider, signOut } from "firebase/auth";

const Header = ({ categoryRef }) => {
  const { width } = useDimension();
  const isMobile = width < 768;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [displayName, setDisplayName] = useState("Login/Signup");
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const router = useRouter();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const toggleModal = (open) => {
    setModalOpen(open);
    setStep(1);
  };

  const handleViewServicesClick = () => {
    if (categoryRef.current) {
      categoryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleVendorLogin = () => {
    setStep(4);
  };

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Google login successful:", result);
        const user = result.user;

        // Set the profile picture from Google account
        setAvatarUrl(user.photoURL);
        setEmail(user.email); // Optional: Store email in state

        // Continue to the next step to fill in business name and owner name
        setStep(4);
      })
      .catch((error) => {
        console.error("Error with Google login:", error);
      });
  };

  const handleVendorSignup = async () => {
    try {
      const user = auth.currentUser; // Get the currently logged-in user

      if (!user && step === 1) {
        // Manual email/password signup
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }

        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log("User created successfully:", userCredential.user);

        // Proceed to the next step (business name, owner name, profile picture)
        setStep(4);
        return; // Exit here so that the next steps are done after user creation
      }

      if (step === 4 && user) {
        // Save the additional information to Firestore
        await setDoc(doc(db, "vendors", user.uid), {
          businessName,
          ownerName,
          email: user.email,
          profilePicture: avatarUrl || user.photoURL, // Use Google profile picture if none uploaded
        });

        // Store data in local storage
        localStorage.setItem("businessName", businessName);
        localStorage.setItem("ownerName", ownerName);

        // If a profile picture is uploaded, save it to local storage
        if (avatarUrl) {
          localStorage.setItem("profilePicture", avatarUrl);
        } else if (user.photoURL) {
          localStorage.setItem("profilePicture", user.photoURL); // For Google login
        }

        // Update UI to reflect logged-in state
        setDisplayName(businessName);
        setAvatarUrl(avatarUrl || user.photoURL);
        toggleModal(false);

        // Redirect to dashboard after successful signup
        router.push("/dashboard");
        console.log("Vendor information saved:", user);
      }
    } catch (error) {
      console.error("Error with vendor signup:", error);
    }
  };

  useEffect(() => {
    const storedBusinessName = localStorage.getItem("businessName");
    const storedAvatarUrl = localStorage.getItem("profilePicture");

    if (storedBusinessName) {
      setDisplayName(storedBusinessName);
    }

    if (storedAvatarUrl) {
      setAvatarUrl(storedAvatarUrl);
    }
  }, []);

  const handleLogout = () => {
    // Open confirmation dialog
    setLogoutConfirmOpen(true);
  };

  const handleLogoutConfirm = async (confirm) => {
    if (confirm) {
      try {
        await signOut(auth);

        // Clear local storage and reset state
        localStorage.removeItem("businessName");
        localStorage.removeItem("profilePicture");

        setDisplayName("Login/Signup");
        setAvatarUrl(null);

        router.push("/"); // Redirect to home after logout
        console.log("User logged out successfully");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    }
    setLogoutConfirmOpen(false);
  };

  const handleProfileClick = () => {
    if (displayName === "Login/Signup") {
      toggleModal(true);
    } else {
      handleLogout();
    }
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarUrl(e.target.result);
      };
      reader.readAsDataURL(file);
      setProfilePicture(file);
    }
  };

  const navigateToHome = () => {
    router.push("/");
  };

  const navigateToContact = () => {
    router.push("/contact-us");
  };

  const navigateToAbout = () => {
    router.push("/about");
  };

  const navigateToRegister = () => {
    router.push("/vendorRegister");
  };

  return (
    <Container>
      <div id="recaptcha-container" style={{ display: "none" }}></div>

      <div className="main_head">
        {isMobile && (
          <>
            <div className="hamburger-menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </div>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
              sx={{
                "& .MuiDrawer-paper": {
                  background:
                    "linear-gradient(to right, #ffffff 0%, #e72e77 87%)",
                },
              }}
            >
              <div className="drawer-header">
                <IconButton onClick={toggleDrawer(false)}>
                  <CloseIcon />
                </IconButton>
              </div>
              <List>
                <ListItem button onClick={handleProfileClick}>
                  <ListItemText primary={displayName} />
                </ListItem>
                <ListItem button onClick={toggleDrawer(false)}>
                  <ListItemText primary="Are you a Vendor?" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    toggleDrawer(false);
                    navigateToAbout();
                  }}
                >
                  <ListItemText primary="About" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    toggleDrawer(false);
                    navigateToContact();
                  }}
                >
                  <ListItemText primary="Contact" />
                </ListItem>
              </List>
            </Drawer>
          </>
        )}
        <div className={isMobile ? "logo-container-mobile" : "logo-container"}>
          <Image
            src={logo}
            alt="logo"
            className="logo-header"
            height={50}
            width={130}
            onClick={navigateToHome}
            style={{ cursor: "pointer" }}
          />
        </div>
        {isMobile ? (
          <div className="avatar-mobile" onClick={handleProfileClick}>
            <Avatar src={avatarUrl} />
          </div>
        ) : (
          <>
            <div className="nav">
              <h3 onClick={navigateToAbout}>About</h3>
              <h3 onClick={handleViewServicesClick}>Services</h3>
              <h3 onClick={navigateToContact}>Contact</h3>
            </div>
            <div className="profile">
              <div
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
                onClick={handleProfileClick}
              >
                <Avatar src={avatarUrl} />
                <h5>{displayName}</h5>
              </div>
              <p onClick={navigateToRegister} style={{ cursor: "pointer" }}>
                Are you a Vendor?
              </p>
            </div>
          </>
        )}
      </div>

      {/* Modal for Login / Signup */}
      <Modal open={modalOpen} onClose={() => toggleModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
          }}
        >
          {step === 1 && (
            <>
              <h2>Vendor Registration</h2>
              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleVendorSignup}
                fullWidth
                style={{
                  background: "rgb(231, 46, 119)",
                }}
              >
                Continue
              </Button>
              <Button
                variant="text"
                color="secondary"
                onClick={handleGoogleLogin}
                fullWidth
              >
                Continue with Google
              </Button>
            </>
          )}
          {/* {step === 4 && (
            <>
              <h2>Complete Your Profile</h2>
              <TextField
                label="Business Name"
                fullWidth
                margin="normal"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
              <TextField
                label="Owner Name"
                fullWidth
                margin="normal"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleVendorSignup}
                fullWidth
              >
                Submit
              </Button>
            </>
          )} */}
          {step === 4 && (
            <>
              <h2>Complete Your Profile</h2>
              <TextField
                label="Business Name"
                fullWidth
                margin="normal"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
              <TextField
                label="Owner Name"
                fullWidth
                margin="normal"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
              />

              {/* Clickable Avatar for Uploading Profile Picture */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "20px 0",
                }}
              >
                <Avatar
                  src={avatarUrl} // Show the selected profile picture or a default avatar
                  alt="Upload Profile Picture"
                  sx={{ width: 80, height: 80, cursor: "pointer" }}
                  onClick={() =>
                    document.getElementById("profilePictureInput").click()
                  } // Trigger file input on avatar click
                />
              </div>

              {/* Hidden File Input for Profile Picture */}
              <input
                type="file"
                id="profilePictureInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleProfilePictureChange} // Handle the profile picture upload
              />

              <Button
                variant="contained"
                color="primary"
                onClick={handleVendorSignup}
                fullWidth
                style={{
                  background: "rgb(231, 46, 119)",
                }}
              >
                Submit
              </Button>
            </>
          )}
        </Box>
      </Modal>

      {/* Logout Confirmation Dialog */}
      <Modal
        open={logoutConfirmOpen}
        onClose={() => setLogoutConfirmOpen(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 250,
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            textAlign: "center",
          }}
        >
          <h3>Are you sure you want to logout?</h3>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleLogoutConfirm(true)}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleLogoutConfirm(false)}
          >
            No
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default Header;
