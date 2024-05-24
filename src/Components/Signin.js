import { React, useState } from "react";
import "./signin.css";
import Logo from "../imgs/e-commerce_logo.png";
import Login from "../imgs/login.png";
import Login2 from "../imgs/login2.png";
import google from "../imgs/google.png";
import { Link, useNavigate } from "react-router-dom";
import { app } from "../Firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import swal from "sweetalert";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const [bgLoaded, setBgLoaded] = useState(false);
  const navigate = useNavigate();

  document.title = "E-commerce"

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailBlur = (event) => {
    if (
      event.target.value === "" ||
      !event.target.value.includes("@") ||
      !event.target.value.includes(".com")
    ) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordBlur = (event) => {
    if (event.target.value === "") {
      setPasswordError("Please enter your password.");
    } else if (event.target.value.length < 4) {
      setPasswordError("Password is too small.");
    } else {
      setPasswordError("");
    }
  };

  const LogInUser = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {})
      .catch((error) => {
        swal({
          title: "Error!",
          text: error.message,
          icon: "error",
          buttons: "Ok",
        });
      });
  };

  const GoogleAuth = async () => {
    signInWithPopup(auth, provider)
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        swal({
          title: "Error!",
          text: error.message,
          icon: "error",
          buttons: "Ok",
        });
      });
  };

  const handleBgLoad = () => {
    setBgLoaded(true);
  };

  return (
    <>
      <div className="signin-page">
        <div className="login-navbar">
          <div className="main-logo">
            <img src={Logo} className="ecommerce-logo" />
          </div>
          <div className="signup">
            <Link to="/signup">
              <button className="signup-btn">Sign up</button>
            </Link>
          </div>
        </div>
        <div className="background">
          <img src={Login} className="BG1" onLoad={handleBgLoad} />
          <img src={Login2} className="BG2" onLoad={handleBgLoad} />
        </div>
        {bgLoaded && (
          <div className="main-form">
            <div className="login-form">
              <div className="some-text">
                <p className="user">User Login form</p>
                <p className="user-desc">
                  Please insert your details to get sign in to your account
                </p>
              </div>
              <div className="user-details">
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  required
                />
                {emailError && (
                  <div className="error-message">{emailError}</div>
                )}
                <input
                  type="password"
                  placeholder="Passcode"
                  className="password"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                  required
                />
                {PasswordError && (
                  <div className="error-message">{PasswordError}</div>
                )}
                <button onClick={LogInUser} className="signin-btn">
                  Sign in
                </button>
                <div className="extra-buttons">
                  <p className="or">&#x2015; Or &#x2015;</p>
                  <button onClick={GoogleAuth} className="google">
                    <p>Sign in with</p>
                    <img src={google} className="google-img" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Signin;
