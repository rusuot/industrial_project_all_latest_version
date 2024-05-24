/** @format */

import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./cart.css";
import { useNavigate } from "react-router-dom";
import LowerNav from "./LowerNav";
import CartContext from "../store/CartContext";
import WishContext from "../store/WishContext";
import save from "../imgs/save.png";
import saved from "../imgs/saved.png";
import Delete from "../imgs/delete.png";
import Empty from "../imgs/cart-empty.png";

function CartSection() {
  const [addedIds, setAddedIds] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [promocode, setPromocode] = useState("");
  const [correctCode, setCorrectCode] = useState(false);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);
  const wishContext = useContext(WishContext);
  document.title = "Cart Section";

  useEffect(() => {
    const newSubtotal = cartContext.items.reduce(
      (total, item) => total + item.price.current_price * item.quantity,
      0
    );
    setSubTotal(newSubtotal);
  }, [cartContext.items]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const ids = cartContext.items.map((item) => item.id);
    setAddedIds(ids);
  }, [cartContext.items]);

  const handlePromocodeChange = (event) => {
    const value = event.target.value.replace(/\s+/g, "");
    setPromocode(value);
  };
  const isWishList = (itemId) =>
    wishContext.items.some((item) => item.id === itemId);

  const isAdded = (itemId) =>
    cartContext.items.some((item) => item.id === itemId);
  const applyPromocode = () => {
    const discountPrice = parseFloat((subTotal * 0.2).toFixed(2));
    const taxPrice = parseFloat((subTotal * 0.05).toFixed(2));
    const totalWithDiscount = parseFloat(
      subTotal + taxPrice - discountPrice
    ).toFixed(2);
    const totalWithoutDiscount = parseFloat(subTotal + taxPrice).toFixed(2);

    if (promocode === "IndustrialProject20") {
      setTotal(totalWithDiscount);
      setCorrectCode(true);
    } else {
      setTotal(totalWithoutDiscount);
      setCorrectCode(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="entire-section">
        <p
          className={
            cartContext.items.length ? "cart-head animate" : "cart-head"
          }>
          Your Cart
        </p>
        <div
          className={
            cartContext.items.length ? "cart-section animate" : "cart-section"
          }
          style={{ height: cartContext.items.length === 0 ? "40vh" : "100%" }}>
          {cartContext.items.length === 0 ? (
            <div className="empty-cart">
              <img
                src={Empty}
                alt="No items in cart"
                className="empty-cart-img"
              />
            </div>
          ) : (
            <div className="cart-details">
              {cartContext.items.map((item) => (
                <div className="cart-data" key={item.id}>
                  <img
                    onClick={() => navigate(`/product/${item.id}`)}
                    src={item.thumbnail}
                    alt={item.title}
                    className="cart-item-img"
                  />
                  <div className="cart-all-data">
                    <p className="cart-title">{item.title}</p>
                    <div className="cart-price">
                      <p className="cart-discount">
                        ${(item.price.current_price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <div className="more-buttons">
                      <div className="quantity-section">
                        <button
                          onClick={() => cartContext.addItem(item)}
                          className="increase">
                          +
                        </button>
                        <p className="total-items">{item.quantity}</p>
                        <button
                          onClick={() => cartContext.removeItem(item.id)}
                          className="decrease"
                          disabled={item.quantity === 1}>
                          -
                        </button>
                      </div>
                      <div className="right-btns">
                        <div className="save-btn">
                          <img
                            onClick={() => {
                              if (isWishList(item.id)) {
                                wishContext.removeItem(item.id);
                                alert("Product removed from wishlist!!");
                              }
                              wishContext.addItem(item);
                              alert("Product saved to wishlist!!");
                            }}
                            src={isAdded(item.id) ? saved : save}
                            alt="Save item"
                            className="save-img"
                          />
                          <p>Save</p>
                        </div>
                        <div className="delete-btn">
                          <img
                            onClick={() => cartContext.deleteItem(item.id)}
                            src={Delete}
                            alt="Delete item"
                            className="delete-img"
                          />
                          <p>Delete</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div
            className="checkout-section"
            style={{
              display: cartContext.items.length === 0 ? "none" : "block",
            }}>
            <div className="congrats">
              <p>
                Congrats! You're eligible for <b>Free Delivery</b>.
              </p>
              <p>
                Use code <b>IndustrialProject20</b> for 20% discount.
              </p>
            </div>
            <div className="promocode">
              <input
                type="text"
                placeholder="Promocode"
                onChange={handlePromocodeChange}
                value={promocode}
              />
              <button onClick={applyPromocode} className="promocode-btn">
                Apply
              </button>
            </div>
            <p className={correctCode ? "applied" : "hidden"}>
              <b>IndustrialProject20</b> has been applied!
            </p>
            <p className={!correctCode && promocode ? "applied2" : "hidden"}>
              Enter a valid promocode.
            </p>
            <div className="total">Total</div>
            <p className="total-price">${promocode ? total : subTotal}</p>
            <button onClick={() => navigate("/payment")} className="payment">
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
      <LowerNav />
      <Footer />
    </>
  );
}

export default CartSection;
