import React from "react";
import "./footer.css";
import Logo from "../imgs/e-commerce_logo.png";

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="disclaimer-area">
          <p className="disclaimer-desc">
            <b>Disclaimer:</b> This IndustrialProject ...[to be updated]
          </p>
        </div>
      </div>
      <div className="extra-data">
        <div className="link-section">
          <div className="first-row">
            <p className="bold">Students Name:</p>
            <p>Rusu Ovidiu Tiberiu</p>
            <p>Farzaneh [Please insert your full name]</p>
            <p>Kiros Hadera Gebregiziabher</p>
          </div>
          <div className="second-row">
            <p className="bold">About E-commerce project</p>
            <p>Industrial Consulting Project</p>
              <p>QHO635</p>
              <p>Group Project</p>
          </div>
          <div className="third-row">
            <p className="bold">Connect with Us</p>
            <p>Sell apps on E-commerce</p>
            <p>Shop with Points</p>
            <p>Shipping Rates & Policies</p>
          </div>
          <div className="fourth-row">
            <p className="bold">E-commerce Cares</p>
            <p>Become an Affiliate</p>
            <p>Reload Your Balance</p>
            <p>Returns & Replacements</p>
          </div>
        </div>
        <div className="link-section2">
          <div className="first-one">
            <div className="first-row">
              <p className="bold">Get to Know Us</p>
              <p>Make Money with Us</p>
              <p>E-commerce Payment</p>
              <p>Let Us Help You</p>
            </div>
            <div className="second-row">
              <p className="bold">About E-commerce</p>
              <p>Industrial Consulting Project</p>
              <p>QHO635</p>
              <p>Group Project</p>
            </div>
          </div>
          <div className="second-one">
            <div className="third-row">
              <p className="bold">Connect with Us</p>
              <p>Sell apps on E-commerce</p>
              <p>Shop with Points</p>
              <p>Shipping Rates & Policies</p>
            </div>
            <div className="fourth-row">
              <p className="bold">E-commerce Cares</p>
              <p>Become an Affiliate</p>
              <p>Reload Your Balance</p>
              <p>Returns & Replacements</p>
            </div>
          </div>
        </div>
        <div className="developer">
          <img src={Logo} className="ecommerce-img" />
          <div className="dev-data">
            <p>&copy; 2024 Spring-EarlySummer | Developed by Group Team... To be updated </p>
            <a
              className="dev-link"
              href="https://github.com/rusuot/"
              target="_blank"
            >
              IndustrialProject-GroupProject_GIT_Link_To_Be_Updated
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
