// Slider.jsx
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Slider.css";
import offerImg from "../../assets/offer.png";
import { useNavigate } from "react-router-dom";

const Slider = () => {
  const navigate = useNavigate();
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);
  const isTransitioning = useRef(false);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/banner");
        const clickableBanners = res.data.banners
          .filter(b => ["offer", "combo", "weekend", "flat"].includes(b.type))
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        if (clickableBanners.length === 0) return;

        const latestBanner = clickableBanners[0];
        const images = latestBanner.images.map(img => ({
          src: `http://localhost:5000/uploads/${img}`,
          off: latestBanner.off,
          title: latestBanner.title,
          type: latestBanner.type,
        }));

        setSlides(images);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBanners();
  }, []);

  // Duplicate slides for smooth loop
  const loopSlides = [...slides, ...slides];

  // Autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning.current && slides.length > 0) {
        isTransitioning.current = true;
        setIndex(prev => prev + 1);
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [slides]);

  // Smooth loop
  useEffect(() => {
    const track = trackRef.current;
    if (!track || slides.length === 0) return;

    track.style.transition = "transform 0.8s ease-in-out";
    track.style.transform = `translateX(-${index * 100}%)`;

    const handleTransitionEnd = () => {
      if (index >= slides.length) {
        track.style.transition = "none";
        track.style.transform = "translateX(0)";
        setIndex(0);
      }
      isTransitioning.current = false;
    };

    track.addEventListener("transitionend", handleTransitionEnd);
    return () => track.removeEventListener("transitionend", handleTransitionEnd);
  }, [index, slides]);

//   const handleClick = (item) => {

//   // ❌ flat → do nothing
//   if (item.type === "flat") {
//     return;
//   }

//   // ✅ offer
//   if (item.type === "offer") {
//     navigate(`/discount?type=offer&discount=${item.off}`);
//   }

//   // ✅ combo
//   else if (item.type === "combo") {
//     navigate(`/discount?type=combo`);
//   }

//   // ✅ weekend
//   else if (item.type === "weekend") {
//     navigate(`/discount?type=weekend`);
//   }
// };
  if (slides.length === 0)
    return <div className="slider-container">Loading banners...</div>;

  return (
    <div className="slider-container">
      <div className="slider-track" ref={trackRef}>
        {loopSlides.map((slide, i) => (
          <div
            key={i}
            className="slide"
            onClick={() => handleClick(slide)}
          >
            <img src={slide.src} className="bg-img" alt={slide.title} />
            <img src={offerImg} className="offer-img" alt="offer" />
          </div>
        ))}
      </div>

      <div className="slider-dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`dot ${index % slides.length === i ? "active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;