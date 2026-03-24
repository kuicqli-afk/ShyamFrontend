import React from "react";
import { useParams } from "react-router-dom";
// import AllOffersData from "../../data/AllOffersData";
import MaidaItemSlider from "../Slider/MaidaItemSlider";
// import Biryani from "../Food/Biryani";
// import Shawarma from "../Food/Shawarma";

import Pizza from "../Food/Pizza"; // if you have other categories
import Burger from "../Food/Burger";
// import Rolls from "../Food/Rolls";
import Icecream from "../Food/Icecream";
// import CholeBhature from "../Food/CholeBhature"
import BiryaniAll from "../Food/BiryaniAll";
import Footer from "../Footer/Footer";
import ShawarmaAll from "../Food/ShawarmaAll";
import ShawarmaSlider from "../Slider/ShawarmaSlider.jsx";
import IceCreamAll from "../Food/IceCreamAll.jsx";
import IceCreamSlider from "../Slider/IceCreamSlider.jsx";
import RollsAll from "../Food/RollsAll.jsx";
import RollsSlider from "../Slider/RollsSlider.jsx";
import BurgerSlider from "../Slider/BurgerSlider.jsx";
import BurgerAll from "../Food/BurgerAll.jsx";
import Slider from "../Slider/Slider.jsx";
import Button from "../Food/Button.jsx";


const OfferDetails = () => {
  const { slug } = useParams();

  const renderCategoryComponent = () => {


    switch (slug) {

      case "biryani":
        return (
          <>
            <MaidaItemSlider />
            <Button />
            <BiryaniAll />
            <MaidaItemSlider />
            <BiryaniAll />
          </>
        );

      case "shawarma":
        return (
          <>
            <ShawarmaSlider />
            {/* <Button /> */}
            <ShawarmaAll />
            <ShawarmaSlider />
            <ShawarmaAll />
          </>
        );

      case "icecream":
        return (
          <>
            <IceCreamSlider />
            {/* <Button /> */}
            <IceCreamAll />
            <IceCreamSlider />
            <IceCreamAll />
          </>
        )
      case "rolls":
        return (
          <>
            <RollsSlider />
            {/* <Button /> */}
            <RollsAll />
            <RollsSlider />
            <RollsAll />
          </>
        )

      case "burger":
        return (
          <>
            <BurgerSlider />
            {/* <Button /> */}
            <BurgerAll />
            <BurgerSlider />
            <BurgerAll />
          </>
        )

      // case "pizza":
      //   return <Pizza />;

      case "weekend-offer":
        return (
          <>
            <Slider />
            {/* <Button /> */}
            {/* <CholeBhature /> */}
            <Icecream />
            <Pizza />
            <Burger />
          </>
        );

      default:
        return (
          <h2 style={{ textAlign: "center", marginTop: "50px" }}>
            Offer Not Found
          </h2>
        );
    }
  };


  return (
    <div>
      {renderCategoryComponent()}
      <Footer />
    </div>
  );
};

export default OfferDetails;




