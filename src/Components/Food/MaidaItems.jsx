import React, { useMemo, useRef, useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { FaEye, FaRegHeart } from "react-icons/fa";
import "./Food.css";

import Open from "../../assets/Open.png";
import Close from "../../assets/CLOSE.png";
import RedArrow from "../../assets/NON VEG.png";
import GreenArrow from "../../assets/VEG.png";
import SaveIcon from "../../assets/SaveIcon.png";
import ShareIcon from "../../assets/ShareIcon.png";
import StarIcon from "../../assets/StarIcon.png";

// import MaidaItemsList from "../../data/MaidaItemsData";

// ✅ Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

// Use the Cart context
import { useCart } from "../../Context/CartContext";
import { VscEye } from "react-icons/vsc";
import { LiaStopwatchSolid } from "react-icons/lia";


const MaidaItems = ({ selectedCategory, filter, sortBy, price, cuisine, category }) => {
    const navigate = useNavigate();
    const swiperRef = useRef(null);

    const { cartItems, addToCart, updateQty, getCartKey } = useCart();

    // const list = useMemo(() => MaidaItemsList, []);
    const [openCardId, setOpenCardId] = useState(null);
    const [selectedSlots, setSelectedSlots] = useState({});
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!category) return;

        axios
            .get(`https://shyambackend.onrender.com/api/products/category-products/${category}`)
            .then((res) => {
                // console.log("Category Data:", res.data);
                setList(res.data.products);
            })
            .catch((err) => console.log(err));
    }, [category]);

    const filteredList = useMemo(() => {
        let result = [...list];
        // if (!filteredList.length) return null;
        // Veg / Non-Veg filter
        if (filter === "veg") {
            result = result.filter(item => item.type === "veg");
        }

        if (filter === "nonveg") {
            result = result.filter(item => item.type === "nonveg");
        }

        // Price filter
        if (price) {
            const [min, max] = price.split("-").map(Number);
            result = result.filter(item =>
                max
                    ? item.price >= min && item.price <= max
                    : item.price >= min
            );
        }

        // Cuisine filter
        if (cuisine) {
            result = result.filter(item => item.cuisine === cuisine);
        }

        // Sorting
        if (sortBy === "name") {
            result.sort((a, b) => a.title.localeCompare(b.title));
        }

        if (sortBy === "rating") {
            result.sort((a, b) => b.rating - a.rating);
        }

        if (sortBy === "priceLow") {
            result.sort((a, b) => a.price - b.price);
        }

        if (sortBy === "priceHigh") {
            result.sort((a, b) => b.price - a.price);
        }
        return result;
    }, [list, filter, price, cuisine, sortBy]);
    // Get the quantity for a particular item in the cart
    const getQty = (item) => {
        const key = getCartKey(item);
        const found = cartItems.find((x) => x.key === key);
        return found ? found.quantity : ("ADD");
    };

    // Increase quantity function
    const increase = (item) => {
        addToCart(item, 1); // Always add 1 when increasing
    };

    // Decrease quantity function
    const decrease = (item) => {
        const key = getCartKey(item);
        const found = cartItems.find((x) => x.key === key);
        if (!found) return;
        updateQty(key, found.quantity - 1);
    };

    // Place order function
    const placeOrder = (item) => {
        navigate("/order", {
            state: {
                item,
                quantity: getQty(item),
                category: "maidaitems",
            },
        });
    };

    return (
        <div
            id={category.toLowerCase().replace(/\s+/g, "-")}
            className="food-container"
        >
            <div className="food-text">
                <h1>{category}</h1>
                <p
                    className="view-all"
                    onClick={() => navigate(`/category/${encodeURIComponent(category)}`)}
                >
                    View all
                </p>
            </div>
            <Swiper
                modules={[Autoplay]}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                loop={true}
                speed={700}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}

                breakpoints={{

                    300: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    400: {
                        slidesPerView: 1.3,
                        spaceBetween: 20,
                    },
                    500: {
                        slidesPerView: 1.5,
                        spaceBetween: 20,
                    },
                    700: {
                        slidesPerView: 2,
                        spaceBetween: 18,
                    },
                    800: {
                        slidesPerView: 2.5,
                        spaceBetween: 18,
                    },
                    //    900: {
                    //   slidesPerView: 3,
                    //   spaceBetween: 20,
                    // },
                    1000: {
                        slidesPerView: 3,
                        spaceBetween: 18,
                    },

                    900: {
                        slidesPerView: 2.5,
                        spaceBetween: 23,
                    },
                    1224: {
                        slidesPerView: 3.8,
                        spaceBetween: 23,
                    },
                    1300: {
                        slidesPerView: 4,
                        spaceBetween: 16,
                    },
                    1500: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },

                    1600: {
                        slidesPerView: 5,
                        spaceBetween: 16,
                    }
                }}

                className="food-card-row"
            >


                {filteredList.map((item) => (
                    <SwiperSlide key={item._id}>
                        <div className="food-card">
                            {/* IMAGE */}
                            {/* ADD badge – only for video cards */}
                            {item.video && (
                                <div className="add-badge">
                                    Ads
                                </div>
                            )}

                            <div className="food-image-wrapper">
                                {openCardId === item._id && (
                                    <div className="slot-popup-overlay">
                                        <div className="slot-popup-content">
                                            <h4>Select a Slot</h4>
                                            <ul>
                                                {Array.isArray(item.slots) && item.slots.map((slot) => (
                                                    <li
                                                        key={slot}
                                                        className={selectedSlots[item._id] === slot ? "selected" : ""}
                                                        onClick={() =>
                                                            setSelectedSlots({ ...selectedSlots, [item._id]: slot })
                                                        }
                                                    >
                                                        {slot}
                                                    </li>
                                                ))}

                                            </ul>
                                            <button
                                                onClick={() => {
                                                    alert(
                                                        `Order: ${item.title}\nSlot: ${selectedSlots[item._id]}\nPrice: ₹${item.price}`
                                                    );
                                                    setOpenCardId(null); // 👈 popup close
                                                }}
                                            // disabled={!selectedSlots[item.id]}
                                            >
                                                Set Time & Place Order
                                            </button>

                                        </div>
                                    </div>
                                )}

                                {/* 🎥 MP4 Video */}
                                {item.video && item.video.endsWith(".mp4") && (
                                    <video
                                        className="food-image"
                                        src={item.video}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        preload="metadata"
                                    />
                                )}

                                {/* 🖼 Image – when no video */}
                                {!item.video && (
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="food-image"
                                    />
                                )}

                                {/* Veg / Non-veg icon */}
                                <div className="view-eye"><VscEye style={{ fontSize: "22px", color: "white", marginBottom: "-2px", cursor: "pointer" }} />{item.view}</div>
                                <img
                                    className="top-icon"
                                    src={item.type === "veg" ? GreenArrow : RedArrow}
                                    alt=""
                                />
                            </div>

                            <div className="food-info">
                                <div className="food-status-left">
                                    <img src={item.isOpen ? Open : Close} alt="" />
                                    <p>{item.status}</p>

                                    <div className="food-status-right-icon">
                                        <LiaStopwatchSolid
                                            size={24}
                                            color="#ff5722"
                                            title="Select Slot"
                                            onClick={() => setOpenCardId(openCardId === item._id ? null : item._id)}
                                            style={{ marginTop: "-1px", cursor: "pointer" }}
                                        />

                                        <FaRegHeart
                                            size={20}
                                            color=""
                                            title="Like"
                                            style={{ cursor: "pointer" }}
                                        />
                                        <img src={SaveIcon} alt="Save" title="Book Mark" />
                                        <img src={ShareIcon} alt="Share" title="Share" />
                                    </div>
                                </div>

                                <h2>
                                    {item.title} <span>({item.portion})</span>
                                </h2>

                                <p className="food-desc">
                                    {item.desc.slice(0, 60) + "..."}
                                </p>

                                <div className="food-rating">
                                    <img src={StarIcon} alt="" />
                                    <h3>
                                        {item.rating} <span>({item.reviews})</span>
                                    </h3>
                                    <p>{item.orders} orders last week</p>
                                </div>

                                <div className="food-price-row">
                                    <span className="food-price">
                                        <small className="Rs">₹</small> {item.price}
                                    </span>
                                    <span className="offer">
                                        <small className="offer">₹</small>
                                        {item.offer}
                                    </span>
                                    <span className="food-off">{item.off}% OFF</span>
                                </div>

                                <div className="food-actions">
                                    <button
                                        className="order-btn"
                                        onClick={() => placeOrder(item)}
                                    >
                                        Place order
                                    </button>
                                    {/* <div className="add" onClick={() => increase(item)}>
                    <span>ADD</span>
                  </div> */}
                                    <div className="add-btn">
                                        <button onClick={() => decrease(item)}>-</button>
                                        <span>{getQty(item)}</span>
                                        <button onClick={() => increase(item)}>+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div >
    )
}

export default MaidaItems
