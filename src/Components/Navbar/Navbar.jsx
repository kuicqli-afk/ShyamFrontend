import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import "./Navbar.css";

import { FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import shyam from "../../assets/syam.png"
import profile from "../../assets/profile.gif";
import cart from "../../assets/cart.gif";
import resturant from "../../assets/resturant.gif";
import LoginPage from "../Login/LoginPage";

const PLACEHOLDERS = [
  "Search for Shyam Bakers & Namkeen, a cuisine, or a dish…",
  "Search for patties",
  "Search for cookies",
  "Search for pizza",
  "Search for cake",
  "Search for namkeens",
  "Search for sev",
];

const Navbar = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const { cartItems } = useCart();

  const [searchValue, setSearchValue] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [isInputActive, setIsInputActive] = useState(false);

  const count = cartItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  /* =============================
  SEARCH ANIMATION HAI
  ============================== */

  const textIndex = useRef(0);
  const charIndex = useRef(0);
  const direction = useRef("typing");

  useEffect(() => {
    if (isInputActive) return;

    const interval = setInterval(() => {
      const text = PLACEHOLDERS[textIndex.current];

      if (direction.current === "typing") {
        charIndex.current++;
        setDisplayText(text.slice(0, charIndex.current));

        if (charIndex.current === text.length) {
          direction.current = "deleting";
        }
      } else {
        charIndex.current--;
        setDisplayText(text.slice(0, charIndex.current));

        if (charIndex.current === 0) {
          direction.current = "typing";
          textIndex.current =
            (textIndex.current + 1) % PLACEHOLDERS.length;
        }
      }
    }, 80);

    return () => clearInterval(interval);
  }, [isInputActive]);


  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setIsInputActive(value.length > 0);

    // 🔒 OPTIONAL: store globally / localStorage
    localStorage.setItem("search", value);
  };

  return (
    <>
      <div className="nav-container">
        <div className="nav-left">
          <Link to="/" style={{textDecoration : "none"}}>
            {/* <h1 className="logo-text">Food</h1> */}
            <img className="logo-text" src={shyam} alt="" />
          </Link>

          <ul>
            <li>
              <FaLocationDot />
              <small>LUCKNOW CITY</small>
            </li>
          </ul>

          <div className="search-box">
            <FaSearch className="search-icon" />

            <div className="typing-wrapper">
              {!isInputActive && (
                <span className="typing-erase">{displayText}</span>
              )}

              <input
                type="text"
                value={searchValue}
                onFocus={() => setIsInputActive(true)}
                onBlur={() => {
                  if (!searchValue) setIsInputActive(false);
                }}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
 
        <div className="nav-right">
          <ul className="nav-list">
            {/* <Link to="/restaurant" className="nav-link">
              <li className="nav-item">
                <img src={resturant} alt="" />
               Shop by Restaurants
              </li>
            </Link> */}

            <li className="nav-item" onClick={() => setOpenLogin(true)}>
              <img src={profile} alt="" />
              Login
            </li>

            <Link to="/cart" className="nav-link">
              <li className="nav-item">
                <img src={cart} alt="" /> ({count})
              </li>
            </Link>
          </ul>
        </div>
      </div>

      {openLogin && (
        <div className="login-overlay" onClick={() => setOpenLogin(false)}>
          <div className="login-card" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpenLogin(false)}>×</button>
            <LoginPage />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
