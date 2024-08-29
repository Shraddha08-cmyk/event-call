"use client";

import React, { useState, useEffect, useRef } from "react";
import "./Banner.css";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import Container from "../Container/Container";

// Single video source
const videos = [
  "/videos/treaser.mp4", // Replace this with the actual video source
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 3.4 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Banner = () => {
  const [vendor, setVendor] = useState("");
  const [city, setCity] = useState("");
  const videoRef = useRef(null);

  const handleChange = (event) => {
    setVendor(event.target.value);
  };

  const handleChangeCity = (event) => {
    setCity(event.target.value);
  };

  return (
    <div className="banner">
      {/* Wrapper with 16:9 aspect ratio */}
      <div
        className="video-wrapper"
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: "56.25%", // 16:9 aspect ratio
          overflow: "hidden",
          backgroundColor: "#000", // In case video doesn't load
          margin: 0,
        }}
      >
        <video
          ref={videoRef}
          src={videos[0]} // Displaying only one video
          autoPlay
          muted
          loop
          className="banner-video"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            objectFit: "cover",
            margin: 0,
            padding: 0,
          }}
        />

        {/* Overlay content */}
        <div
          className="overlay-content"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            zIndex: 1, // Ensures the content appears above the video
          }}
        >
          <h1 className="banner_head">
            All In One <span style={{ color: "#e72e77" }}>Event Services</span>{" "}
            Marketplace
          </h1>
          <h1 className="banner_head2">
            Let's Find The Best Vendors In Your Own City
          </h1>
          {/* <div className="banner-dropdown" style={{ marginTop: "20px" }}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Select Vendor Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={vendor}
                onChange={handleChange}
                label="Select Vendor Type"
                MenuProps={MenuProps}
              >
                <MenuItem value="all-categories">All Categories</MenuItem>
                <MenuItem value="wedding-venues">Wedding Venues</MenuItem>
                <MenuItem value="photographers">Photographers</MenuItem>
                <MenuItem value="choreographers">Choreographers</MenuItem>
                <MenuItem value="pandits">Pandits</MenuItem>
                <MenuItem value="makeup-artists">Makeup Artists</MenuItem>
                <MenuItem value="decorators">Decorators</MenuItem>
                <MenuItem value="mehandi-artists">Mehandi Artists</MenuItem>
                <MenuItem value="dj">DJ</MenuItem>
                <MenuItem value="groom-wear">Groom Wear</MenuItem>
                <MenuItem value="bride-wear">Bride Wear</MenuItem>
                <MenuItem value="anchors">Anchors</MenuItem>
                <MenuItem value="pre-wedding-shoot-loactions">
                  Pre-Wedding Shoot Locations
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Select City
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={city}
                onChange={handleChangeCity}
                label="Select Vendor Type"
                MenuProps={MenuProps}
              >
                <MenuItem value="all-cities">All Cities</MenuItem>
                <MenuItem value="konch">Konch</MenuItem>
                <MenuItem value="kanpur">Kanpur</MenuItem>
                <MenuItem value="lucknow">Lucknow</MenuItem>
                <MenuItem value="orai">Orai</MenuItem>
                <MenuItem value="bhopal">Bhopal</MenuItem>
                <MenuItem value="gwalior">Gwalior</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#e72e77",
                textTransform: "capitalize",
              }}
            >
              Search
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Banner;
