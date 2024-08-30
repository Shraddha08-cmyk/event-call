import React from "react";
import "./Loader.css";
import loader from "../../../public/images/loader.png";
import Image from "next/image";

const Loader = () => {
  return (
    <div className="loader-container">
      <Image
        src={loader}
        alt="Loading..."
        className="loader-flip"
        width={100}
      />
    </div>
  );
};

export default Loader;
