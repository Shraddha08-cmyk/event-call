// "use client";

// import "./dashboard.css";
// import React, { useState, useEffect } from "react";
// import Header from "../components/Header/Header";
// import Footer from "../components/Footer/Footer";
// import Container from "../components/Container/Container";
// import Loader from "../components/Loader/Loader";
// import {
//   TextField,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
// } from "@mui/material";

// const dashboardPage = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [services, setServices] = useState("");
//   const [imageFiles, setImageFiles] = useState([]);

//   useEffect(() => {
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);
//   }, []);

//   const handleServiceChange = (event) => {
//     setServices(event.target.value);
//   };

//   const handleImageUpload = (event) => {
//     const files = Array.from(event.target.files);

//     if (imageFiles.length + files.length <= 8) {
//       setImageFiles((prevFiles) => [...prevFiles, ...files]);
//     } else {
//       alert("You can upload up to 8 images only.");
//     }
//   };

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div
//           style={{
//             background: "linear-gradient(to right, #ffffff 0%, #e72e77 87%)",
//           }}
//         >
//           <Header />
//           <Container>
//             <div>
//               <div style={{ display: "flex", gap: "20px" }}>
//                 <TextField label="Business Name" fullWidth margin="normal" />
//                 <TextField label="Owner Name" fullWidth margin="normal" />
//               </div>
//               <div style={{ display: "flex", gap: "20px" }}>
//                 <TextField label="Email" fullWidth margin="normal" />
//                 <TextField label="Phone" fullWidth margin="normal" />
//               </div>

//               <div style={{ display: "flex", gap: "20px" }}>
//                 <FormControl fullWidth margin="normal">
//                   <InputLabel id="services-label">Services</InputLabel>
//                   <Select
//                     labelId="services-label"
//                     value={services}
//                     label="Services"
//                     onChange={handleServiceChange}
//                   >
//                     <MenuItem value={"Makeup Artist"}>Makeup Artist</MenuItem>
//                     <MenuItem value={"Mehandi Artist"}>Mehandi Artist</MenuItem>
//                     <MenuItem value={"Photography"}>Photography</MenuItem>
//                     <MenuItem value={"DJ"}>DJ</MenuItem>
//                     <MenuItem value={"Decoration"}>Decoration</MenuItem>
//                     <MenuItem value={"Choreographer"}>Choreographer</MenuItem>
//                     <MenuItem value={"Catering"}>Catering</MenuItem>
//                     <MenuItem value={"Bride and Groom Wear"}>
//                       Bride & Groom Wear
//                     </MenuItem>
//                     <MenuItem value={"Venue"}>Venue</MenuItem>
//                     <MenuItem value={"Anchor"}>Anchor</MenuItem>
//                   </Select>
//                 </FormControl>

//                 <TextField label="Location" fullWidth margin="normal" />
//               </div>

//               <div style={{ display: "flex", gap: "20px" }}>
//                 <TextField
//                   label="Bio"
//                   multiline
//                   rows={4}
//                   fullWidth
//                   margin="normal"
//                 />

//                 <TextField
//                   label="Website URL"
//                   type="url"
//                   fullWidth
//                   margin="normal"
//                 />
//               </div>

//               <input
//                 accept="image/*"
//                 type="file"
//                 multiple
//                 onChange={handleImageUpload}
//                 style={{ margin: "16px 0", display: "block" }}
//               />

//               {imageFiles.length > 0 && (
//                 <div style={{ marginTop: "16px" }}>
//                   <div
//                     style={{
//                       display: "grid",
//                       gridTemplateColumns: "repeat(4, 1fr)",
//                       gap: "8px",
//                       maxWidth: "100%",
//                     }}
//                   >
//                     {imageFiles.map((file, index) => (
//                       <div key={index} style={{ position: "relative" }}>
//                         <img
//                           src={URL.createObjectURL(file)}
//                           alt={`uploaded ${index}`}
//                           style={{
//                             width: "100%",
//                             height: "auto",
//                             objectFit: "cover",
//                             borderRadius: "4px",
//                           }}
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </Container>
//           <Footer />
//         </div>
//       )}
//     </>
//   );
// };

// export default dashboardPage;
// dashboardPage.js
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
} from "@mui/material";
import { db } from "../firebase"; // Importing the firebase config
import { collection, addDoc } from "firebase/firestore";

const dashboardPage = () => {
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

  const handleSubmit = async () => {
    try {
      const docRef = await addDoc(collection(db, "vendors"), {
        ...formData,
        services,
        images: imageFiles.map((file) => file.name), // Assuming you're storing image URLs or names
        createdAt: new Date(),
      });
      alert("Document written with ID: " + docRef.id);
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
                    <MenuItem value={"Decoration"}>Decoration</MenuItem>
                    <MenuItem value={"Choreographer"}>Choreographer</MenuItem>
                    <MenuItem value={"Catering"}>Catering</MenuItem>
                    <MenuItem value={"Bride and Groom Wear"}>
                      Bride & Groom Wear
                    </MenuItem>
                    <MenuItem value={"Venue"}>Venue</MenuItem>
                    <MenuItem value={"Anchor"}>Anchor</MenuItem>
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
                style={{ margin: "16px 0", display: "block" }}
              />

              {imageFiles.length > 0 && (
                <div style={{ marginTop: "16px" }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: "8px",
                      maxWidth: "100%",
                    }}
                  >
                    {imageFiles.map((file, index) => (
                      <div key={index} style={{ position: "relative" }}>
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`uploaded ${index}`}
                          style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "cover",
                            borderRadius: "4px",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                style={{ marginTop: "20px" }}
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
