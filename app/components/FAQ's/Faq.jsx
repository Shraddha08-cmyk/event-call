"use client";

import { useState } from "react";
import plusIcon from "../../../public/images/icon-plus.svg";
import minusIcon from "../../../public/images/icon-minus.svg";
import Image from "next/image";
import { Add, Remove } from "@mui/icons-material";

function Faq({ title, description }) {
  const [isActive, setActive] = useState(false);

  const handleClick = () => setActive(!isActive);

  return (
    <>
      <div className="accordion__item">
        <div className="accordion__title-wrapper" onClick={handleClick}>
          <h2 className="accordion__title">{title}</h2>
          {isActive ? (
            <Remove style={{ color: "#ff8a00" }} />
          ) : (
            <Add style={{ color: "#ff8a00" }} />
          )}
        </div>
        {isActive && <p className="accordion__description">{description}</p>}
      </div>{" "}
    </>
  );
}

export default Faq;
