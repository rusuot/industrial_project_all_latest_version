/** @format */

import { React, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./orders.css";
import { NavLink, useNavigate } from "react-router-dom";
import Done from "../imgs/order-done.png";
import OrderNow from "../imgs/order-now.png";

import LowerNav from "./LowerNav";
import { app } from "../Firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  onSnapshot,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
function Orders() {
  const navigate = useNavigate();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);
  useEffect(() => {
    if (!user) return;
    const orderCollectionRef = collection(db, "orders");
    const orderQueryRef = query(
      orderCollectionRef,
      where("uid", "==", user.uid)
    );
    const unsubscribe = onSnapshot(orderQueryRef, (querySnapshot) => {
      const ordersData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setOrderItems(ordersData);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, [user]);

  document.title = "Orders section";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Navbar />
      <div className="orders-section">
        <div
          style={
            orderItems.length === 0
              ? { textAlign: "center", height: "48vh" }
              : { textAlign: "unset", height: "fit-content" }
          }
          className={orderItems ? `ordered-data animate` : `ordered-data`}>
          <div
            style={
              orderItems.length !== 0
                ? { justifyContent: "space-between" }
                : { justifyContent: "center" }
            }
            className="head-texts">
            <p
              style={
                orderItems.length === 0
                  ? { marginBottom: "0px" }
                  : { marginBottom: "16px" }
              }
              className="order-head-text">
              Your Orders
            </p>
            <button
              style={
                orderItems.length !== 0
                  ? { display: "flex" }
                  : { display: "none" }
              }
              onClick={() => {
                navigate("/home");
              }}
              className="delete-orders">
              <p style={{ margin: 0 }}>Order More</p>
            </button>
          </div>
          <div
            style={
              orderItems.length === 0
                ? { display: "block" }
                : { display: "none" }
            }
            className="order-now-section">
            <div className="empty-order">
              <img
                src={OrderNow}
                width={"300px"}
                height={"300px"}
                className="no-orders"
              />
              <div className="no-orders-txt"></div>
            </div>
          </div>
          <div className="all-orders">
            {orderItems &&
              orderItems.map((order) => {
                if (order) {
                  return order.order.map((item) => {
                    return (
                      <NavLink
                        to={`/product/${item.id}`}
                        key={item.id}
                        className="nav-link2">
                        <div className="order">
                          <img src={item.thumbnail} className="order-img" />
                          <div className="order-text">
                            <p className="order-head">{item.title}</p>
                            <p className="order-category">{item.category}</p>
                            <p className="order-quantity">
                              Number of items: <b>{item.quantity}</b>
                            </p>
                            {item.category === "men's clothing" ||
                            item.category === "women's clothing" ? (
                              <p className="order-size">
                                Size: <b>{item.size}</b>
                              </p>
                            ) : (
                              ""
                            )}
                            <div className="order-success">
                              <img src={Done} className="order-done" />
                              <p
                                style={{
                                  marginLeft: "5px",
                                  marginTop: 0,
                                  marginBottom: 0,
                                }}
                                className="order-dispatch">
                                Ordered succesfully! Soon to be dispatch!
                              </p>
                            </div>
                          </div>
                        </div>
                      </NavLink>
                    );
                  });
                }
              })}
          </div>
        </div>
      </div>
      <div className="lowerNav">
        <LowerNav />
      </div>
      <Footer />
    </>
  );
}

export default Orders;
