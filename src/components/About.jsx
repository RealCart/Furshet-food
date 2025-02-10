import React, { useState } from "react";

import { useSelector } from "react-redux";

import "../styles/About.css";
import Skeleton from "react-loading-skeleton";

const About = () => {
  const [method, setMethod] = useState("delivery");
  const { isLoading } = useSelector((state) => state.auth);

  const getButtonClass = (currentMethod) =>
    `button ${method === currentMethod ? "active" : ""}`;

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
                onClick={() => setMethod("delivery")}
              >
                Доставка
              </button>
              <button
                className={getButtonClass("selfPickUp")}
                onClick={() => setMethod("selfPickUp")}
              >
                Самовывоз
              </button>
              <div className="switch_marker" style={{left: method === "selfPickUp" ? "50%" : "0"}}></div>
            </div>
          </div>
          <div className="corporate_order">
            <h2 className="order_title">Корпоративный заказ</h2>
            <button className="button contact_button">Связаться</button>
          </div>
        </div>
      )}
    </>
  );
};

export default About;
