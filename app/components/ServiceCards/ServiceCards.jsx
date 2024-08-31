"use client";

import React, { forwardRef, useState } from "react";
import "./ServiceCards.css";
import Container from "../Container/Container";

const ServiceCards = forwardRef((props, ref) => {
  const [visibleRows, setVisibleRows] = useState(1);

  const projects = [
    {
      image: "/images/makeup.jpg",
      title: "Makeup Artists",
      description:
        "Achieve your dream look with our expert makeup artists, specializing in flawless, personalized beauty for weddings and special events.",
      // link: "https://momeals.in",
    },
    {
      image: "/images/photographer.jpg",
      title: "Photographers",
      description:
        "Capture every moment with our skilled photographers, delivering stunning, timeless images for weddings and special occasions.",
      // link: "https://main--sprightly-liger-25075d.netlify.app/pokemon/1",
    },
    {
      image: "/images/wedvenue.jpg",
      title: "Wedding Venues",
      description:
        "Discover the perfect wedding venue that sets the stage for your unforgettable day, with breathtaking settings and exceptional service.",
      // link: "https://localshopindia.com",
    },
    {
      image: "/images/mehandi.jpg",
      title: "Mehandi Artists",
      description:
        "Create beautiful, intricate designs with our skilled Mehandi artists, adding a touch of elegance and tradition to your special celebrations.",
      // link: "https://localshopindia.com",
    },
    {
      image: "/images/dj.avif",
      title: "DJ",
      description:
        "Set the perfect vibe for your celebration with our talented DJs, delivering an unforgettable musical experience tailored to your event.",
      // link: "https://localshopindia.com",
    },
    {
      image: "/images/choreographer.jpg",
      title: "Choreographer",
      description:
        "Bring your celebrations to life with our expert choreographers, creating memorable dance performances that add joy and excitement to your special day.",
      // link: "https://localshopindia.com",
    },
    {
      image: "/images/anchor.jpeg",
      title: "Anchors",
      description:
        "Engage and entertain your guests with our professional anchors, ensuring your event flows smoothly with energy, charm, and charisma.",
      // link: "https://localshopindia.com",
    },
    {
      image: "/images/grrom.avif",
      title: "Groom Wear",
      description:
        "Find the perfect groom wear that combines style and tradition, ensuring you look dashing on your special day.",
      // link: "https://localshopindia.com",
    },
    {
      image: "/images/bride.webp",
      title: "Bride Wear",
      description:
        "Explore stunning bridal wear that blends elegance and sophistication, making you feel radiant on your unforgettable day.",
      // link: "https://localshopindia.com",
    },
  ];

  const itemsPerRow = 4;
  const visibleProjects = projects.slice(0, visibleRows * itemsPerRow);

  const handleSeeMore = () => {
    setVisibleRows((prev) => prev + 1);
  };

  return (
    <div id="portfolio" ref={ref}>
      <Container>
        <h1 className="sub-title">Vendor's Categories</h1>
        <div className="work-list">
          {visibleProjects.map((project, index) => (
            <div className="work" key={index}>
              <img src={project.image} alt={project.title} />
              <div className="layer">
                <h3>{project.title}</h3>
                <p style={{ color: "#fff" }}>{project.description}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
        {visibleProjects.length < projects.length && (
          <button className="btn" onClick={handleSeeMore}>
            See more
          </button>
        )}
      </Container>
    </div>
  );
});

export default ServiceCards;
