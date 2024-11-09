"use client";

import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../../components/Loader/Loader";

const VendorDetails = ({ params }) => {
  const { id } = params;
  const [vendor, setVendor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return <Loader />;
  }

  return vendor ? (
    <div style={{ padding: "20px" }}>
      <h1>{vendor.businessName}</h1>
      <p>{vendor.bio}</p>
      <p>Location: {vendor.location}</p>
      <div>
        {vendor.images?.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Vendor image ${index + 1}`}
            style={{ width: "100%", height: "auto", marginBottom: "20px" }}
          />
        ))}
      </div>
    </div>
  ) : (
    <p>Vendor not found</p>
  );
};

export default VendorDetails;
