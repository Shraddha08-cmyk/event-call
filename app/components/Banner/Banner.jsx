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

const videos = ["/videos/banner.mp4"];

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
      <div
        className="video-wrapper"
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: "56.25%",
          overflow: "hidden",
          backgroundColor: "#000",
          margin: 0,
        }}
      >
        <video
          ref={videoRef}
          src={videos[0]}
          autoPlay
          muted
          loop
          preload="auto"
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
        <Container>
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
              zIndex: 1,
            }}
          >
            <h1 className="banner_head">
              All In One{" "}
              <span style={{ color: "#e72e77" }}>Event Services</span>{" "}
              Marketplace
            </h1>
            <h1 className="banner_head2">
              Let's Find The Best Vendors In Your Own City
            </h1>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Banner;
