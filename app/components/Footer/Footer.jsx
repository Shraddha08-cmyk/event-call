"use client";

import React from "react";
import "./Footer.css";
import Container from "../Container/Container";
import logo from "../../../public/images/eventcall-transparent.png";
import Image from "next/image";
import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();

  const navigateToContact = () => {
    router.push("/contact-us");
  };

  const navigateToAbout = () => {
    router.push("/about");
  };

  return (
    <>
      <Container>
        <div className="footer">
          <div>
            <Image
              src={logo}
              alt="logo"
              className="logo"
              height={70}
              width={170}
            />
          </div>
          <div className="company">
            <h3>Company</h3>
            <h5 onClick={navigateToAbout}>About Us</h5>
            <h5 onClick={navigateToContact}>Contact</h5>
            <h5>Blog</h5>
          </div>
          <div className="support">
            <h3>Support</h3>
            <h5>Privacy Policy</h5>
            <h5>Terms & Conditions</h5>
            <h5>Disclaimer</h5>
          </div>
          <div className="contact">
            <h3>Contact Us</h3>
            <h5>
              <a
                href="mailto:eventcallofficial@gmail.com"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                eventcallofficial@gmail.com
              </a>
            </h5>
            <h5>
              <a
                href="tel:+916387256816"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                +91 6387256816
              </a>
            </h5>
            <div className="cntct-icon">
              <a
                href="https://www.linkedin.com/company/topper-router-logistics-pvt-ltd/"
                target="_blank"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Facebook />
              </a>
              <a
                href="https://x.com/Eventcall_"
                target="_blank"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Twitter />
              </a>
              <a
                href="https://www.instagram.com/eventcall_"
                target="_blank"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Instagram />
              </a>
              <a
                href="https://www.youtube.com/@eventcall?si=9C1Y9CSjXI_5ehcE"
                target="_blank"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <YouTube />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Footer;
