/** @format */

import React, { useContext, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import LowerNav from "./LowerNav";
import WishContext from "../store/WishContext";
import "./lists.css";
import empty from "../imgs/empty.png";
import Add from "../imgs/heart.png";
import Added from "../imgs/red-heart.png";
import rating from "../imgs/rating.png";
function Lists() {
  const wishContext = useContext(WishContext);

  useEffect(() => {
    document.title = "Wishlist Section";
    window.scrollTo(0, 0);
  }, []);

  const isAdded = (itemId) =>
    wishContext.items.some((item) => item.id === itemId);

  return (
    <>
      <Navbar />
      <div className="content">
        <p className="wishlist-head">Wishlist</p>

        {wishContext.items.length > 0 ? (
          <div className="lists-items">
            {wishContext.items.map((item) => (
              <div className="card" key={item.id}>
                <div className="card-img-data">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="card-img"
                  />
                  <img
                    onClick={() =>
                      isAdded(item.id)
                        ? wishContext.removeItem(item.id)
                        : wishContext.addItem(item)
                    }
                    src={isAdded(item.id) ? Added : Add}
                    alt={
                      isAdded(item.id)
                        ? "Remove from Wishlist"
                        : "Add to Wishlist"
                    }
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
                      {[...Array(5)].map((_, i) => (
                        <img
                          key={i}
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
                    <p className="price-off">(60% OFF)</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-list">
            <img src={empty} alt="Empty List" className="empty-img" />
            <div className="empty-text">
              <p className="empty-head">Your wishlist is empty!</p>
              <p className="empty-desc">"Revisit all products "</p>
              <Link to="/home">
                <button className="shopping">Revisit Products</button>
              </Link>
            </div>
          </div>
        )}

        <LowerNav />
        <Footer />
      </div>
    </>
  );
}

export default Lists;
