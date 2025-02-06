import React from "react";
import "../styles/Categories.css";

const Categories = (props) => {

  return (
    <>
      <div
        className="category-card"
        style={{ backgroundColor: "#C3DDF8" }}
      >
        <div className="category-title">Сеты<br/>на компанию</div>
        <div className="count-container">
          <div className="category-count">
            <span>12</span>
          </div>
        </div>
      </div>
      <div
        className="category-card"
        style={{ backgroundColor: "#F6B9BA" }}
      >
        <div className="category-title">Чайные<br/>сеты</div>
        <div className="count-container">
          <div className="category-count">
            <span>15</span>
          </div>
        </div>
      </div>
      <div
        className="category-card"
        style={{ backgroundColor: "#FEDBA6" }}
      >
        <div className="category-title">Акции</div>
        <div className="count-container">
          <div className="category-count">
            <span>14</span>
          </div>
        </div>
      </div>
      <div
        className="category-card"
        style={{ backgroundColor: "#B8FAC2" }}
      >
        <div className="category-title">Хит продаж</div>
        <div className="count-container">
          <div className="category-count">
            <span>11</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
