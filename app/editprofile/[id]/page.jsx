"use client";

import "../../dashboard/dashboard.css";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Container from "../../components/Container/Container";
import Loader from "../../components/Loader/Loader";
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
import { db, storage } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";

const EditProfilePage = ({ params }) => {
  const { id } = params; // Fetch ID from the route
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
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
    const fetchVendorData = async () => {
      try {
        const docRef = doc(db, "vendors", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            businessName: data.businessName || "",
            ownerName: data.ownerName || "",
            email: data.email || "",
            phone: data.phone || "",
            location: data.location || "",
            bio: data.bio || "",
            websiteUrl: data.websiteUrl || "",
          });
          setServices(data.services || "");
          setExistingImages(data.images || []);
        }
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchVendorData();
  }, [id]);

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
    if (imageFiles.length + existingImages.length + files.length <= 8) {
      setImageFiles((prevFiles) => [...prevFiles, ...files]);
    } else {
      alert("You can upload up to 8 images only.");
    }
  };

  const handleDeleteImage = (index, isNew) => {
    if (isNew) {
      const updatedImages = imageFiles.filter((_, i) => i !== index);
      setImageFiles(updatedImages);
    } else {
      const updatedExistingImages = existingImages.filter(
        (_, i) => i !== index
      );
      setExistingImages(updatedExistingImages);
    }
  };

  const handleSubmit = async () => {
    try {
      const imageUrls = [...existingImages];

      // Upload new images to Firebase Storage
      for (const file of imageFiles) {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);

        const downloadURL = await getDownloadURL(storageRef);
        imageUrls.push(downloadURL);
      }

      // Update vendor data in Firestore
      const docRef = doc(db, "vendors", id);
      await updateDoc(docRef, {
        ...formData,
        services,
        images: imageUrls,
      });

      alert("Profile updated successfully!");
      router.push(`/vendors/${id}`); // Redirect to vendor details page
    } catch (error) {
      console.error("Error updating profile:", error);
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
                  value={formData.businessName}
                  fullWidth
                  margin="normal"
                  onChange={handleInputChange}
                />
                <TextField
                  label="Owner Name"
                  name="ownerName"
                  value={formData.ownerName}
                  fullWidth
                  margin="normal"
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ display: "flex", gap: "20px" }}>
                <TextField
                  label="Email"
                  name="email"
                  value={formData.email}
                  fullWidth
                  margin="normal"
                  onChange={handleInputChange}
                />
                <TextField
                  label="Phone"
                  name="phone"
                  value={formData.phone}
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
                    <MenuItem value={"Decorators"}>Decorators</MenuItem>
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
                  value={formData.location}
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
                  value={formData.bio}
                  fullWidth
                  margin="normal"
                  onChange={handleInputChange}
                />
                <TextField
                  label="Website URL"
                  name="websiteUrl"
                  value={formData.websiteUrl}
                  type="url"
                  fullWidth
                  margin="normal"
                  onChange={handleInputChange}
                />
              </div>
              {/* Other input fields similar to the dashboard page */}
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
                {existingImages.map((url, index) => (
                  <div
                    key={index}
                    style={{
                      position: "relative",
                      width: "100%",
                      paddingTop: "100%",
                      backgroundColor: "#f0f0f0",
                      borderRadius: "8px",
                      backgroundSize: "cover",
                      backgroundImage: `url(${url})`,
                    }}
                  >
                    <IconButton
                      style={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                      }}
                      size="small"
                      onClick={() => handleDeleteImage(index, false)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </div>
                ))}
                {imageFiles.map((file, index) => (
                  <div
                    key={index + existingImages.length}
                    style={{
                      position: "relative",
                      width: "100%",
                      paddingTop: "100%",
                      backgroundColor: "#f0f0f0",
                      borderRadius: "8px",
                      backgroundSize: "cover",
                      backgroundImage: `url(${URL.createObjectURL(file)})`,
                    }}
                  >
                    <IconButton
                      style={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                      }}
                      size="small"
                      onClick={() => handleDeleteImage(index, true)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </div>
                ))}
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                style={{
                  margin: "20px auto",
                  display: "block",
                }}
              >
                Update Profile
              </Button>
            </div>
          </Container>
          <Footer />
        </div>
      )}
    </>
  );
};

export default EditProfilePage;
