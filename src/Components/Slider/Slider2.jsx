// Slider2.jsx
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Slider.css";

const Slider2 = () => {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);
  const isTransitioning = useRef(false);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/banner");
        const flatBanners = res.data.banners
          .filter(b => b.type === "flat")
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        if (!flatBanners.length) return;

        const latestFlat = flatBanners[0];
        const images = latestFlat.images.map(img => ({
          src: `http://localhost:5000/uploads/${img}`,
          title: latestFlat.title,
        }));
        setSlides(images);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBanners();
  }, []);

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

  if (!slides.length) return null;

  return (
    <div className="slider1-container">
      <div className="slider-track" ref={trackRef}>
        {loopSlides.map((slide, i) => (
          <div className="slide" key={i}>
            <img src={slide.src} className="bg-img" alt={slide.title} />
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

export default Slider2;