"use client";

import React, { useState, useEffect } from "react";
import "./about.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Container from "../components/Container/Container";
import Image from "next/image";
import bullet from "../../public/images/bullet.svg";

const aboutPage = () => {
  const images = ["/images/wedanim.png", "/images/engage.png"];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        setFade(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      style={{
        background: "linear-gradient(to right, #ffffff 0%, #e72e77 87%)",
      }}
    >
      <Header />
      <Container>
        <div className="about-content">
          <div className="portfolioSec mb-40">
            <div className="portfolioTop">
              <div className="reactangle  mr-35"></div>
              <div className="rightportfolio">
                <h2>About Us</h2>
                <p>
                  EventCall is a comprehensive event planning platform designed
                  to simplify and enhance the process of organizing any event.
                  Whether you’re planning a wedding, a corporate function, a
                  birthday party, or any other special occasion, EventCall
                  provides all the tools and resources you need to make your
                  event a success.
                </p>
              </div>
            </div>
          </div>

          <div className="portfolioSec mb-40">
            <div className="portfolioTop">
              <div className="reactangle mr-35"></div>
              <div className="rightportfolio">
                <h2>How We Do What We Do?</h2>
                <p>
                  Our platform features an extensive vendor directory where you
                  can explore a curated list of top-rated professionals across
                  various categories. Whether you need a wedding planner,
                  photographer, caterer, or decorator, EventCall provides
                  detailed vendor profiles with essential information, including
                  services, pricing, availability, and customer reviews. This
                  transparency allows you to make informed decisions and choose
                  the right vendors for your event.
                </p>
              </div>
            </div>
          </div>

          <div className="portfolioTop">
            <div className="reactangle mr-35"></div>
            <div className="rightportfolio">
              <h2>How It Works:</h2>
              <div className="mb-80 mt-50">
                <div className="android-network">
                  <div className="bullet-section nlp-bullet">
                    <div className="bullet-img">
                      <Image
                        className="lazy"
                        alt="Learning and development"
                        src={bullet}
                        style={{ display: "inline-block" }}
                      />
                    </div>
                    <p>
                      Search and Filter: Use our advanced search and filter
                      options to find vendors and services that match your
                      specific needs and preferences.
                    </p>
                  </div>
                  <div className="bullet-section nlp-bullet">
                    <div className="bullet-img">
                      <Image
                        className="lazy"
                        alt="Thoughtful"
                        src={bullet}
                        style={{ display: "inline-block" }}
                      />
                    </div>
                    <p>
                      Compare and Choose: Compare different options based on
                      reviews, pricing, and service details to make the best
                      choices for your event.
                    </p>
                  </div>
                  <div className="bullet-section nlp-bullet">
                    <div className="bullet-img">
                      <Image
                        className="lazy"
                        alt="Open-culture"
                        src={bullet}
                        style={{ display: "inline-block" }}
                      />
                    </div>
                    <p>
                      Plan with Ease: Utilize our checklist and resources to
                      streamline your planning process, ensuring a smooth and
                      stress-free experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`about-anim ${fade ? "fade-in" : "fade-out"}`}>
          <Image
            src={images[currentImageIndex]}
            alt="About Image"
            width={500}
            height={500}
            style={{
              position: "absolute",
              top: "70%",
              left: "80%",
              transform: "translate(-50%, -50%)",
              borderRadius: "10px",
              zIndex: 1,
            }}
            className="about-image"
          />
        </div>
        <div className="team">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h2 className="team-head">Meet Our Team</h2>
          </div>
          <div className="team-member">
            <div>
              <h3>Rahul Kashyap</h3>
              <p>Founder & CEO</p>
            </div>
            <div>
              <h3>Sumit Singh Chauhan</h3>
              <p>Advisor (SDE at UHG)</p>
            </div>
            <div>
              <h3>Sahil Chaudhary</h3>
              <p>Co-Founder</p>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default aboutPage;
