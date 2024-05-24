/** @format */

import React, { useState } from "react";
import "./popular.css";
import Deals from "../Deals";
import Men from "./Men";
import Women from "./Women";
import Electronics from "./Electronics";
import Jewelery from "./Jewelery";
import men from "./Img/men.png";
import women from "./Img/women.png";
import jwellery from "./Img/jwelery.png";
import electronics from "./Img/pc.png";
import MenWhite from "./Img/men-white.png";
import WomenWhite from "./Img/women-white.png";
import JwelleryWhite from "./Img/jwelery-white.png";
import ElectronicsWhite from "./Img/pc-white.png";
import { useNavigate } from "react-router-dom";
import ManualImportedProducts from "./ManualImportedProducts";
import manualimportedproduct from "./Img/manualimportedproduct.png";
function Popular() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showDeals, setShowDeals] = useState(true);
  const navigate = useNavigate();

  const images = [
    {
      src: electronics,
      whiteSrc: ElectronicsWhite,
      className: "electronics",
    },

    {
      src: jwellery,
      whiteSrc: JwelleryWhite,
      className: "jwellery",
    },
    { src: men, whiteSrc: MenWhite, className: "men" },
    { src: women, whiteSrc: WomenWhite, className: "women" },

    {
      src: manualimportedproduct,
      whiteSrc: manualimportedproduct,
      className: "manualimport_products",
    },
  ];

  const handleImageClick = (index) => {
    if (index === activeIndex) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
      setShowDeals(false);
    }
  };

  return (
    <>
      <div className="popular">
        <div className="popular-data">
          <p className="popular-head">
            {" "}
            ⭐ Check popular products categories ⭐
          </p>
        </div>
        <div className="popular-items">
          {images.map((image, index) => (
            <img
              key={index}
              onClick={() => handleImageClick(index)}
              src={index === activeIndex ? image.whiteSrc : image.src}
              className={
                index === activeIndex
                  ? image.className + " active"
                  : image.className
              }
              title={image.className}
              style={{
                backgroundColor: index === activeIndex ? "#e6dc92" : "white",
              }}
            />
          ))}
        </div>

        <div>
          <div className="manualimport-btn">
            <button
              onClick={() => {
                navigate("/manualimport");
              }}
              className="manualimport">
              Proceed to ManualImport
            </button>
          </div>
        </div>
      </div>
      {showDeals ? (
        <Deals />
      ) : activeIndex === 2 ? (
        <Men />
      ) : activeIndex === 3 ? (
        <Women />
      ) : activeIndex === 1 ? (
        <Jewelery />
      ) : activeIndex === 0 ? (
        <Electronics />
      ) : activeIndex === 4 ? (
        <ManualImportedProducts />
      ) : (
        <Deals />
      )}
    </>
  );
}

export default Popular;
