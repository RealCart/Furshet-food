import React, { useState } from "react";
import "../styles/About.css";

const About = () => {
  const [method, setMethod] = useState("delivery");

  return (
    <div className="buttons_container">
      <div className="delivery_method">
        <div className="order_title">
            Способ доставки
        </div>
        <div className="buttons_group">
          <button
            className={`button ${method === "delivery" ? "active" : ""}`}
            onClick={() => setMethod("delivery")}
            style={{borderRadius:'10px 0px 0px 10px'}}
          >
            Доставка
          </button>
          <button
            className={`button ${method === "selfPickUp" ? "active" : ""}`}
            onClick={() => setMethod("selfPickUp")}
            style={{borderRadius:'0px 10px 10px 0px'}}
          >
            Самовывоз
          </button>
        </div>
      </div>

      <div className="corporate_order">
        <div className="order_title">Корпоративный заказ</div>
        <button className="button contact_button">Связаться</button>
      </div>
    </div>
  );
};

export default About;
