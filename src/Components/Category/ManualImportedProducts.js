/** @format */

// File Path: Components/Category
// All js files from this path are simiar: differences are only in function name & export and of course the API fetched. that's it.; hence the similarities between them

import { React, useContext, useEffect, useState } from "react";
import "../deals.css";
import Add from "./Img/heart.png";
import Added from "./Img/red-heart.png";
import rating from "./Img/rating.png";
import Footer from "../Footer";
import { NavLink } from "react-router-dom";
import Spinner from "../Spinner";
import LowerNav from "../LowerNav";
import { getAuth } from "firebase/auth";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { app } from "../../Firebase";
import WishContext from "../../store/WishContext";
import "firebase/auth";
import Navbar from "../Navbar";
const auth = getAuth(app);

function ManualImportedProducts() {
  const [AllProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true); // add loading state
  const [AddedIds, setAddedIds] = useState([]);
  const wishContext = useContext(WishContext);
  const db = getFirestore(app);
  useEffect(() => {
    const itemsCollectionRef = collection(db, "items");
    const unsubscribe = onSnapshot(itemsCollectionRef, (snapshot) => {
      const itemsData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setAllProducts(itemsData);
    });
    setLoading(false);
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const ids = wishContext.items.map((item) => item.id);

    setAddedIds(ids);
  }, [wishContext.items]);

  const isAdded = (itemId) => {
    // Check if the item id is in the added ids
    return AddedIds.includes(itemId);
  };

  return (
    <>
      <div className="Deals">
        <p className="deals-head">Manual Imported products</p>
        {loading && <Spinner />}
        <div className="deal-items">
          {AllProducts &&
            AllProducts.map((items) => {
              return (
                <div className="card" key={items.id}>
                  <div className="card-img-data">
                    <img src={items.thumbnail} className="card-img" />
                    <img
                      onClick={() => {
                        if (!isAdded(items.id)) {
                          wishContext.addItem(items);
                        } else {
                          wishContext.removeItem(items.id);
                        }
                      }}
                      src={isAdded(items.id) ? Added : Add}
                      className="add-list"
                    />

                    <NavLink to={`/importedproduct/${items.id}`} key={items.id}>
                      <button className="view">View product</button>
                    </NavLink>
                  </div>
                  <div className="card-data">
                    <p className="card-title">
                      {items.title.length >= 32
                        ? items.title.slice(0, 32) + ".."
                        : items.title}
                    </p>
                    <div className="category-rating">
                      <p className="card-category">{items.category}</p>
                      <div className="rating">
                        <img src={rating} className="rating-img" />
                        <img src={rating} className="rating-img" />
                        <img src={rating} className="rating-img" />
                        <img src={rating} className="rating-img" />
                        <img src={rating} className="rating-img" />
                        <p className="rating-text">
                          {"5 " +
                            "(" +
                            items.reviews.total_reviews +
                            " reviews)"}
                        </p>
                      </div>
                    </div>
                    <div className="card-price">
                      <p className="discount">${items.price.current_price}</p>
                      <p className="mrp">
                        ${Math.round(items.price.current_price * 1.66)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="lowerNav">
          <LowerNav />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ManualImportedProducts;
