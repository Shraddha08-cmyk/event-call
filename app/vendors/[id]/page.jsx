"use client";

import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../../components/Loader/Loader";
import Modal from "react-modal";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {
  Close,
  ArrowForward,
  ArrowBack,
  ArrowLeft,
  ArrowRight,
} from "@mui/icons-material";

const VendorDetails = ({ params }) => {
  const { id } = params;
  const [vendor, setVendor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchVendorDetails = async () => {
      const vendorDoc = await getDoc(doc(db, "vendors", id));
      if (vendorDoc.exists()) {
        setVendor(vendorDoc.data());
      } else {
        console.log("No such vendor!");
      }
      setIsLoading(false);
    };

    fetchVendorDetails();
  }, [id]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % vendor.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + vendor.images.length) % vendor.images.length
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div
        style={{
          background: "linear-gradient(to right, #ffffff 0%, #e72e77 87%)",
        }}
      >
        <Header />
        {vendor ? (
          <div style={{ display: "flex", padding: "20px" }}>
            {/* Details Section */}
            <div style={{ flex: 1, marginRight: "20px" }}>
              <h1>{vendor.businessName}</h1>
              <p>{vendor.bio}</p>
              <p>Location: {vendor.location}</p>
            </div>

            {/* Image Gallery Section */}
            <div style={{ flex: 1, position: "relative" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "10px",
                }}
              >
                {vendor.images?.slice(0, 5).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Vendor image ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                  />
                ))}
                {vendor.images?.length > 5 && (
                  <div
                    onClick={openModal}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#ccc",
                      height: "150px",
                      cursor: "pointer",
                      borderRadius: "5px",
                    }}
                  >
                    <span>+{vendor.images.length - 5} more</span>
                  </div>
                )}
              </div>
            </div>

            {/* Modal for All Images */}
            <Modal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              style={{
                content: {
                  inset: "50px",
                  padding: "20px",
                  background: "none",
                  overflow: "hidden",
                  border: "none",
                },
                overlay: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <ArrowLeft
                  onClick={prevImage}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    fontSize: "3rem",
                    color: "#fff",
                    background: "rgba(0, 0, 0, 0.5)",
                    borderRadius: "50%",
                    padding: "10px",
                  }}
                />
                <img
                  src={vendor.images[currentImageIndex]}
                  alt={`Vendor image ${currentImageIndex + 1}`}
                  style={{
                    maxHeight: "80vh",
                    maxWidth: "80vw",
                    objectFit: "contain",
                    margin: "0 auto",
                    display: "block",
                  }}
                />
                <ArrowRight
                  onClick={nextImage}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    fontSize: "3rem",
                    color: "#fff",
                    background: "rgba(0, 0, 0, 0.5)",
                    borderRadius: "50%",
                    padding: "10px",
                  }}
                />
              </div>
              <Close
                onClick={closeModal}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  cursor: "pointer",
                  fontSize: "2rem",
                  color: "red",
                }}
              />
            </Modal>
          </div>
        ) : (
          <p>Vendor not found</p>
        )}
        <Footer />
      </div>
    </>
  );
};

export default VendorDetails;
// "use client";

// import { useEffect, useState } from "react";
// import { db } from "../../firebase";
// import { doc, getDoc } from "firebase/firestore";
// import Loader from "../../components/Loader/Loader";
// import Modal from "react-modal";
// import Header from "../../components/Header/Header";
// import Footer from "../../components/Footer/Footer";
// import {
//   Close,
//   ArrowForward,
//   ArrowBack,
//   ArrowLeft,
//   ArrowRight,
// } from "@mui/icons-material";
// import "./details.css";

// const VendorDetails = ({ params }) => {
//   const { id } = params;
//   const [vendor, setVendor] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const fetchVendorDetails = async () => {
//       const vendorDoc = await getDoc(doc(db, "vendors", id));
//       if (vendorDoc.exists()) {
//         setVendor(vendorDoc.data());
//       } else {
//         console.log("No such vendor!");
//       }
//       setIsLoading(false);
//     };

//     fetchVendorDetails();
//   }, [id]);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const nextImage = () => {
//     setCurrentImageIndex((prevIndex) => (prevIndex + 1) % vendor.images.length);
//   };

//   const prevImage = () => {
//     setCurrentImageIndex(
//       (prevIndex) =>
//         (prevIndex - 1 + vendor.images.length) % vendor.images.length
//     );
//   };

//   if (isLoading) {
//     return <Loader />;
//   }

//   return (
//     <>
//       <div className="vendor-details-container">
//         <Header />
//         {vendor ? (
//           <div className="vendor-details">
//             {/* Details Section */}
//             <div className="vendor-details-section">
//               <h1>{vendor.businessName}</h1>
//               <p>{vendor.bio}</p>
//               <p>Location: {vendor.location}</p>
//             </div>

//             {/* Image Gallery Section */}
//             <div className="vendor-gallery-section">
//               <div className="vendor-gallery-grid">
//                 {vendor.images?.slice(0, 5).map((image, index) => (
//                   <img
//                     key={index}
//                     src={image}
//                     alt={`Vendor image ${index + 1}`}
//                     className="vendor-gallery-image"
//                   />
//                 ))}
//                 {vendor.images?.length > 5 && (
//                   <div onClick={openModal} className="vendor-gallery-more">
//                     <span>+{vendor.images.length - 5} more</span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Modal for All Images */}
//             <Modal
//               isOpen={isModalOpen}
//               onRequestClose={closeModal}
//               style={{
//                 content: {
//                   inset: "50px",
//                   padding: "20px",
//                   background: "none",
//                   overflow: "hidden",
//                   border: "none",
//                 },
//                 overlay: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
//               }}
//             >
//               <div className="modal-navigation">
//                 <ArrowLeft onClick={prevImage} className="modal-arrow-left" />
//                 <img
//                   src={vendor.images[currentImageIndex]}
//                   alt={`Vendor image ${currentImageIndex + 1}`}
//                   className="modal-image"
//                 />
//                 <ArrowRight onClick={nextImage} className="modal-arrow-right" />
//               </div>
//               <Close onClick={closeModal} className="modal-close" />
//             </Modal>
//           </div>
//         ) : (
//           <p>Vendor not found</p>
//         )}
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default VendorDetails;
