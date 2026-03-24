// DynamicSlider.jsx
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Slider.css";
import offerIcon from "../../assets/offer.png"; // offer overlay icon
import { useNavigate } from "react-router-dom";

const DynamicSlider = () => {
  const navigate = useNavigate();
  const [banner, setBanner] = useState(null); // latest banner
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);
  const isTransitioning = useRef(false);

  // Fetch latest banner
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/banner");
        const banners = res.data.banners;
        if (!banners || banners.length === 0) return;

        // Sort by latest
        const latest = banners.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )[0];

        setBanner(latest);

        // Prepare slides
        const slidesData = latest.images.map(img => ({
          src: `http://localhost:5000/uploads/${img}`,
          title: latest.title,
          off: latest.off,
          type: latest.type
        }));

        setSlides(slidesData);
      } catch (err) {
        console.error("Error fetching banners:", err);
      }
    };

    fetchBanners();
  }, []);

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

  // Smooth infinite loop
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

  if (!banner) {
    return <div style={{ textAlign: "center", padding: "20px" }}>Loading banner...</div>;
  }

  // Duplicate slides for seamless loop
  const loopSlides = [...slides, ...slides];

  // const handleClick = (item) => {

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
  const handleClick = (item) => {

  if (item.type === "flat") return;

  if (item.type === "combo") {
    navigate("/all-combos");
  }

  else if (item.type === "weekend") {
    navigate("/weekend-specials");
  }

  else if (item.type === "offer") {
    navigate(`/discount?tag=offer&discount=${item.off}`);
  }
};
  return (
    <div className="slider-container">
      <div className="slider-track" ref={trackRef}>
        {loopSlides.map((slide, i) => (
          <div key={i} className="slide" onClick={() => handleClick(slide)}>
            <img src={slide.src} className="bg-img" alt={slide.title} />
            {slide.type === "offer" && <img src={offerIcon} className="offer-img" alt="offer" />}
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

export default DynamicSlider;