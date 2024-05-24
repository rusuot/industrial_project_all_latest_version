/** @format */

import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./productpage.css";
import Rating from "../imgs/rating.png";
import added from "../imgs/icon_item_added_into_cart.png";
import add from "../imgs/icon_add_item_into_cart.png";
import VanillaTilt from "vanilla-tilt";
import LowerNav from "./LowerNav";
import productsData from "./products.json";
import CartContext from "../store/CartContext";

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tiltRef = useRef(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // Initialize loading state
  const [Size, setSize] = useState("");
  const cartContext = useContext(CartContext);

  useEffect(() => {
    const productId = Number(id);
    const matchedProduct = productsData.find((p) => p.id === productId);
    if (matchedProduct) {
      setProduct(matchedProduct);
      document.title = matchedProduct.title;
      setLoading(false); // Set loading to false once the product is found
    } else {
      navigate("/404"); // Redirect if no product is found
    }
  }, [id, navigate]);

  useEffect(() => {
    if (tiltRef.current && product) {
      VanillaTilt.init(tiltRef.current, {
        max: 10,
        speed: 100,
        transition: true,
        easing: "cubic-bezier(.03,.98,.52,.99)",
      });
    }

    // Cleanup function to destroy VanillaTilt instance
    return () => {
      if (tiltRef.current && tiltRef.current.vanillaTilt) {
        tiltRef.current.vanillaTilt.destroy();
      }
    };
  }, [product]);

  const isProductAdded = (itemId) => {
    return cartContext.items.some((item) => item.id === itemId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
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
              className={`item-img ${product.thumbnail ? "img-style" : ""}`}
            />
          </div>
          <div className="product-details">
            <p className="item-title">{product.title}</p>
            <div className="price-section">
              <div className="item-rating">
                <img src={product && Rating} className="rating-img" />
                <img src={product && Rating} className="rating-img" />
                <img src={product && Rating} className="rating-img" />
                <img src={product && Rating} className="rating-img" />
                <img src={product && Rating} className="rating-img" />
                <p className="rating-no">
                  {product ? product.reviews.total_reviews : ""}
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
                    if (!isProductAdded(product.id)) {
                      cartContext.addItem(product);
                    }
                  }}
                  className="buy-btn">
                  Buy Now
                </button>
              </Link>
              <button
                onClick={() => {
                  if (isProductAdded(product.id)) {
                    cartContext.removeItem(product.id);
                  }
                  cartContext.addItem(product);
                }}
                className="add-cart-btn">
                <img
                  src={isProductAdded(product.id) ? added : add}
                  className="cart-img"
                />
                <p style={{ marginLeft: "8px" }} className="cart-text">
                  {isProductAdded(product.id)
                    ? "Item product was added"
                    : "Add"}
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

export default ProductPage;
