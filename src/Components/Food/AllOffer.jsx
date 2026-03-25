
import React from "react";
import "./AllOffer.css";

import img1 from "../../assets/shyam.png";
import img2 from "../../assets/Shyam1.png";
import img3 from "../../assets/Shyam2.png";
import img4 from "../../assets/Shyam3.png"
import img5 from "../../assets/alloffer4.png";
import img6 from "../../assets/Shyam4.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";

const offers = [
  { slug: "biryani", banner: img1 }, 
  { slug: "shawarma", banner: img2 },
  { slug: "icecream", banner: img3 },
  { slug: "rolls", banner: img4 },
  { slug: "burger", banner: img5 },
  { slug: "weekend-offer", banner: img6 },
];

const AllOffer = () => {
  const navigate = useNavigate();

  return (
    <section className="offer-section">
      <Swiper
        modules={[Navigation, Autoplay]}
        loop
        speed={700}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation={{ nextEl: ".offer-next", prevEl: ".offer-prev" }}
        breakpoints={{
          300: { slidesPerView: 1, spaceBetween: 20 },
          400: { slidesPerView: 1.3, spaceBetween: 20 },
          500: { slidesPerView: 1.5, spaceBetween: 20 },
          700: { slidesPerView: 2, spaceBetween: 18 },
          800: { slidesPerView: 2.5, spaceBetween: 18 },
          900: { slidesPerView: 2.5, spaceBetween: 23 },
          1000: { slidesPerView: 3, spaceBetween: 18 },
          1224: { slidesPerView: 3.8, spaceBetween: 23 },
          1300: { slidesPerView: 4, spaceBetween: 16 },
          1500: { slidesPerView: 4, spaceBetween: 20 },
          1600: { slidesPerView: 5, spaceBetween: 16 },
        }}
        className="offer-swiper"
      >
        {offers.map((offer) => (
          <SwiperSlide key={offer.slug}>
            <div
              className="offer-card"
              onClick={() => {
                window.scrollTo(0, 0);
                navigate(`/offers/${offer.slug}`);
              }}
            >
              <img src={offer.banner} alt={offer.slug} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="offer-prev">‹</button>
      <button className="offer-next">›</button>
    </section>
  );
};

export default AllOffer;
