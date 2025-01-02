import React from "react";
import "../styles/Categories.css";

const Categories = ({ title, count, color }) => {
  return (
    <div
      className="category-card"
      style={{ backgroundColor: color }}
    >
      <div className="category-title">{title}</div>
      <div className="count-container">
        <div className="category-count">
          <span>{count}</span>
        </div>
      </div>
    </div>
  );
};

export default Categories;

