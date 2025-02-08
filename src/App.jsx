import React, { useEffect } from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import About from "./components/About";
import Categories from "./components/Categories";
import SetHeader from "./components/SetHeader";
import CategoryList from "./components/CategoryList";
import Footer from './components/Footer';
import Cart from './components/Cart';
import SignIn from './components/SignInModal';
import { menuItem } from "./constants/URLs";
import "./App.css";

import { useSelector, useDispatch } from "react-redux";
import { validateSessionFunc, getUserFunc } from "./features/authSlice";
import { getUserCart, getGuestCart } from './features/cartSlice';
import FoodInfoModal from "./components/FoodInfoModal";
import CartMobileButton from "./components/CartMobileButton";

function App() {
  const isCartOpen = useSelector((state) => state.cart.isCartOpen)
  const isSingInOpen = useSelector((state) => state.singIn.isSingInOpen)
  const {isFoodInfoOpen} = useSelector((state) => state.foodInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(validateSessionFunc())
      .unwrap().then(() => {
        dispatch(getUserFunc());
        dispatch(getUserCart());
      }).catch(() => dispatch(getGuestCart()))
  }, [dispatch])

  return (
    <div className="wrapper">
      <Cart/>
      <div className="common_wrapper" style={{maxWidth: isCartOpen ? "1228px" : ""}}>
        <Header/>
        <div className="common">
          <Banner />
          <About />
          <div className="category_wrapper">
            <h2>Категории</h2>
            <div className="category_line_wrapper">
              <div className="category_line">
                <Categories/>
              </div>
            </div>
            <div className="catalog">
              <div className="set_header_line">
                <SetHeader 
                  url={menuItem} 
                />
              </div>
              <div className="category_list">
                  <CategoryList
                    url={menuItem}
                  />
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
      <CartMobileButton/>
      {isSingInOpen && <SignIn/>}
      {isFoodInfoOpen && <FoodInfoModal/>}
    </div>
  );
}

export default App;
