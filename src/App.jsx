import React, { useState, } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Slider from './Components/Slider/Slider'
import Category from './Components/Category/Category'
import OrderPage from './Components/OrderPage/OrderPage.jsx'
import Cake from './Components/Food/Cake';
import Footer from './Components/Footer/Footer';
import Cookies from './Components/Food/Cookies';
import RestaurantPage from './Components/ShopsDetailPage/RestaurantPage.jsx';
import Items from "./Components/Food/Items.jsx";
import AppBanner from './Components/Food/AppBanner.jsx';
import Khuramnagar from "./Components/Pages/Khuramnagar.jsx";
import Indiranagar from "./Components/Pages/Indiranagar.jsx";
import Nishatganj from "./Components/Pages/Nishatganj.jsx";
import Aliganj from "./Components/Pages/Aliganj.jsx";
import Kapoorthala from "./Components/Pages/Kapoorthala.jsx";
import Aminabad from "./Components/Pages/Aminabad.jsx";
import Gomtinagar from "./Components/Pages/Gomtinagar.jsx";
import Alambagh from "../src/Components/Pages/Alambagh.jsx";
import Daliganj from "./Components/Pages/Daliganj.jsx";
import Kalyanpur from "./Components/Pages/Kalyanpur.jsx";
import CartPage from "./Components/Cart/Cart.jsx";
import CheckoutPage from './Components/CheckoutPage/CheckoutPage.jsx';
import FeaturedListings from "./Components/FeaturedListings/FeaturedListings.jsx";
import Button from './Components/Food/Button.jsx';
import Offers from './Components/Food/Offers.jsx';
import Combo from './Components/Food/Combo.jsx';
import Weekend from './Components/Food/Weekend.jsx';
import { ScrollToTopButton } from './Components/ScrollToTopButton/ScrollToTopButton.jsx';
import ScrollToTop from "./Components/ScrollToTopButton/ScrollToTop";
import Pastry from './Components/Food/Pastry.jsx';
import Sev from './Components/Food/ShyamSev.jsx';
import AllOffer from './Components/Food/AllOffer.jsx'
import Special from './Components/Food/Special.jsx';
import AdsSlider from './Components/Slider/AdsSlider.jsx';
import OfferDetails from './Components/Pages/OfferDetails.jsx';
import Namkeen from './Components/Food/Namkeen.jsx';
import ShyamBakery from './Components/ShopsDetailPage/ShyamBakery.jsx';
import ShaymChips from './Components/ShopsDetailPage/ShaymChips.jsx';
import AllShopsSlider from './Components/ShopAllSlider/AllShopsSlider.jsx';
import ShyamSev from './Components/ShopsDetailPage/ShyamSev.jsx';
import ShaymBhujiya from './Components/ShopsDetailPage/ShaymBhujiya.jsx';
import KajuNamkeens from "./Components/Food/KajuNamkeens.jsx";
import KajuNamkeen from "./Components/ViewAll/KajuNamkeen.jsx";
import SingleItemAll from './Components/ViewAll/SingleItems.jsx';
import SingleItems from './Components/ShopsDetailPage/SingleItems.jsx';
import MixNakmeen from './Components/Food/MixNakmeen.jsx';
import SingleItem from './Components/Food/SingleItem.jsx';
import Chura from './Components/Food/Chura.jsx';
import Chips from './Components/Food/Chips.jsx';
import MaidaItems from './Components/Food/MaidaItems.jsx';
import MixAll from './Components/ViewAll/MixAll.jsx';
import ChuraAll from "./Components/ViewAll/Chura.jsx"
import ChipsAll from './Components/ViewAll/ChipsAll.jsx';
import MaidaItemsAll from './Components/ViewAll/MaidaItemsAll.jsx';
import BhujiyaAll from "./Components/ViewAll/BhujiyaAll.jsx"
import SevAll from "./Components/ViewAll/SevAll.jsx"
import PastryAll from './Components/ViewAll/PastryAll.jsx';
import CakeAll from './Components/ViewAll/CakeAll.jsx';
import CookiesAll from './Components/ViewAll/CookiesAll.jsx';
import ItemsAll from './Components/ViewAll/Items.jsx';
import OffersAll from './Components/ViewAll/OffersAll.jsx';
import CombosAll from './Components/ViewAll/CombosAll.jsx';
import WeekendSpecial from './Components/ViewAll/WeekendSpecial.jsx';
import DiscountOffer from './Components/DiscountOffer/DiscountOffer.jsx';
import DynamicSlider from './Components/Slider/DynamicSlider.jsx';
import ComboOffers from './Components/ComboOffers/ComboOffers.jsx';

function App() {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("");
  const [price, setPrice] = useState("");
  const [cuisine, setCuisine] = useState("");

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <ScrollToTopButton />
      <Navbar />
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <DynamicSlider />
              <Category onSelectCategory={setSelectedCategory} />
              <Button
                filter={filter}
                setFilter={setFilter}
                sortBy={sortBy}
                setSortBy={setSortBy}
                price={price}
                setPrice={setPrice}
                cuisine={cuisine}
                setCuisine={setCuisine}
              />
              <AllOffer />
              <KajuNamkeens
                categoryId={selectedCategory}
                filter={filter}
                sortBy={sortBy}
                price={price}
                cuisine={cuisine}
              />
              <MixNakmeen
                categoryId={selectedCategory}
                filter={filter}
                sortBy={sortBy}
                price={price}
                cuisine={cuisine}
              />
              <SingleItem filter={filter}
                sortBy={sortBy}
                price={price}
                cuisine={cuisine}
              />
              <Chura filter={filter}
                sortBy={sortBy}
                price={price}
                cuisine={cuisine}
              />
              <Chips filter={filter}
                sortBy={sortBy}
                price={price}
                cuisine={cuisine}
              />
              <MaidaItems
                categoryId={selectedCategory}
                filter={filter}
                sortBy={sortBy}
                price={price}
                cuisine={cuisine}
              />
              <Special filter={filter}
                sortBy={sortBy}
                price={price}
                cuisine={cuisine}
              />
              <Namkeen
                categoryId={selectedCategory}
                filter={filter}
                sortBy={sortBy}
                price={price}
                cuisine={cuisine}
              />
              <Pastry filter={filter}
                sortBy={sortBy}
                price={price}
                cuisine={cuisine}
              />
              {/* <Special/> */}
              <Cake filter={filter}
                sortBy={sortBy}
                price={price}
                cuisine={cuisine}
              />
              <Sev filter={filter}
                sortBy={sortBy}
                price={price}
                cuisine={cuisine}
              />
              <AdsSlider />

              <Cookies filter={filter}
                sortBy={sortBy}
                price={price}
                cuisine={cuisine}
              />

              <Items filter={filter}
                sortBy={sortBy}
                price={price}
                cuisine={cuisine}
              />
              <Offers filter={filter}
                sortBy={sortBy}
                price={price}
                cuisine={cuisine}
              />
              <Combo
                categoryId={selectedCategory}
                filter={filter}
                sortBy={sortBy}
                price={price}
                cuisine={cuisine}
              />
              <AdsSlider />
              <Weekend filter={filter}
                sortBy={sortBy}
                price={price}
                cuisine={cuisine}
              />
              <Items filter={filter}
                sortBy={sortBy}
                price={price}
                cuisine={cuisine}
              />
              <AppBanner />
              {/* <ScrollToTopButton /> */}
              <Footer />
            </>
          }
        />

        <Route path="/order" element={<OrderPage />} />
        <Route path="/restaurant" element={<RestaurantPage />} />
        <Route path="/restaurant/khuramnagar" element={<Khuramnagar />} />
        <Route path="/restaurant/indiranagar" element={<Indiranagar />} />
        <Route path="/restaurant/nishatganj" element={<Nishatganj />} />
        <Route path="/restaurant/aliganj" element={<Aliganj />} />
        <Route path="/restaurant/kapoorthala" element={<Kapoorthala />} />
        <Route path="/restaurant/aminabad" element={<Aminabad />} />
        <Route path="/restaurant/gomtinagar" element={<Gomtinagar />} />
        <Route path="/restaurant/alambagh" element={<Alambagh />} />
        <Route path="/restaurant/daliganj" element={<Daliganj />} />
        <Route path="/restaurant/kalyanpur" element={<Kalyanpur />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/" element={<FeaturedListings />} />
        {/* <Route path="/discount" element={
          <>
            <Slider />
            <DiscountOffer />
            <Footer/>
          </>
        } />
        <Route path="/combo" element={
          <>
            <Slider />
            <ComboOffers />
            <Footer/>
          </>
        } /> */}
        <Route path="/discount" element={
          <>
            <Slider />
            <DiscountOffer />
            <Footer />
          </>
        } />
        <Route
          path="/restaurant-detail/:id"
          element={
            <>
              <AllShopsSlider />
              <ShyamBakery />
              <ShaymChips />,
              <ShyamSev />
              <ShaymBhujiya />
              <SingleItems />
              <Footer />
            </>
          } />
        <Route path="/offers/:slug" element={<OfferDetails />} />
        <Route path="/all-knamkeenaju-" element={
          <>
            <Slider />
            <KajuNamkeen />
            <Footer />
          </>
        } />
        <Route
          path="/all-mix-namkeen"
          element={
            <>
              <Slider />
              <MixAll />
              <Footer />
            </>
          }
        />
        <Route
          path="/all-single-items"
          element={
            <>
              <Slider />
              <SingleItemAll />
              <Footer />
            </>
          }
        />
        <Route
          path="/all-chura"
          element={
            <>
              <Slider />
              <ChuraAll />
              <Footer />
            </>
          }
        />
        <Route
          path="/all-chips"
          element={
            <>
              <Slider />
              <ChipsAll />
              <Footer />
            </>
          }
        />
        <Route
          path="/all-maida-items"
          element={
            <>
              <Slider />
              <MaidaItemsAll />
              <Footer />
            </>
          }
        />
        <Route
          path="/all-bhujiya"
          element={
            <>
              <Slider />
              <BhujiyaAll />
              <Footer />
            </>
          }
        />
        <Route
          path="/all-sev"
          element={
            <>
              <Slider />
              <SevAll />
              <Footer />
            </>
          }
        />
        <Route
          path="/all-pastry"
          element={
            <>
              <Slider />
              <PastryAll />
              <Footer />
            </>
          }
        />
        <Route
          path="/all-cake"
          element={
            <>
              <Slider />
              <CakeAll />
              <Footer />
            </>
          }
        />
        <Route
          path="/all-cookies"
          element={
            <>
              <Slider />
              <CookiesAll />
              <Footer />
            </>
          }
        />
        <Route
          path="/all-items"
          element={
            <>
              <Slider />
              <ItemsAll />
              <Footer />
            </>
          }
        />
        <Route
          path="/all-offers"
          element={
            <>
              <Slider />
              <OffersAll />
              <Footer />
            </>
          }
        />
        <Route
          path="/all-combos"
          element={
            <>
              <Slider />
              <CombosAll />
              <Footer />
            </>
          }
        />
        <Route
          path="/weekend-specials"
          element={
            <>
              <Slider />
              <WeekendSpecial />
              <Footer />
            </>
          }
        />
      </Routes>

    </BrowserRouter>
  )
}

export default App

