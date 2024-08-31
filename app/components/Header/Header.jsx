"use client";

import React, { useState } from "react";
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
import { useRouter } from "next/navigation";

const Header = ({ categoryRef }) => {
  const { width } = useDimension();
  const isMobile = width < 768;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
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

  const handleViewServicesClick = () => {
    if (categoryRef.current) {
      categoryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Container>
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
                <ListItem button onClick={toggleDrawer(false)}>
                  <ListItemText primary="Login/Signup" />
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
                <ListItem button onClick={toggleDrawer(false)}>
                  <ListItemText
                    primary="Services"
                    onClick={handleViewServicesClick}
                  />
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    toggleDrawer(false)();
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
          <div className="avatar-mobile">
            <Avatar />
          </div>
        ) : (
          <>
            <div className="nav">
              <h3 onClick={navigateToAbout}>About</h3>
              <h3 onClick={handleViewServicesClick}>Services</h3>
              <h3 onClick={navigateToContact}>Contact</h3>
            </div>
            <div className="profile">
              <Avatar />
              <h5>Login/Signup</h5>
              <p>Are you a Vendor?</p>
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default Header;
