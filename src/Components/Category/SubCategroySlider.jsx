import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import "./Category.css";

const SubCategorySlider = () => {
  const { categoryName } = useParams();
  const [subs, setSubs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://shyambackend.onrender.com/api/categories/subcategories/${categoryName}`)
      .then((res) => setSubs(res.data.subcategories))
      .catch((err) => console.log(err));
  }, [categoryName]);

  return (
    <div className="explore-menu">
      <div className="explore-menu-wrapper">
        <Swiper
          modules={[FreeMode, Autoplay, Pagination]}
          loop
          speed={1000}
          freeMode={{ enabled: true }}
          autoplay={{ delay: 1500, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 2.2 },
            480: { slidesPerView: 3.2 },
            768: { slidesPerView: 4.2 },
            1024: { slidesPerView: 6 },
            1300: { slidesPerView: 7 },
            1800: { slidesPerView: 9 },
          }}
        >
          {subs.map((item) => (
            <SwiperSlide key={item._id}>
              <div
                className="explore-menu-list-item"
                onClick={() =>
                  navigate(
                    `/category/${encodeURIComponent(categoryName)}/${encodeURIComponent(item.name)}`
                  )
                }
              >
                <img
                  src={item.image}
                  alt={item.name}
                />
                <p>{item.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SubCategorySlider;