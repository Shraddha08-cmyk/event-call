"use client";

import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Image from "next/image";
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
  Button,
} from "@mui/material";

const cities = [
  "Konch",
  "Bhopal",
  "Kanpur",
  "Lucknow",
  "Orai",
  "Jhansi",
  "Gwalior",
];

const GroomWearsPage = () => {
  const [groomWears, setGroomWears] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const fetchGroomWears = async () => {
      let q = query(
        collection(db, "vendors"),
        where("services", "==", "Groom Wear")
      );

      if (selectedCity) {
        q = query(
          collection(db, "vendors"),
          where("services", "==", "Groom Wear"),
          where("location", "==", selectedCity)
        );
      }

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setGroomWears(data);
      setIsLoading(false);
    };

    fetchGroomWears();
  }, [selectedCity]);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
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
            {groomWears.length > 0 ? (
              <Grid container spacing={3}>
                {groomWears.map((groomWear) => (
                  <Grid item xs={12} sm={6} md={4} key={groomWear.id}>
                    <Card>
                      {groomWear.images && groomWear.images.length > 0 && (
                        <CardMedia
                          component="img"
                          height="200"
                          image={groomWear.images[0]}
                          alt={groomWear.businessName}
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
                          <Typography
                            variant="p"
                            style={{ fontWeight: "bold" }}
                          >
                            {groomWear.businessName}
                          </Typography>
                          <Typography
                            variant="p"
                            style={{ fontWeight: "bold" }}
                          >
                            {groomWear.location}
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
                          {groomWear.bio}
                        </Typography>
                        <div>
                          <button
                            className="btn"
                            style={{ margin: "10px auto" }}
                          >
                            View More
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <p>No Groom Wears available</p>
            )}
          </Container>
          <Footer />
        </div>
      )}
    </>
  );
};

export default GroomWearsPage;
