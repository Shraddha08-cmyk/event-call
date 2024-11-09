"use client";

import "./dashboard.css";
import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Container from "../components/Container/Container";
import Loader from "../components/Loader/Loader";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const dashboardPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    websiteUrl: "",
  });

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleServiceChange = (event) => {
    setServices(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);

    if (imageFiles.length + files.length <= 8) {
      setImageFiles((prevFiles) => [...prevFiles, ...files]);
    } else {
      alert("You can upload up to 8 images only.");
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImages = imageFiles.filter((_, i) => i !== index);
    setImageFiles(updatedImages);
  };

  const handleSubmit = async () => {
    try {
      const imageUrls = [];

      // Upload images to Firebase Storage
      for (const file of imageFiles) {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);

        // Get the download URL and store it
        const downloadURL = await getDownloadURL(storageRef);
        imageUrls.push(downloadURL);
      }

      // Save vendor data to Firestore, including image URLs
      const docRef = await addDoc(collection(db, "vendors"), {
        ...formData,
        services,
        images: imageUrls,
        createdAt: new Date(),
        status: null, // Initialize status as null
      });

      alert("Document written with ID: " + docRef.id);

      // Redirect to the specific service page based on the selected service
      const serviceRoute = services.toLowerCase().replace(/\s/g, "");
      router.push(`/services/${serviceRoute}`);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          style={{
            background: "linear-gradient(to right, #ffffff 0%, #e72e77 87%)",
          }}
        >
          <Header />
          <Container>
            <div>
              <div style={{ display: "flex", gap: "20px" }}>
                <TextField
                  label="Business Name"
                  name="businessName"
                  fullWidth
                  margin="normal"
                  onChange={handleInputChange}
                />
                <TextField
                  label="Owner Name"
                  name="ownerName"
                  fullWidth
                  margin="normal"
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ display: "flex", gap: "20px" }}>
                <TextField
                  label="Email"
                  name="email"
                  fullWidth
                  margin="normal"
                  onChange={handleInputChange}
                />
                <TextField
                  label="Phone"
                  name="phone"
                  fullWidth
                  margin="normal"
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ display: "flex", gap: "20px" }}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="services-label">Services</InputLabel>
                  <Select
                    labelId="services-label"
                    value={services}
                    label="Services"
                    onChange={handleServiceChange}
                  >
                    <MenuItem value={"Makeup Artist"}>Makeup Artist</MenuItem>
                    <MenuItem value={"Mehandi Artist"}>Mehandi Artist</MenuItem>
                    <MenuItem value={"Photography"}>Photography</MenuItem>
                    <MenuItem value={"DJ"}>DJ</MenuItem>
                    <MenuItem value={"Decoration"}>Decorators</MenuItem>
                    <MenuItem value={"Choreographer"}>Choreographer</MenuItem>
                    <MenuItem value={"Catering"}>Catering</MenuItem>
                    <MenuItem value={"Bride and Groom Wear"}>
                      Bride & Groom Wear
                    </MenuItem>
                    <MenuItem value={"Venue"}>Venue</MenuItem>
                    <MenuItem value={"Anchor"}>Anchor</MenuItem>
                    <MenuItem value={"Pandit"}>Pandit</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Location"
                  name="location"
                  fullWidth
                  margin="normal"
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ display: "flex", gap: "20px" }}>
                <TextField
                  label="Bio"
                  name="bio"
                  multiline
                  rows={4}
                  fullWidth
                  margin="normal"
                  onChange={handleInputChange}
                />
                <TextField
                  label="Website URL"
                  name="websiteUrl"
                  type="url"
                  fullWidth
                  margin="normal"
                  onChange={handleInputChange}
                />
              </div>
              <input
                accept="image/*"
                type="file"
                multiple
                onChange={handleImageUpload}
                style={{ margin: "16px 0", display: "none" }}
                id="file-upload"
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "8px",
                  marginTop: "16px",
                }}
              >
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    style={{
                      position: "relative",
                      display: "block",
                      width: "100%",
                      paddingTop: "100%",
                      backgroundColor: "#f0f0f0",
                      borderRadius: "8px",
                      border: "2px dashed #ccc",
                      backgroundSize: "cover",
                      backgroundImage:
                        imageFiles[index] &&
                        `url(${URL.createObjectURL(imageFiles[index])})`,
                    }}
                  >
                    {!imageFiles[index] ? (
                      <label
                        htmlFor="file-upload"
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          fontSize: "24px",
                          color: "#ccc",
                          cursor: "pointer",
                        }}
                      >
                        +
                      </label>
                    ) : (
                      <IconButton
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                          backgroundColor: "rgba(255, 255, 255, 0.8)",
                        }}
                        size="small"
                        onClick={() => handleDeleteImage(index)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </div>
                ))}
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                className="btn"
                style={{
                  display: "block",
                  margin: "50px auto",
                  width: "fit-content",
                  border: "1px solid #e72e77",
                  background: "#fff",
                  padding: "14px 50px",
                  borderRadius: "6px",
                  textDecoration: "none",
                  color: "#e72e77",
                  transition: "background 0.5s",
                }}
              >
                Submit
              </Button>
            </div>
          </Container>
          <Footer />
        </div>
      )}
    </>
  );
};

export default dashboardPage;
