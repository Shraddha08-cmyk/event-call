"use client";

import Image from "next/image";
import Header from "./components/Header/Header";
import styles from "./page.module.css";
import Banner from "./components/Banner/Banner";
import Dropdown from "./components/Banner/Dropdown";
import Footer from "./components/Footer/Footer";
import ServiceCards from "./components/ServiceCards/ServiceCards";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect, useRef, useState } from "react";
import Loader from "./components/Loader/Loader";

export default function Home() {
  const categoryRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

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
          <Header categoryRef={categoryRef} />
          <Banner />
          <Dropdown />
          <ServiceCards ref={categoryRef} />
          <Footer />
        </div>
      )}
    </>
  );
}
