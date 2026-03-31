import React from "react";
import { useParams } from "react-router-dom";

import Slider from "../Slider/Slider";
import SubCategorySlider from "./SubCategroySlider";
import MaidaItemsAll from "../ViewAll/MaidaItemsAll";

function CategoryPage() {
  const { categoryName } = useParams();

  return (
    <div>
      {/* 🔥 Banner */}
      <Slider />

      {/* 🔥 Subcategory Slider */}
      <SubCategorySlider />

      {/* 🔥 Category Title */}
      {/* <div style={{ padding: "20px" }}>
        <h1>{categoryName}</h1>
      </div> */}

      {/* 🔥 All Products */}
      <MaidaItemsAll />
    </div>
  );
}

export default CategoryPage;