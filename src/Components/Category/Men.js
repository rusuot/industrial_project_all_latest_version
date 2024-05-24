/** @format */

import React, { useContext, useEffect, useState } from "react";
import "../deals.css";
import Add from "./Img/heart.png";
import Added from "./Img/red-heart.png";
import rating from "./Img/rating.png";
import { NavLink } from "react-router-dom";
import Footer from "../Footer";
import Spinner from "../Spinner";
import LowerNav from "../LowerNav";
import WishContext from "../../store/WishContext";
import productsData from "../products.json";
function Men() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const wishContext = useContext(WishContext);

  useEffect(() => {
    const fetchProducts = async () => {
      setAllProducts(
        productsData.filter((item) => item.category == "men's clothing")
      );
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const isAdded = (itemId) =>
    wishContext.items.some((item) => item.id === itemId);

  return (
    <div className="Deals">
      <p className="deals-head">Men's Clothing</p>
      {loading ? (
        <Spinner />
      ) : (
        <div className="deal-items">
          {allProducts.map((item) => (
            <div className="card" key={item.id}>
              <div className="card-img-data">
                <img src={item.thumbnail} alt="Product" className="card-img" />
                <img
                  onClick={() => {
                    isAdded(item.id)
                      ? wishContext.removeItem(item.id)
                      : wishContext.addItem(item);
                  }}
                  src={isAdded(item.id) ? Added : Add}
                  alt={isAdded(item.id) ? "Remove from cart" : "Add to cart"}
                  className="add-list"
                />
                <NavLink to={`/product/${item.id}`}>
                  <button className="view">View product</button>
                </NavLink>
              </div>
              <div className="card-data">
                <p className="card-title">
                  {item.title.length > 32
                    ? `${item.title.slice(0, 32)}...`
                    : item.title}
                </p>
                <div className="category-rating">
                  <p className="card-category">{item.category}</p>
                  <div className="rating">
                    {[...Array(5)].map((_, index) => (
                      <img
                        key={index}
                        src={rating}
                        alt="Rating"
                        className="rating-img"
                      />
                    ))}
                    <p className="rating-text">
                      5 ({item.reviews.total_reviews} reviews)
                    </p>
                  </div>
                </div>
                <div className="card-price">
                  <p className="discount">${item.price.current_price}</p>
                  <p className="mrp">
                    ${Math.round(item.price.current_price * 1.66)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <LowerNav />
      <Footer />
    </div>
  );
}

export default Men;
