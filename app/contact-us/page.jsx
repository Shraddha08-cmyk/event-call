"use client";

import React, { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import "./contact.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Container from "../components/Container/Container";
import { EmailOutlined, LocationOn, TabletAndroid } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader/Loader";

const ContactPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    let validValue = value;

    if (name === "name") {
      validValue = value.replace(/[^a-zA-Z\s]/g, "");
    } else if (name === "email") {
      validValue = value;
    } else if (name === "mobile") {
      validValue = value.replace(/[^0-9+]/g, "");

      if (validValue.startsWith("0")) {
        validValue = "+91" + validValue.replace(/^0+/, "");
      } else if (!validValue.startsWith("+91")) {
        validValue = "+91" + validValue.replace(/^\+91/, "");
      }
    } else if (name === "subject") {
      validValue = value.replace(/[^\w\s]/gi, "");
    }

    setFormData({ ...formData, [name]: validValue });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address.", {
        position: "top-center",
      });
      return;
    }

    const fromName = formData.name ? formData.name : formData.email;

    const emailParams = {
      from_name: fromName,
      email: formData.email,
      mobile: formData.mobile,
      subject: formData.subject,
      message: formData.message,
    };

    emailjs
      .send(
        "service_bfu5guc",
        "template_5ezwqwo",
        emailParams,
        "XLZ0bp4QXCwomoLMf"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          toast.success(
            "Thanks For Reaching Us! We'll get in touch with you soon!",
            {
              position: "top-center",
            }
          );
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        },
        (err) => {
          console.log("FAILED...", err);
          toast.error("Failed to send the message. Please try again.", {
            position: "top-center",
          });
        }
      );
  };

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
          <Header />
          <Container>
            <div>
              <div className="contact-main">
                <form className="contact-form" onSubmit={handleSubmit}>
                  <h3>We want to hear from you</h3>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <TextField
                      variant="outlined"
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#e72e77",
                          },
                          "&:hover fieldset": {
                            borderColor: "#e72e77",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#e72e77",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#e72e77",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#e72e77",
                        },
                      }}
                    />
                    <TextField
                      variant="outlined"
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#e72e77",
                          },
                          "&:hover fieldset": {
                            borderColor: "#e72e77",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#e72e77",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#e72e77",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#e72e77",
                        },
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <TextField
                      variant="outlined"
                      label="Mobile No."
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#e72e77",
                          },
                          "&:hover fieldset": {
                            borderColor: "#e72e77",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#e72e77",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#e72e77",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#e72e77",
                        },
                      }}
                    />
                    <TextField
                      variant="outlined"
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#e72e77",
                          },
                          "&:hover fieldset": {
                            borderColor: "#e72e77",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#e72e77",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#e72e77",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#e72e77",
                        },
                      }}
                    />
                  </div>
                  <textarea
                    name="message"
                    placeholder="Message"
                    rows={10}
                    className="custom-textarea"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                  <Button
                    variant="outlined"
                    className="btn-submit"
                    type="submit"
                  >
                    Submit Now
                  </Button>
                </form>
                <div className="contacts_info">
                  <h3>Let's Get In Touch</h3>

                  <div className="location">
                    <LocationOn className="loc_icon" />
                    <div className="locate">
                      <p>Konch, Uttar Pradesh, India – 285205</p>
                    </div>
                  </div>
                  <div className="phone">
                    <TabletAndroid className="mob_icon" />
                    <div className="mobile">
                      <p>+91-638 725 6816</p>
                    </div>
                  </div>
                  <div className="email">
                    <EmailOutlined className="mail_icon" />
                    <div className="mail">
                      <p>eventcallofficial@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
          <Footer />
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default ContactPage;
