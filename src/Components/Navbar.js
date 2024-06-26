/** @format */

import { React, useEffect, useState, useRef, useContext } from "react";
import Logo from "../imgs/e-commerce_logo_home_left_up_area.png";
import LogoSmall from "../imgs/e-commerce_logo_small_cart.png";
import search from "../imgs/search.png";
import wishlist from "../imgs/wishlist.png";
import cart from "../imgs/cart.png";
import orders from "../imgs/orders.png";
import Default from "../imgs/default.png";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { app } from "../Firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import swal from "sweetalert";
import CartContext from "../store/CartContext";
import WishContext from "../store/WishContext";
import productsData from "./products.json";
import {
  collection,
  onSnapshot,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
function Navbar() {
  const [orderItems, setOrderItems] = useState([]);
  const [user, setUser] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [Products, setProducts] = useState([]);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);
  const wishContext = useContext(WishContext);
  const searchResultsRef = useRef(null);
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

  const totalLength = orderItems
    ? orderItems.reduce((acc, item) => {
        // if the item is an array, add its length to the accumulator
        if (Array.isArray(item)) {
          return acc + item.length;
        }
        // otherwise, just add 1 to the accumulator
        return acc + 1;
      }, 0)
    : 0;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    const GetProducts = async () => {
      setProducts(productsData);
    };

    GetProducts();

    const handleClick = (event) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target)
      ) {
        setSearchText("");
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const searchResults = Products.filter((product) =>
    product.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const totalQuantity = cartContext.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <div className="navbar">
        <div className="left-section">
          <img
            onClick={() => {
              if (window.location.href.includes("/payment")) {
                swal({
                  title: "Are you sure?",
                  text: "Your transaction is not completed!",
                  icon: "warning",
                  buttons: ["Cancel", "Yes"],
                }).then((willNavigate) => {
                  if (willNavigate) {
                    navigate({ pathname: "/home" });
                  }
                });
              } else {
                navigate({ pathname: "/home" });
              }
            }}
            src={Logo}
            className="logo2"
          />
          <img
            onClick={() => {
              if (window.location.href.includes("/payment")) {
                swal({
                  title: "Are you sure?",
                  text: "Your transaction is not completed!",
                  icon: "warning",
                  buttons: ["Cancel", "Yes"],
                }).then((willNavigate) => {
                  if (willNavigate) {
                    navigate({ pathname: "/home" });
                  }
                });
              } else {
                navigate({ pathname: "/home" });
              }
            }}
            src={LogoSmall}
            className="e-commerce_logo"
          />

          <div className="search-bar">
            <input
              type="text"
              className="search-box"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="search-btn">
              <img src={search} className="search-img" />
            </button>
          </div>
        </div>
        <div className="right-section">
          <img
            onClick={() => {
              if (window.location.href.includes("/payment")) {
                swal({
                  title: "Are you sure?",
                  text: "Your transaction is not completed!",
                  icon: "warning",
                  buttons: ["Cancel", "Yes"],
                }).then((willNavigate) => {
                  if (willNavigate) {
                    navigate("/wishlists");
                  }
                });
              } else {
                navigate("/wishlists");
              }
            }}
            src={wishlist}
            className="wishlist"
          />
          <p
            style={
              wishContext.items.length > 0 ? { opacity: 1 } : { opacity: 0 }
            }
            className="list-count">
            {wishContext.items.length}
          </p>

          <img
            onClick={() => {
              if (window.location.href.includes("/payment")) {
                swal({
                  title: "Are you sure?",
                  text: "Your transaction is not completed!",
                  icon: "warning",
                  buttons: ["Cancel", "Yes"],
                }).then((willNavigate) => {
                  if (willNavigate) {
                    navigate("/cart");
                  }
                });
              } else {
                navigate("/cart");
              }
            }}
            src={cart}
            className="cart"
          />

          <p
            style={
              cartContext.items.length > 0 ? { opacity: 1 } : { opacity: 0 }
            }
            className="cart-count">
            {totalQuantity}
          </p>

          <img
            onClick={() => {
              if (window.location.href.includes("/payment")) {
                swal({
                  title: "Are you sure?",
                  text: "Your transaction is not completed!",
                  icon: "warning",
                  buttons: ["Cancel", "Yes"],
                }).then((willNavigate) => {
                  if (willNavigate) {
                    navigate("/orders");
                  }
                });
              } else {
                navigate("/orders");
              }
            }}
            src={orders}
            className="orders"
          />
          <p
            style={
              orderItems && orderItems.length > 0
                ? { opacity: 1 }
                : { opacity: 0 }
            }
            className="order-count">
            {totalLength}
          </p>

          <img
            onClick={() => navigate("/account")}
            src={
              user && user.photoURL
                ? user.photoURL.replace(/^http:\/\//i, "https://") //replaces the http with https
                : Default
            }
            className="default"
          />
        </div>
        <div className="search-bar2">
          <input
            type="text"
            className="search-box"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="search-btn">
            <img src={search} className="search-img" />
          </button>
        </div>
      </div>

      {searchText !== "" && (
        <div
          ref={searchResultsRef}
          className={`search-results ${searchResults.length ? "show" : ""}`}>
          {searchResults.length > 0 &&
            searchResults.map((product) => (
              <div
                onClick={() => {
                  if (window.location.href.includes("/payment")) {
                    swal({
                      title: "Are you sure?",
                      text: "Your transaction is not completed!",
                      icon: "warning",
                      buttons: ["Cancel", "Yes"],
                    }).then((willNavigate) => {
                      if (willNavigate) {
                        navigate(`/product/${product.id}`);
                      }
                    });
                  } else {
                    navigate(`/product/${product.id}`);
                  }
                }}
                className="search-results2"
                key={product.id}>
                <div className="product-img">
                  <img src={product.thumbnail} className="product-image" />
                </div>
                <div className="product-data">
                  <p className="product-title">
                    {product.title.length > 50
                      ? product.title.slice(0, 50) + "..."
                      : product.title}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
}

export default Navbar;
