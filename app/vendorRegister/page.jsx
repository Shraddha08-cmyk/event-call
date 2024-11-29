"use client";

import React, { useEffect, useState } from "react";
import "./vendorRegister.css";
import Container from "../components/Container/Container";
import Footer from "../components/Footer/Footer";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header/Header";
import registerbc from "../../public/images/registerbc.jpg";
import { DoneAll } from "@mui/icons-material";
import { Button } from "@mui/material";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import FaqPage from "../components/FAQ's/FaqPage";

const page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const goToHome = () => {
    router.push("/");
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

          <div
            style={{
              backgroundImage: `url(${registerbc.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "50px 0",
              textAlign: "center",
              color: "#fff",
              borderRadius: "8px",
              height: "350px",
              // filter: "blur(2px)",
            }}
          >
            <h1>Grow your business with Event Call</h1>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "20px",
                gap: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <DoneAll />
                <p>Showcase your services on our industry leading site!</p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <DoneAll />
                <p>Reach local engaged clients and book more events.</p>
              </div>
            </div>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#e72e77",
                textTransform: "capitalize",
                fontSize: "medium",
                fontWeight: "bold",
              }}
              onClick={() => goToHome()}
            >
              Sign Up
            </Button>
          </div>
          {/* <Container> */}
          <FaqPage />
          {/* </Container> */}
          <Footer />
        </div>
      )}
    </>
  );
};

export default page;
