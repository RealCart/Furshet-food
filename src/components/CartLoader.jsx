import React from 'react';
import ReactDOM from 'react-dom';
import { ClipLoader } from 'react-spinners';
import '../styles/Cart.css';

const CartLoader = () => {
  return ReactDOM.createPortal(
    <div className="cart_loading">
      <ClipLoader color="#8B0506" size={160} />
    </div>,
    document.body
  );
};

export default CartLoader;
