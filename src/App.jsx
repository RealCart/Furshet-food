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
import ContctToUs from "./components/ContctToUs";
import Adverts from "./components/Adverts";
import { menuItem } from "./constants/URLs";
import "./App.css";

import { ToastContainer } from "react-toastify";
import 'react-loading-skeleton/dist/skeleton.css'

import { useSelector, useDispatch } from "react-redux";
import { validateSessionFunc, getUserFunc } from "./features/authSlice";
import { getUserCart, getGuestCart } from './features/cartSlice';
import FoodInfoModal from "./components/FoodInfoModal";
import CartMobileButton from "./components/CartMobileButton";
import Skeleton from "react-loading-skeleton";
import CategoriesSkeleton from "./components/CategoriesSkeleton";

function App() {
  const isCartOpen = useSelector((state) => state.cart.isCartOpen)
  const isSingInOpen = useSelector((state) => state.singIn.isSingInOpen)
  const {isFoodInfoOpen} = useSelector((state) => state.foodInfo);
  const { isLoading } = useSelector((state) => state.auth); 
  const { isOpen } = useSelector((state) => state.profile);
  
  isSingInOpen || isOpen ? document.body.style.overflowY = 'hidden' : document.body.style.overflowY = 'auto';

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
            {isLoading ? <h2><Skeleton width={250}/></h2> : <h2>Категории</h2>}
            <div className="category_line_wrapper">
              <div className="category_line">
                {isLoading ? <CategoriesSkeleton/> : <Categories/>}
              </div>
            </div>
            <div className="catalog">
              <div className="set_header_line">
                <SetHeader 
                  url={menuItem} 
                />
              </div>
              <div className="category_list" id="category_list">
                  <CategoryList
                    url={menuItem}
                  />
              </div>
            </div>
          </div>
        </div>
        <Adverts/>
        <ContctToUs/>
        <Footer/>
      </div>
      <CartMobileButton/>
      {isSingInOpen && <SignIn/>}
      {isFoodInfoOpen && <FoodInfoModal/>}
      <ToastContainer />
    </div>
  );
}

export default App;
