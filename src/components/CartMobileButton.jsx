import React from 'react'
import '../styles/CartMobile.css';

import { useDispatch, useSelector } from 'react-redux';
import { toggleCart, selectTotalQuantity, selectTotalAmount } from '../features/cartSlice';

import cartMobileIcon from '/Icons/cartMobileIcon.svg'

function CartMobile() {
    const dispatch = useDispatch();

    const totalQuantity = useSelector(selectTotalQuantity);
    const totlaAmount = useSelector(selectTotalAmount);

  return (
    <div className="cart_mobile" onTouchEnd={() => dispatch(toggleCart())}>
        <div className="left_side_cart_mobile">
          <img src={cartMobileIcon} alt="Иконка корзины" />
          <div className="totla_item">{totalQuantity}</div>
        </div>
        <span>Корзина</span>
        <span>{totlaAmount ? `${totlaAmount} ₸` : ''}</span>
    </div>
  )
}

export default CartMobile