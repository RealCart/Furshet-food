import React, { useState } from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import About from "./components/About";
import Categories from "./components/Categories";
import SetHeader from "./components/SetHeader";
import CategoryList from "./components/CategoryList";
import Footer from './components/Footer';
import Cart from './components/Cart';
import { menuItem, setHeaderData } from "./Constants/URLS";
import "./App.css";

const categoryCardData = [
  {
    label: "Сеты на компанию",
    count: 12,
    bgColor: "#C3DDF8",
  },
  {
    label: "Чайные сеты",
    count: 15,
    bgColor: "#F6B9BA",
  },
  {
    label: "Акции",
    count: 14,
    bgColor: "#FEDBA6",
  },
  {
    label: "Хит продаж",
    count: 11,
    bgColor: "#B8FAC2",
  },
];



function App() {
  const [CartState, setCartState] = useState(false);

  return (
    <div className="wrapper">
      <Cart stateOpenCart={CartState} setOpenCart={() => setCartState(false)}/>
      <div className="common_wrapper">
        <Header openCart={() => {setCartState(true)}}/>
        <div className="common">
          <Banner />
          <About />
          <div className="category_wrapper">
            <h2>Категории</h2>
            <div className="category_line_wrapper">
              <div className="category_line">
                  {categoryCardData.map(({label, count, bgColor }, index) => (
                      <Categories
                        key={index}
                        title={label}
                        count={count}
                        color={bgColor}
                      />
                  ))}
              </div>
            </div>
            <div className="catalog">
              <div className="set_header_line">
                <SetHeader 
                  url={setHeaderData} 
                />
              </div>
              <div className="category_list">
                  <CategoryList
                    url={menuItem}
                    addToCart={() => console.log('Добавили в корзину')}
                  />
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
