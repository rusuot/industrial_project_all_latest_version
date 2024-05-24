/** @format */

import React, { useState, useEffect, useContext } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./profile.css";
import { app } from "../Firebase";
import Default from "../imgs/default.png";
import USER from "../imgs/user.png";
import contact from "../imgs/contact.png";
import LowerNav from "./LowerNav";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import CartContext from "../store/CartContext";
import WishContext from "../store/WishContext";
const auth = getAuth(app);

function Profile() {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState("");
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();
  const cartContext = useContext(CartContext);
  const wishContext = useContext(WishContext);
  document.title = "Profile section";
  const checkDP = () => {
    if (user && user.photoURL && user.photoURL.includes("https")) {
      setImage(user.photoURL);
    } else if (user && user.photoURL && user.photoURL.includes("http")) {
      const newImage = user.photoURL.replace(/^http:\/\//i, "https://");
      setImage(newImage);
    } else {
      setImage(Default);
    }
  };

  useEffect(() => {
    checkDP();
  }, [user]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);
  const handleUpdateDisplayName = async () => {
    if (auth.currentUser && newDisplayName !== "") {
      await updateProfile(auth.currentUser, {
        displayName: newDisplayName,
      })
        .then(() => {
          alert("Display name updated successfully!");
          setUser({ ...user, displayName: newDisplayName });
          window.location.reload();
        })
        .catch((error) => {
          alert("Failed to update display name: " + error.message);
        });
    }
  };

  const handleUpdateEmail = async () => {
    if (auth.currentUser && newEmail !== "") {
      // Ensure the user has verified their current email or ask to verify if not yet done
      if (!auth.currentUser.emailVerified) {
        await sendEmailVerification(auth.currentUser)
          .then(() => {
            alert(
              "Please verify your email before updating to a new one. Verification email sent!"
            );
          })
          .catch((error) => {
            alert("Failed to send verification email: " + error.message);
          });
      } else {
        // Re-authenticate the user if necessary
        const credential = EmailAuthProvider.credential(
          auth.currentUser.email,
          "003878"
        );

        reauthenticateWithCredential(auth.currentUser, credential)
          .then(() => {
            // Update the email after successful reauthentication
            updateEmail(auth.currentUser, newEmail)
              .then(() => {
                alert("Email updated successfully!");
                setUser({ ...user, email: newEmail }); // Update local state
              })
              .catch((error) => {
                alert("Failed to update email: " + error.message);
              });
          })
          .catch((error) => {
            alert("Re-authentication failed: " + error.message);
          });
      }
    }
  };

  const handleUpdatePassword = async () => {
    if (auth.currentUser && newPassword !== "") {
      await updatePassword(auth.currentUser, newPassword)
        .then(() => {
          alert("Password updated successfully!");
        })
        .catch((error) => {
          alert("Failed to update password: " + error.message);
        });
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={user ? { height: "fit-content" } : { height: "70vh" }}
        className="profile-section">
        <div className={user ? `account-section animate` : `account-section`}>
          <div className="top-section">
            <p className="welcome-mssg">
              {user ? `Welcome, ${user.displayName}` : ""}
            </p>
          </div>
          <div className="account-section2">
            <div className="left-account-section">
              <img src={image} className="profile-img" />
              <p className="profile-name">
                {user ? `${user.displayName}` : ""}
              </p>
              <p className="profile-email">{user ? `${user.email}` : ""}</p>
              {/* <div className="update-section">
               

                <input
                  type="email"
                  placeholder="Update email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
                <button onClick={handleUpdateEmail}>Update Email</button>

          
              </div> */}

              <button
                onClick={() => {
                  signOut(auth);
                  cartContext.clearCart();
                  wishContext.clearWish();
                  setTimeout(() => {
                    navigate("/signup");
                  }, 700);
                }}
                className="signout-btn">
                Sign out
              </button>
            </div>
            <div className="right-account-section">
              <p className="personal-info-head">User Profile Information</p>
              <p className="personal-info-desc">
                Manage your personal information, including your contact
                details.
              </p>
              <div className="personal-user-data">
                <div className="personal-name">
                  <div className="name-section">
                    <p className="name-data">Name</p>
                    <img src={USER} className="user-photo" />
                  </div>
                  <p className="users-name">
                    {user ? `${user.displayName}` : ""}
                  </p>
                  <input
                    type="text"
                    placeholder="Update display name"
                    value={newDisplayName}
                    onChange={(e) => setNewDisplayName(e.target.value)}
                  />
                  <button onClick={handleUpdateDisplayName}>Update Name</button>
                </div>
                <div className="personal-name">
                  <div className="name-section">
                    <p className="name-data">Password</p>
                    <img src={USER} className="user-photo" />
                  </div>

                  <input
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button onClick={handleUpdatePassword}>
                    Update Password
                  </button>
                </div>
                <div className="personal-mail">
                  <div className="mail-section">
                    <p className="mail-data">Contact</p>
                    <img src={contact} className="mail-photo" />
                  </div>
                  <p className="users-mail">
                    {user ? `${user.email.slice(0, 15) + "..."}` : ""}
                  </p>
                </div>
              </div>
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

export default Profile;
