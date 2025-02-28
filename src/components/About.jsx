import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { setMethod } from "../features/cartSlice";

import "../styles/About.css";
import Skeleton from "react-loading-skeleton";

const About = () => {
  const dispatch = useDispatch();

  const { deliveryMethod } = useSelector((state) => state.cart);
  const { isLoading } = useSelector((state) => state.auth);

  const getButtonClass = (currentMethod) =>
    `button ${deliveryMethod === currentMethod ? "active" : ""}`;

  return (
    <>
      {isLoading ? (
        <div className="skeleton_wrapper">
          <Skeleton height={91}/>
          <Skeleton height={91}/>
        </div>
      ) : (
        <div className="buttons_container">
          <div className="delivery_method">
            <h2 className="order_title">Способ доставки</h2>
            <div className="buttons_group">
              <button
                className={getButtonClass("delivery")}
                onClick={() => dispatch(setMethod("delivery"))}
              >
                Доставка
              </button>
              <button
                className={getButtonClass("selfPickUp")}
                onClick={() => dispatch(setMethod("selfPickUp"))}
              >
                Самовывоз
              </button>
              <div className="switch_marker" style={{left: deliveryMethod === "selfPickUp" ? "50%" : "0"}}></div>
            </div>
          </div>
          <div className="corporate_order">
            <h2 className="order_title">Корпоративный заказ</h2>
            <a href="tel:+77752456644"><button className="button contact_button">Связаться</button></a>
          </div>
        </div>
      )}
    </>
  );
};

export default About;
