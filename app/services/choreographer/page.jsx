"use client";

import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import Loader from "../../components/Loader/Loader";
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "../../components/ServiceCards/ServiceCards.css";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import VerifiedIcon from "@mui/icons-material/Verified";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import { useRouter } from "next/navigation";

const cities = [
  "Konch",
  "Bhopal",
  "Kanpur",
  "Lucknow",
  "Orai",
  "Jhansi",
  "Gwalior",
];

const ChoreographerPage = () => {
  const [premiumVendors, setPremiumVendors] = useState([]);
  const [verifiedVendors, setVerifiedVendors] = useState([]);
  const [nonVerifiedVendors, setNonVerifiedVendors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchVendors = async () => {
      let q = query(
        collection(db, "vendors"),
        where("services", "==", "Choreographer")
      );

      if (selectedCity) {
        q = query(
          collection(db, "vendors"),
          where("services", "==", "Choreographer"),
          where("location", "==", selectedCity)
        );
      }

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt.toDate(),
      }));

      const premium = data.filter((vendor) => vendor.status === "premium");
      const verified = data.filter((vendor) => vendor.status === "verified");
      const nonVerified = data.filter(
        (vendor) => vendor.status === "non-verified"
      );

      setPremiumVendors(premium);
      setVerifiedVendors(verified);
      setNonVerifiedVendors(nonVerified);
      setIsLoading(false);

      // nonVerified.forEach((vendor) => {
      //   setTimeout(() => {
      //     setNonVerifiedVendors((prev) =>
      //       prev.filter((v) => v.id !== vendor.id)
      //     );

      //     deleteDoc(doc(db, "vendors", vendor.id));
      //   }, 600000);
      // });
    };

    fetchVendors();
  }, [selectedCity]);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleViewMore = (vendorId) => {
    router.push(`/vendors/${vendorId}`);
  };

  const renderVendors = (vendors) => (
    <Grid container spacing={3} style={{ padding: "50px 0px" }}>
      {vendors.map((vendor) => (
        <Grid item xs={12} sm={6} md={4} key={vendor.id}>
          <Card>
            {vendor.images && vendor.images.length > 0 && (
              <CardMedia
                component="img"
                height="200"
                image={vendor.images[0]}
                alt={vendor.businessName}
                style={{ objectFit: "cover" }}
              />
            )}
            <CardContent>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  {vendor.status === "premium" && (
                    <WorkspacePremiumIcon
                      style={{ color: "#FFD700", marginRight: "5px" }}
                    />
                  )}
                  {vendor.status === "verified" && (
                    <VerifiedIcon
                      style={{ color: "#4CAF50", marginRight: "5px" }}
                    />
                  )}
                  {vendor.status === "non-verified" && (
                    <NewReleasesIcon
                      style={{ color: "#F44336", marginRight: "5px" }}
                    />
                  )}
                  <Typography variant="p" style={{ fontWeight: "bold" }}>
                    {vendor.businessName}
                  </Typography>
                </div>
                <Typography variant="p" style={{ fontWeight: "bold" }}>
                  {vendor.location}
                </Typography>
              </div>
              <Typography
                variant="body2"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 5,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {vendor.bio}
              </Typography>
              <div>
                <button
                  className="btn"
                  style={{ margin: "10px auto" }}
                  onClick={() => handleViewMore(vendor.id)}
                >
                  View More
                </button>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

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
            <FormControl
              variant="outlined"
              margin="normal"
              style={{ width: "200px" }}
            >
              <InputLabel>Select City</InputLabel>
              <Select
                value={selectedCity}
                onChange={handleCityChange}
                label="Select City"
              >
                <MenuItem value="">
                  <em>All Cities</em>
                </MenuItem>
                {cities.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div>
              {renderVendors(premiumVendors)}
              {renderVendors(verifiedVendors)}
              {renderVendors(nonVerifiedVendors)}
            </div>
          </Container>
          <Footer />
        </div>
      )}
    </>
  );
};

export default ChoreographerPage;
