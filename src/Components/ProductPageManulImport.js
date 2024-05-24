/** @format */

import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./productpage.css";
import Rating from "../imgs/rating.png";
import added from "../imgs/icon_item_added_into_cart.png";
import add from "../imgs/icon_add_item_into_cart.png";
import VanillaTilt from "vanilla-tilt";
import LowerNav from "./LowerNav";
import CartContext from "../store/CartContext";
import { collection, onSnapshot, getFirestore } from "firebase/firestore";
import { app } from "../Firebase";

function ProductPageManualImport() {
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const [Size, setSize] = useState("");
  const [AddedIds, setAddedIds] = useState([]);
  const cartContext = useContext(CartContext);
  const db = getFirestore(app);
  const tiltRef = useRef(null);

  document.title = `${product ? product.title : "E-commerce"}`;

  useEffect(() => {
    const itemCollectionRef = collection(db, "items");
    const unsubscribe = onSnapshot(itemCollectionRef, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const filteredItem = items.find((item) => item.id === id);
      if (filteredItem) {
        setProduct(filteredItem);
      }
    });

    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const ids = cartContext.items.map((item) => item.id);
    setAddedIds(ids);
  }, [cartContext.items]);

  const isAdded = (itemId) => {
    return AddedIds.includes(itemId);
  };

  useEffect(() => {
    VanillaTilt.init(tiltRef.current, {
      max: 10,
      speed: 100,
      transition: true,
      easing: "ease-out",
    });
  }, []);

  return (
    <>
      <Navbar />
      <div
        style={product ? { height: "100%" } : { height: "100vh" }}
        className="product-page">
        <div className={product ? `product-dataa animate` : `product-dataa`}>
          <div className="item-image">
            <img
              ref={tiltRef}
              src={product.thumbnail}
              alt=""
              className={`item-img ${product.thumbnail ? "img-style" : ""}`}
            />
          </div>
          <div className="product-details">
            <p className="item-title">{product.title}</p>

            <div className="price-section">
              <div className="item-rating">
                <img src={product && Rating} className="rating-img" alt="" />
                <img src={product && Rating} className="rating-img" alt="" />
                <img src={product && Rating} className="rating-img" alt="" />
                <img src={product && Rating} className="rating-img" alt="" />
                <img src={product && Rating} className="rating-img" alt="" />
                <p className="rating-no">
                  {product ? `(${product.reviews.total_reviews})` : ""}
                </p>
              </div>
            </div>
            {product ? <hr className="horizontal" /> : ""}
            <div
              style={
                product.category === "men's clothing" ||
                product.category === "women's clothing"
                  ? { display: "block" }
                  : { display: "none" }
              }
              className="cloth-size">
              <p className="choose">Choose a size</p>
              <div className="options">
                <p
                  onClick={() => setSize("S")}
                  className={`size ${Size === "S" ? "size-clicked" : ""}`}>
                  S
                </p>
                <p
                  onClick={() => setSize("M")}
                  className={`size ${Size === "M" ? "size-clicked" : ""}`}>
                  M
                </p>
                <p
                  onClick={() => setSize("L")}
                  className={`size ${Size === "L" ? "size-clicked" : ""}`}>
                  L
                </p>
                <p
                  onClick={() => setSize("XL")}
                  className={`size ${Size === "XL" ? "size-clicked" : ""}`}>
                  XL
                </p>
                <p
                  onClick={() => setSize("XXL")}
                  className={`size ${Size === "XXL" ? "size-clicked" : ""}`}>
                  XXL
                </p>
              </div>
            </div>
            {(product && product.category === "men's clothing") ||
            product.category === "women's clothing" ? (
              <hr className="horizontal" />
            ) : (
              ""
            )}
            {product ? (
              <div className="product-actual-price">
                <p className="price-one">Price:</p>
                <p className="price-two">${product.price.current_price}</p>
                <p className="mrp">
                  ${Math.round(product.price.current_price * 1.66)}
                </p>
              </div>
            ) : (
              ""
            )}

            <div
              style={product ? { display: "flex" } : { display: "none" }}
              className="buying-buttons">
              <Link to="/cart">
                <button
                  onClick={() => {
                    if (!isAdded(product.id)) {
                      cartContext.addItem(product);
                    }
                  }}
                  className="buy-btn">
                  Buy Now
                </button>
              </Link>
              <button
                onClick={() => {
                  if (!isAdded(product.id)) {
                    cartContext.addItem(product);
                  } else {
                    cartContext.removeItem(product.id);
                  }
                }}
                className="add-cart-btn">
                <img
                  src={isAdded(product.id) ? added : add}
                  className="cart-img"
                />
                <p style={{ marginLeft: "8px" }} className="cart-text">
                  {isAdded(product.id) ? "Item product was added" : "Add"}
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="lowerNav">
        <LowerNav />
      </div>
      {product ? <Footer /> : ""}
    </>
  );
}

export default ProductPageManualImport;
