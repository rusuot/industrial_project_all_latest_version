/** @format */

import React, { useContext, useEffect, useState } from "react";
import "./deals.css";
import Add from "../imgs/heart.png";
import Added from "../imgs/red-heart.png";
import Footer from "./Footer";
import Spinner from "./Spinner";
import LowerNav from "./LowerNav";
import { NavLink } from "react-router-dom";
import WishContext from "../store/WishContext";
import productsData from "./products.json";
import { app } from "../Firebase";
import { collection, onSnapshot, getFirestore } from "firebase/firestore";
function Deals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const wishContext = useContext(WishContext);
  const db = getFirestore(app);
  useEffect(() => {
    const itemsCollectionRef = collection(db, "items");
    const unsubscribe = onSnapshot(itemsCollectionRef, (snapshot) => {
      const itemsData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setProducts(itemsData);
    });
    setLoading(false);
    return () => {
      unsubscribe();
    };
  }, []);

  const isAdded = (itemId) => {
    return wishContext.items.some((item) => item.id === itemId);
  };
  return (
    <div className="Deals">
      <p className="deals-head">👀 Check today's deals! 👀</p>
      {loading && <Spinner />}
      <div className="deal-items">
        {[...productsData, ...products].map((item) => (
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
                {item.title.length >= 32
                  ? `${item.title.slice(0, 32)}..`
                  : item.title}
              </p>
              <div className="category-rating">
                <p className="card-category">{item.category}</p>
                <div className="rating">
                  {`${item.reviews.rating} stars`}
                  <p className="rating-text">
                    ({item.reviews.total_reviews} reviews)
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
      <LowerNav />
      <Footer />
    </div>
  );
}

export default Deals;
