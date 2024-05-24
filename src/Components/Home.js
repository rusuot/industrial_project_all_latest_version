import {React,useState} from "react";
import "./home.css";
import Delivery from "../imgs/delivery.png";
import Popular from "./Category/Popular";
import Navbar from './Navbar'
// import { useNavigate } from "react-router-dom";

function Home() {
  const [scrollPosition, setScrollPosition] = useState(0);
  // const navigate = useNavigate();

  document.title = "IndustrialProject"

  const handleScroll = () => {
    window.scrollTo({
      top: scrollPosition + 750, 
      behavior: "smooth" 
    });
    setScrollPosition(scrollPosition + 750);
    setTimeout(() => {
    setScrollPosition(0); 
      
    }, 100); 
  };

  return (
    <>
    <Navbar/>
        <div className="content">
          <div className="browse_products-area">
            <div className="browse_products-data">
              <p className="browse_products-head">Free Delivery!</p>
              <p className="browse_products-desc">
                Don't miss it out! Only today, get free{" "}
                <b style={{ fontSize: "22px" }}>Next Day</b> delivery on all
                your orders.
              </p>
            </div>
            <button onClick={handleScroll} className="browse-btn">Browse products</button>
          </div>
          <img src={Delivery} className="delivery" />
          <Popular />



        </div>
    </>
  );
}

export default Home;
