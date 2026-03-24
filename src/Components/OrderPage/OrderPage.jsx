

import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { useCart } from "../../Context/CartContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

import "./Order.css";

import OpenIcon from "../../assets/Open.png";
import CloseIcon from "../../assets/CLOSE.png";
import RedArrow from "../../assets/NON VEG.png";
import GreenArrow from "../../assets/VEG.png";
import SaveIcon from "../../assets/SaveIcon.png";
import ShareIcon from "../../assets/ShareIcon.png";
import StarIcon from "../../assets/StarIcon.png";

import {restaurantsData} from "../../Components/ShopsData/RestaurantsData.jsx";
import reviewsData from "../../data/ReviewsData";

// CATEGORY COMPONENTS
// import Biryani from "../Food/Biryani";
import Pizza from "../Food/Pizza";
import Cake from "../Food/Cake";
// import Paratha from "../Food/Paratha";
// import Rolls from "../Food/Rolls";
// import Shawarma from "../Food/Shawarma";
import Footer from "../Footer/Footer";
import Cookies from "../Food/Cookies";
import Items from "../Food/Items";
import { VscEye } from "react-icons/vsc";
import Burger from "../Food/Burger.jsx";
import Pastry from "../Food/Pastry.jsx";
import Patties from "../Food/Patties.jsx";
// import Sweets from "../Food/Sweets.jsx";
import Icecream from "../Food/Icecream.jsx";
// import CholeBhature from "../Food/CholeBhature.jsx";
// import Roasted from "../Food/Roasted.jsx";
// import Dosa from "../Food/Dosa.jsx";
// import PavBhaji from "../Food/PavBhaji.jsx";
import Offers from "../Food/Offers.jsx";

const OrderPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [showBranches, setShowBranches] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const { cartItems, setItemQty, addToCart, getCartKey } = useCart();

  if (!state || !state.item) return <h2>No order found</h2>;

  const { item } = state;

  const [qty, setQty] = useState(1);
  const [reviews, setReviews] = useState(reviewsData);

  const [selectedImage, setSelectedImage] = useState(item.images?.[0]);

  // ✅ set initial qty from cart (if already added)
  useEffect(() => {
    const key = getCartKey(item);
    const found = cartItems.find((x) => x.key === key);
    setQty(found ? found.quantity : 1);
  }, [item, cartItems, getCartKey]);

  useEffect(() => {
    if (item?.images?.length > 0) setSelectedImage(item.images[0]);
  }, [item]);

  // const orderTopRef = useRef(null);
  // useEffect(() => {
  //   orderTopRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
  // }, []);

  const increase = () => setQty((p) => p + 1);
  const decrease = () => setQty((p) => (p > 1 ? p - 1 : 1));

  const handlePlaceOrder = () => {
    // ✅ Absolute set (no jump)
    setItemQty(item, qty);
    navigate("/cart");
  };

  const handleLike = (id) => {
    setReviews((prev) => prev.map((rev) => (rev.id === id ? { ...rev, likes: rev.likes + 1 } : rev)));
  };

  const handleDislike = (id) => {
    setReviews((prev) => prev.map((rev) => (rev.id === id ? { ...rev, dislikes: rev.dislikes + 1 } : rev)));
  };

  const restaurant = restaurantsData.find((rest) => rest.id === item.restaurantId);

  const category = state?.category || item?.category || "";

  const renderCategoryComponent = () => {
    switch (category.toLowerCase()) {
      // case "sweets":
      //   return (
      //     <>
      //       <Sweets />
      //       <Biryani />
      //       <Burger />
      //       <Rolls />
      //       <Paratha />
      //       <Icecream />
      //       <Pastry />
      //       <CholeBhature />
      //       <Cookies />
      //       <Patties />
      //       <Pizza />
      //       <Shawarma />
      //       <Cake />
      //       <Dosa />
      //       <Roasted />
      //       <PavBhaji />
      //       <Items />
      //       {/* <Biryani /> */}
      //     </>
      //   );
        //  case "icecream":
        // return (
        //   <>
        //   <Icecream />
        //     <Burger />
        //     <Sweets />
        //     <Rolls />
        //     <Paratha />
        //      <Biryani />
        //     <Pastry />
        //     <CholeBhature />
        //     <Cookies />
        //     <Patties />
        //     <Pizza />
        //     <Shawarma />
        //     <Cake />
        //     <Dosa />
        //     <Roasted />
        //     <PavBhaji />
        //     <Items />
        //     {/* <Biryani /> */}
        //   </>
        // );
      // case "biryani":
      //   return (
      //     <>
      //       <Biryani />
      //       <Burger />
      //       <Sweets />
      //       <Rolls />
      //       <Paratha />
      //       <Icecream />
      //       <Pastry />
      //       <CholeBhature />
      //       <Cookies />
      //       <Patties />
      //       <Pizza />
      //       <Shawarma />
      //       <Cake />
      //       <Dosa />
      //       <Roasted />
      //       <PavBhaji />
      //       <Items />
      //       {/* <Biryani /> */}
      //     </>
      //   );
      case "pizza":
        return (
          <>
            <Pizza />
            <Burger />
            {/* <Sweets /> */}
            {/* <Rolls />
            <Paratha /> */}
            <Icecream />
            <Pastry />
            {/* <CholeBhature /> */}
            <Cookies />
            {/* <Patties /> */}
            {/* <Biryani />
            <Shawarma /> */}
            <Cake />
            {/* <Dosa />
            <Roasted />
            <PavBhaji /> */}
            <Items />
          </>
        );
        //  case "cholebhature":
        // return (
        //   <>
        //   <CholeBhature />
        //     <Burger />
        //     <Sweets />
        //     <Rolls />
        //     <Paratha />
        //     <Icecream />
        //     <Pastry />
        //      <Biryani />
        //     <Cookies />
        //     <Patties />
        //     <Pizza />
        //     <Shawarma />
        //     <Cake />
        //     <Dosa />
        //     <Roasted />
        //     <PavBhaji />
        //     <Items />
        //     {/* <Biryani /> */}
        //   </>
        // );
      case "cake":
        return (
          <>
            <Cake />
            <Burger />
            {/* <Sweets />
            <Rolls />
            <Paratha /> */}
            <Icecream />
            <Pastry />
            {/* <CholeBhature /> */}
            <Cookies />
            {/* <Patties /> */}
            {/* <Biryani />
            <Shawarma /> */}
            <Pizza />
            {/* <Dosa />
            <Roasted />
            <PavBhaji /> */}
            <Items />
          </>
        );
         case "pastry":
        return (
          <>
          <Pastry />
          {/* <CholeBhature /> */}
            <Burger />
            {/* <Sweets />
            <Rolls />
            <Paratha /> */}
            <Icecream />
             {/* <Biryani /> */}
            <Cookies />
            {/* <Patties /> */}
            <Pizza />
            {/* <Shawarma /> */}
            <Cake />
            {/* <Dosa />
            <Roasted />
            <PavBhaji /> */}
            <Items />
            {/* <Biryani /> */}
          </>
        );
        // case "roasted":
        // return (
        //   <>
        //   <Roasted />
        //   <Pastry />
        //   <CholeBhature />
        //     <Burger />
        //     <Sweets />
        //     <Rolls />
        //     <Paratha />
        //     <Icecream />
        //      <Biryani />
        //     <Cookies />
        //     <Patties />
        //     <Pizza />
        //     <Shawarma />
        //     <Cake />
        //     <Dosa />
        //     <PavBhaji />
        //     <Items />
        //     {/* <Biryani /> */}
        //   </>
        // );
      // case "paratha":
      //   return (
      //     <>
      //       <Paratha />
      //       <Burger />
      //       <Sweets />
      //       <Rolls />
      //       <Cake />
      //       <Icecream />
      //       <Pastry />
      //       <CholeBhature />
      //       <Cookies />
      //       <Patties />
      //       <Biryani />
      //       <Shawarma />
      //       <Pizza />
      //       <Dosa />
      //       <Roasted />
      //       <PavBhaji />
      //       <Items />
      //     </>
      //   );
      // case "rolls":
      //   return (
      //     <>
      //       <Rolls />
      //       <Burger />
      //       <Sweets />
      //       <Paratha />
      //       <Cake />
      //       <Icecream />
      //       <Pastry />
      //       <CholeBhature />
      //       <Cookies />
      //       <Patties />
      //       <Biryani />
      //       <Shawarma />
      //       <Pizza />
      //       <Dosa />
      //       <Roasted />
      //       <PavBhaji />
      //       <Items />
      //     </>
      //   );
      // case "shawarma":
      //   return (
      //     <>
      //       <Shawarma />
      //       <Burger />
      //       <Sweets />
      //       <Paratha />
      //       <Cake />
      //       <Icecream />
      //       <Pastry />
      //       <CholeBhature />
      //       <Cookies />
      //       <Patties />
      //       <Biryani />
      //       <Rolls />
      //       <Pizza />
      //       <Dosa />
      //       <Roasted />
      //       <PavBhaji />
      //       <Items />
      //     </>
      //   );
      case "cookies":
        return (
          <>
            <Cookies />
            <Burger />
            {/* <Sweets /> */}
            {/* <Paratha /> */}
            <Cake />
            <Icecream />
            <Pastry />
            {/* <CholeBhature />
            <Shawarma /> */}
            {/* <Patties /> */}
            {/* <Biryani />
            <Rolls /> */}
            <Pizza />
            {/* <Dosa />
            <Roasted />
            <PavBhaji /> */}
            <Items />
          </>
        );
        // case "patties":
        // return (
        //   <>
        //   {/* <Patties /> */}
        //   <Pastry />
        //   {/* <CholeBhature /> */}
        //     <Burger />
        //     {/* <Sweets />
        //     <Rolls />
        //     <Paratha /> */}
        //     <Icecream />
        //      {/* <Biryani /> */}
        //     <Cookies />
        //     <Pizza />
        //     {/* <Shawarma /> */}
        //     <Cake />
        //     {/* <Dosa />
        //     <Roasted />
        //     <PavBhaji /> */}
        //     <Items />
        //     {/* <Biryani /> */}
        //   </>
        // );
        // case "dosa":
        // return (
        //   <>
        //     <Dosa />
        //   <CholeBhature />
        //     <Burger />
        //     <Sweets />
        //     <Rolls />
        //   <Pastry />
        //     <Paratha />
        //     <Icecream />
        //      <Biryani />
        //     <Cookies />
        //     <Patties />
        //     <Pizza />
        //     <Shawarma />
        //     <Cake />
        //     <Roasted />
        //     <PavBhaji />
        //     <Items />
        //     {/* <Biryani /> */}
        //   </>
        // );
        // case "burger":
        // return (
        //   <>
        //   <Burger />
        //   <CholeBhature />
        //     <Sweets />
        //     <Rolls />
        //     <Paratha />
        //   <Pastry />
        //     <Icecream />
        //      <Biryani />
        //     <Cookies />
        //     <Patties />
        //     <Pizza />
        //     <Shawarma />
        //     <Cake />
        //     <Dosa />
        //     <Roasted />
        //     <PavBhaji />
        //     <Items />
        //     {/* <Biryani /> */}
        //   </>
        // );
        // case "pavbhaji":
        // return (
        //   <>
        //     <PavBhaji />
        //   <CholeBhature />
        //     <Burger />
        //     <Sweets />
        //     <Rolls />
        //     <Paratha />
        //     <Icecream />
        //      <Biryani />
        //     <Pastry />
        //     <Cookies />
        //     <Patties />
        //     <Pizza />
        //     <Shawarma />
        //     <Cake />
        //     <Dosa />
        //     <Roasted />
        //     <Items />
        //     {/* <Biryani /> */}
        //   </>
        // );
      case "hot":
        return (
          <>
            <Items />
            {/* <Shawarma /> */}
            <Burger />
            {/* <Sweets />
            <Paratha /> */}
            <Cake />
            {/* <Icecream /> */}
            <Pastry />
            {/* <CholeBhature /> */}
            <Cookies />
            {/* <Patties /> */}
            {/* <Biryani /> */}
            {/* <Rolls /> */}
            <Pizza />
            {/* <Dosa />
            <Roasted />
            <PavBhaji /> */}
          </>
        );
        case "offers":
        return (
          <>
          <Offers/>
          <Pastry />
          {/* <CholeBhature /> */}
            <Burger />
            {/* <Sweets />
            <Rolls />
            <Paratha /> */}
            <Icecream />
             {/* <Biryani /> */}
            <Cookies />
            {/* <Patties /> */}
            <Pizza />
            {/* <Shawarma /> */}
            <Cake />
            {/* <Dosa />
            <Roasted />
            <PavBhaji /> */}
            <Items />
            {/* <Biryani /> */}
          </>
        );

      default:
         return (
          <>
          <Offers/>
          <Pastry />
          {/* <CholeBhature /> */}
            <Burger />
            {/* <Sweets />
            <Rolls />
            <Paratha /> */}
            <Icecream />
             {/* <Biryani /> */}
            <Cookies />
            {/* <Patties /> */}
            <Pizza />
            {/* <Shawarma /> */}
            <Cake />
            {/* <Dosa />
            <Roasted />
            <PavBhaji /> */}
            <Items />
            {/* <Biryani /> */}
          </>
        );
    }
  };


useEffect(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "auto"   // smooth mat use karo yahan
  });
}, []);

  return (
    <>
      <div className="food-container" >
        <div className="order-container">
          <span> Home / Chicken Biryani / Hyderabadi Biryani </span>

          <div className="order-card">
            {/* <div className="column">
              {item?.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className={selectedImage === img ? "side-img active-thumb" : "side-img"}
                  onMouseEnter={() => setSelectedImage(img)}
                  onClick={() => setSelectedImage(img)}
                  alt=""
                />
              ))}
            </div> */}

            <div className="order-image-box">
              {selectedImage && (
                <img key={selectedImage} src={selectedImage} alt={item.title} className="order-image" />
              )}

              <img
                className="order-type-icon"
                src={item.type === "veg" ? GreenArrow : RedArrow}
                alt=""
              />
              {/* <div style={{position: "absolute", left: 10, top: "px", zIndex: '3',}}>{item.view} <VscEye style={{ fontSize: "25px", color: "white", position: "absolute", right: 160, top: "16px", zIndex: '3', cursor: "pointer" }} /></div> */}

            </div>
            <div className="order-details">
              <div className="order-status">
                <img src={item.isOpen ? OpenIcon : CloseIcon} alt="" />
                <p>{item.status}</p>

                <div className="order-status-icons">

                  <FaRegHeart style={{ fontSize: "25px", marginTop: "2px", cursor: "pointer" }} />

                  <img src={SaveIcon} alt="" />
                  <img src={ShareIcon} alt="" />
                </div>
              </div>

              <h2 className="order-food-title">
                {item.title} <span>({item.portion})</span>
              </h2>

              <p className="food-desc1">{item.desc.slice(0, 300)}</p>

              <div className="order-rating">
                <img src={StarIcon} alt="" />
                <h3>
                  {item.rating} <span>({item.reviews})</span>
                </h3>
                <p>{item.orders} orders last week</p>
              </div>

              <div className="order-price-row">
                <small className="order-price">
                  <span className="rs">₹</span> {item.price}
                </small>
                <span className="offer1">
                  <small className="offer1">₹</small>
                  {item.offer}
                </span>
                <span className="food-off">{item.off}% OFF</span>
              </div>
              {/* {selectedBranch && (
                <div className="selected-branch-info">
                  <p>
                    <strong>Ordering from: </strong> {selectedBranch.name}
                  </p>
                  <p><strong>Address:</strong> {selectedBranch.address}</p>
                  <p>
                    <strong>Timing: </strong> {selectedBranch.timing}
                  </p>
                  <p>
                    <strong>Phone: </strong> {selectedBranch.phone}
                  </p>
                </div>
              )} */}

              <div className="food-action">
                <button className="order-btnn" onClick={handlePlaceOrder}>
                  Place order
                </button>

                <div className="adds">
                  <span>ADD</span>
                </div>

                <div className="add-btnn">
                  <button onClick={decrease}>-</button>
                  <span>{qty}</span>
                  <button onClick={increase}>+</button>
                </div>
              </div>
            </div>
          </div>

          <div className="reviews">
            <div className="review-res">
              <h1> Customer Reviews</h1>

              <div className="comments">
                <input type="text" placeholder="Write a reveiw..." />
                <button>Post</button>
              </div>

              {reviews.map((rev) => (
                <div key={rev.id} className="review-card">
                  <img src={rev.dp} alt={rev.name} className="review-dp" />
                  <div className="review-content">
                    <h3>{rev.name}</h3>
                    <p>{rev.comment}</p>
                    <div className="review-actions">
                      <button onClick={() => handleLike(rev.id)}>
                        <FontAwesomeIcon icon={faThumbsUp} className="likes" />
                        {rev.likes}
                      </button>

                      <button onClick={() => handleDislike(rev.id)}>
                        <FontAwesomeIcon icon={faThumbsDown} className="likes" /> {rev.dislikes}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {restaurant && (
              <div className="shop">
                <h2>Restaurant</h2>

                <div className="img">
                  <img src={restaurant.image} alt={restaurant.name} className="shop-image" />
                  <div className="shop-text">
                    <h3>
                      {restaurant.name} <span>(Lic. No. {restaurant.license})</span>
                    </h3>
                    <p>
                      {restaurant.address}, {restaurant.phone}
                    </p>
                    {/* <p
                      className="view-resto"
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() => setShowBranches(true)}
                    >
                      Restaurant Branches
                    </p> */}

                  </div>
                </div>
                <div className="order-rating">
                  <img src={StarIcon} alt="" />
                  <h3>
                    <span className="number">{restaurant.rating}</span>{" "}
                    <span>({restaurant.reviews})</span>
                  </h3>
                  <p>
                    <span className="number">{restaurant.orders}</span> orders last week |{" "}
                    <span className="number">{restaurant.followers}</span> Followers |{" "}
                    <span className="number">{restaurant.foods}</span> Foods
                  </p>
                </div>

                <p className="shop-meta">
                  <span className="label">Timing :</span> {restaurant.timing} |{" "}
                  <Link
                    to="/restaurant-detail"
                    state={{ restaurant }}
                  >
                    <button className="view-resto">View Restaurant</button>
                  </Link>

                </p>

              </div>
            )}
          </div>
        </div>
      </div>

      {/* {selectedBranch && (
        <div className="selected-branch-info">
          <p>
            <strong>Ordering from: </strong> {selectedBranch.name}
          </p>
          <p><strong>Address: </strong> {selectedBranch.address}</p>
          <p>
            <strong>Timing: </strong> {selectedBranch.timing}
          </p>
          <p>
            <strong>Phone: </strong> {selectedBranch.phone}
          </p>
        </div>
      )} */}

      {/* {showBranches && restaurant && (
        <div className="branch-popup-overlay">
          <div className="branch-popup">

            
            <div className="branch-header">
              <h2>{restaurant.title}</h2>
              <p className="branch-subtitle">Select a nearest restaurant branch</p>

              <button
                className="close-btn"
                onClick={() => setShowBranches(false)}
              >
                ✕
              </button>
            </div>

           
            <div className="branch-list">
              {restaurant.branches?.map((branch) => (
                <div key={branch.id} className="branch-row">

                  
                  <div className="branch-details">
                    <p><strong>Branch :</strong> {branch.name}</p>
                    <p><strong>Address :</strong> {branch.address}</p>
                    <p><strong>Timing :</strong> {branch.timing}</p>
                    <p><strong>Phone :</strong> {branch.phone}</p>
                  </div>

                  
                  <div className="branch-action">
                    <button
                      className="select-branch-btn"
                      onClick={() => {
                        setSelectedBranch(branch); 
                        setShowBranches(false);    
                      }}
                    >
                      Select
                    </button>

                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>

      )} */}


      {renderCategoryComponent()}

      <Footer />
    </>
  );
};

export default OrderPage;
