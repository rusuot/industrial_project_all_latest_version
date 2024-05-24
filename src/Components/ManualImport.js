/** @format */

import { React, useEffect, useState, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./manualimport.css";
import { app } from "../Firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import JSONExample from "../imgs/json_example.png";
import { getFirestore, setDoc, doc, collection } from "firebase/firestore";

import swal from "sweetalert";
import LowerNav from "./LowerNav";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const auth = getAuth(app);
const db = getFirestore(app);

function ManualImport() {
  const [user, setUser] = useState(null);
  const [Manualimport, setManualimport] = useState("");
  const [isDisabled, setDisabled] = useState(false);

  const [ManualimportError, setManualimportError] = useState("");

  const [shippingDisplay, setshippingDisplay] = useState("block");
  const [cardDisplay, setcardDisplay] = useState("none");

  document.title = "Manual Import section";

  const notify = (message, type) => {
    toast[type](message, {
      position: "top-center",
      autoClose: 1800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const navigate = useNavigate();

  const handleManualimport = (event) => {
    setManualimport(event.target.value);
  };

  const handleManualimportBlur = (event) => {
    if (event.target.value === "") {
      setManualimportError("Please enter your Manualimport's name.");
    } else {
      setManualimportError("");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ? user : null);
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const AddUserData = async () => {
    if (Manualimport.length === 0) {
      notify("The import data cannot be empty.", "error");
      return;
    }

    try {
      const inputData = JSON.parse(Manualimport);
      if (
        !inputData.reviews ||
        !inputData.price ||
        typeof inputData.price.current_price !== "number" ||
        typeof inputData.reviews.total_reviews !== "number" ||
        typeof inputData.reviews.rating !== "number"
      ) {
        notify(
          "Review or Price data is incomplete or incorrectly formatted.",
          "error"
        );
        return;
      }

      const newDocRef = doc(collection(db, "items"));
      const dataToAdd = {
        id: newDocRef.id,
        title: inputData.title,
        price: {
          current_price: inputData.price.current_price,
        },
        category: inputData.category,
        thumbnail: inputData.thumbnail,
        reviews: {
          total_reviews: inputData.reviews.total_reviews,
          rating: inputData.reviews.rating,
        },
      };

      await setDoc(newDocRef, dataToAdd);
      swal({
        title: "Import successful!",
        text: "Thanks for your product suggestion.",
        icon: "success",
        buttons: "Ok",
      }).then((willNavigate) => {
        if (willNavigate) {
          navigate("/home");
        }
      });
    } catch (e) {
      console.error(e);
      notify(`Failed to import product: ${e.message}`, "error");
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="payment-page">
        <div className="more-data">
          <div
            style={{ display: shippingDisplay }}
            className="shipping-data animate">
            <div className="shipping-head">Manual Import details</div>
            <div className="user-data-form">
              <p className="order-id">JSON Example: </p>
              <img src={JSONExample} className="no-orders" alt="" />
              <div className="all-data-of-user">
                <div className="user-data1">
                  <div className="country">
                    <p className="country-name">Manualimport*</p>
                    <input
                      type="text"
                      placeholder="Please Respect JSON structure from image above"
                      onChange={handleManualimport}
                      onBlur={handleManualimportBlur}
                      value={Manualimport}
                      disabled={isDisabled}
                      required
                    />
                    {ManualimportError && (
                      <div className="error-message">{ManualimportError}</div>
                    )}
                  </div>
                </div>
              </div>
              <button onClick={AddUserData} className="save-address">
                Save
              </button>
            </div>
          </div>
          <div
            style={{ display: cardDisplay }}
            className="payment-data animate">
            <div className="payment-option">
              <p className="payment-method">
                This action will insert your desired product into DB
              </p>
            </div>
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

export default ManualImport;

// import { React, useEffect, useState, useRef } from "react";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import "./manualimport.css";
// import { app } from "../Firebase";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import JSONExample from "../imgs/json_example.png";
// import { getFirestore, setDoc, doc, collection } from "firebase/firestore";

// import swal from "sweetalert";
// import LowerNav from "./LowerNav";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const auth = getAuth(app);
// const db = getFirestore(app);

// function ManualImport() {
//   const [user, setUser] = useState(null);
//   const [Manualimport, setManualimport] = useState("");
//   const [isDisabled, setDisabled] = useState(false);

//   const [ManualimportError, setManualimportError] = useState("");

//   const [shippingDisplay, setshippingDisplay] = useState("block");
//   const [cardDisplay, setcardDisplay] = useState("none");
//   // const [currentDateTime, setCurrentDateTime] = useState("");

//   document.title = "Manual Import section";

//   const notify1 = () =>
//     toast.error("Please fill-up the form correctly!", {
//       position: "top-center",
//       autoClose: 1800,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "colored",
//     });

//   const navigate = useNavigate();

//   // MANUAL IMPORT DETAILS
//   const handleManualimport = (event) => {
//     setManualimport(event.target.value);
//   };

//   // VALIDATION

//   const handleManualimportBlur = (event) => {
//     if (event.target.value === "") {
//       setManualimportError("Please enter your Manualimport's name.");
//     } else {
//       setManualimportError("");
//     }
//   };

//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUser(user);
//       } else {
//         setUser(null);
//       }
//     });
//   }, []);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);
//   const AddUserData = async () => {
//     try {
//       console.log("Manualimport String:", Manualimport);
//       const inputData = JSON.parse(Manualimport);
//       console.log("Parsed Input Data:", inputData);

//       if (
//         !inputData.reviews ||
//         !inputData.price ||
//         typeof inputData.price.current_price !== "number" ||
//         typeof inputData.reviews.total_reviews !== "number" ||
//         typeof inputData.reviews.rating !== "number"
//       ) {
//         throw new Error(
//           "Review or Price data is incomplete or incorrectly formatted."
//         );
//       }

//       const newDocRef = doc(collection(db, "items"));
//       const dataToAdd = {
//         id: newDocRef.id,
//         title: inputData.title,
//         price: {
//           current_price: inputData.price.current_price,
//         },
//         category: inputData.category,
//         thumbnail: inputData.thumbnail,
//         reviews: {
//           total_reviews: inputData.reviews.total_reviews,
//           rating: inputData.reviews.rating,
//         },
//       };

//       await setDoc(newDocRef, dataToAdd);
//       swal(
//         "Import successful!",
//         "Thanks for your product suggestion.",
//         "success"
//       );
//       navigate("/home");
//     } catch (e) {
//       console.error(e);
//       swal("Error", `Failed to import product: ${e.message}`, "error");
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <ToastContainer />
//       <div className="payment-page">
//         <div className="more-data">
//           <div
//             style={{ display: shippingDisplay }}
//             className="shipping-data animate">
//             <div className="shipping-head">Manual Import details</div>
//             <div className="user-data-form">
//               <p className="order-id">JSON Example: </p>
//               <img src={JSONExample} className="no-orders" alt="" />

//               <div className="all-data-of-user">
//                 <div className="user-data1">
//                   <div className="country">
//                     <p className="country-name">Manualimport*</p>
//                     <input
//                       type="text"
//                       placeholder="Please Respect JSON structure from image above"
//                       onChange={handleManualimport}
//                       onBlur={handleManualimportBlur}
//                       value={Manualimport}
//                       disabled={isDisabled}
//                       required
//                     />
//                     {ManualimportError && (
//                       <div className="error-message">{ManualimportError}</div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//               <button
//                 onClick={() => {
//                   if (Manualimport.length !== 0) {
//                     setDisabled(true);
//                     setshippingDisplay("none");
//                     setcardDisplay("block");
//                   } else {
//                     notify1();
//                   }
//                 }}
//                 className="save-address">
//                 Save
//               </button>
//             </div>
//           </div>
//           <div
//             style={{ display: cardDisplay }}
//             className="payment-data animate">
//             <div className="payment-option">
//               <p className="payment-method">
//                 This action will insert your desired product into DB
//               </p>
//               <div className="choose-option"></div>
//               <div className="paying-data"></div>
//               <div className="total-amount"></div>
//               <div className="order-place-btn">
//                 <button
//                   onClick={() => {
//                     {
//                       AddUserData();
//                       swal({
//                         title: "Import successful!",
//                         text: `Thanks for your product suggestion.`,
//                         icon: "success",
//                         buttons: "Ok",
//                       }).then((willNavigate) => {
//                         if (willNavigate) {
//                           navigate("/home");
//                           // window.location.reload();
//                         }
//                       });
//                     }
//                   }}
//                   className="confirm_manual_import-btn">
//                   Import the product
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="lowerNav">
//         <LowerNav />
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default ManualImport;
