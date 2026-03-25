import axios from "axios";
import { useState, useEffect, useRef } from "react";
import "./Category.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import { FaOptinMonster } from "react-icons/fa";
// import Icecream from "../../assets/icecream.png";
// import Namkeen from "../../assets/namkeen.png";
const categories = [
  { name: "Sev", id: "sev" },
  { name: "Kaju Namkeen", id: "kajunamkeen" },
  { name: "Bhujiya", id: "bhujiya" },
  { name: "Mix Namkeen", id: "mixnamkeen" },
  { name: "Single Items", id: "singleitem" },
  { name: "Chura", id: "chura" },
  { name: "Chips", id: "chips" },
  { name: "Maida Items", id: "maidaitems" },
  { name: "Cake", id: "cake" },
  { name: "Cookies", id: "cookies" },
];

const Category = ({ onSelectCategory }) => {
  // const prevRef = useRef(null);
  // const nextRef = useRef(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/categories/category-list")
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCategoryClick = (id) => {
    console.log("Clicked Category:", id); // ✅ DEBUG

    onSelectCategory(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };



  return (
    <div className="explore-menu">
      <div className="explore-menu-wrapper">
        <Swiper
          modules={[FreeMode, Autoplay, Pagination]}
          loop
          speed={1000}
          freeMode={{ enabled: true }}
          autoplay={{ delay: 1500, disableOnInteraction: false }}

          pagination={{
            el: ".category-dots",
            clickable: true,
            bulletClass: "dot",
            bulletActiveClass: "active",
          }}

          breakpoints={{
            0: {
              slidesPerView: 2.2,
              navigation: false,
              pagination: false,
            },
            480: {
              slidesPerView: 3.2,
              navigation: false,
              pagination: false,
            },
            768: {
              slidesPerView: 4.2,
              navigation: false,
              pagination: false,
            },
            912: {
              slidesPerView: 5,
              spaceBetween: 15,
              navigation: false,
              pagination: false,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 18,
              navigation: false,
              pagination: false,
            },
            1100: {
              slidesPerView: 7,
              spaceBetween: 18,
              navigation: false,
              pagination: false,
            },
            1300: {
              slidesPerView: 7,
              spaceBetween: 18,
              navigation: false,
              pagination: false,
            },
            1800: {
              slidesPerView: 9,
              spaceBetween: 18,
              navigation: false,
              pagination: false,
            },
            1280: {
              slidesPerView: 9,
              spaceBetween: 0,
              pagination: {
                el: ".category-dots",
                clickable: true,
              },
            },
          }}
        >
          {categories.map((item) => (
            <SwiperSlide key={item._id}>
              <div
                className="explore-menu-list-item"
                onClick={() => handleCategoryClick(item._id)}
              >
                <img
                  src={`http://localhost:5000/uploads/${item.image}`}
                  alt={item.name}
                />
                <p>{item.name}</p>
              </div>
            </SwiperSlide>
          ))}

        </Swiper>
        <div className="category-dots"></div>
      </div>
    </div>
  );
};

export default Category;
