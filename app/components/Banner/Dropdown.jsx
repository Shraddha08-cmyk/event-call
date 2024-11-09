"use client";

import React, { useState } from "react";
import "./Banner.css";
import { useRouter } from "next/navigation";
import Container from "../Container/Container";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

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

const Dropdown = () => {
  const [vendor, setVendor] = useState("");
  const [city, setCity] = useState("");
  const router = useRouter();

  const handleChange = (event) => {
    setVendor(event.target.value);
  };

  const handleChangeCity = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = () => {
    if (vendor && city) {
      router.push(`/services/${vendor}?city=${city}`);
    }
  };

  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="banner-dropdown" style={{ marginTop: "20px" }}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Select City
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={city}
              onChange={handleChangeCity}
              label="Select City"
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
              <MenuItem value="venue">Wedding Venues</MenuItem>
              <MenuItem value="photography">Photography</MenuItem>
              <MenuItem value="choreographer">Choreographers</MenuItem>
              <MenuItem value="pandit">Pandits</MenuItem>
              <MenuItem value="makeupartist">Makeup Artists</MenuItem>
              <MenuItem value="decorators">Decorators</MenuItem>
              <MenuItem value="mehandiartist">Mehandi Artists</MenuItem>
              <MenuItem value="dj">DJ</MenuItem>
              <MenuItem value="groomWear">Groom Wear</MenuItem>
              <MenuItem value="brideWears">Bride Wear</MenuItem>
              <MenuItem value="anchor">Anchors</MenuItem>
              {/* <MenuItem value="pre-wedding-shoot-loactions">
                Pre-Wedding Shoot Locations
              </MenuItem> */}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            style={{
              backgroundColor: "#e72e77",
              textTransform: "capitalize",
            }}
            onClick={handleSearch} // Add onClick event handler
          >
            Search
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Dropdown;
