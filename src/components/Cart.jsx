import React, { useEffect, useState } from "react";
import CartAddedItem from "./CartAddedItem";
import "../styles/Cart.css";

import { useDispatch, useSelector } from "react-redux";
import { closeCart, deviceQuantity, removeAllFromCart, selectTotalAmount } from "../features/cartSlice";

import axios from "../axios";
import { cart, cartGuest } from "../constants/URLs";

import option_arrow from '/Icons/option_arrow.svg'
import FSign from '/Icons/FSign.svg';
import Deivces from '/Icons/devices.svg'
import { ClipLoader } from 'react-spinners';

const Cart = () => {
  const dispatch = useDispatch();
  
  const {isAuthenticated, userInfo} = useSelector((state) => state.auth);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  const deviceCount = useSelector((state) => state.cart.devices);
  const {items} = useSelector((state) => state.cart);
  const totalAmount = useSelector(selectTotalAmount);

  const [cartItems, setCartItems] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCartItems([...items])
  }, [isAuthenticated, items])

  const removeAllItemFromCart = async () => {
    setLoading(true);
    if (isAuthenticated) {
      try {
        const response = await axios.delete(cart);
        dispatch(removeAllFromCart());
        console.log("Sucessuly deleted user cart: ", response);
      } catch (error) {
        console.log("EROR WHILE DELETING USER CART: ", error);
      }
    } else {
      try {
        const response = await axios.delete(cartGuest);
        dispatch(removeAllFromCart());
        console.log("Sucessuly deleted from guest cart: ", response);
      } catch (error) {
        console.log("EROR WHILE DELETING GUEST CART: ", error);
      }
    }
    setLoading(false);
  }

  return (
    <>
      <div className="cart_wrapper" style={{transform: isCartOpen ? "translateX(0)" : "", transition: "transform 0.5s ease"}}>
        <div className="cart_inner">
        <div className="cart_top">
        <div className="cart_title">Корзина</div>
        <div className="cart_top_right">
          <div className="cart_clear_textBtn" onClick={() => removeAllItemFromCart()}>Очистить</div>
          <div className="cart_close" onClick={() => dispatch(closeCart())}>
            <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18.2002" cy="18" r="18" fill="#FAFAFA"/>
              <path d="M12.8003 12.6L23.6003 23.4M12.8003 23.4L23.6003 12.6" stroke="#272727" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
      <div className="cart_main">
        <div className="cart_body">
          <div className="cart_added_list">
            {loading ? <div className="loadingCart"><ClipLoader color="#8B0506" size={25}/></div> : cartItems && cartItems.length ? (
              cartItems.map((item) => <CartAddedItem itmeKey={item.item_id} item={item} />)
            ) : (
              <div className="empty_cart">Тут пока пусто</div>
            )}
          </div>
        </div>
        <div className="cart_more">
          <div className="add_more">
            <h2>Добавить еще</h2>
            <div className="line_list">
              <div className="line_item">
                <div className="item_img">
                  <img src="/images/more_imgae.png" alt="" />
                </div>
                <div className="item_ttl">Манты</div>
                <div className="item_desc">1000 г.</div>
                <div className="item_price">2 990 ₸</div>
              </div>
              <div className="line_item">
                <div className="item_img">
                  <img src="/images/more_imgae.png" alt="" />
                </div>
                <div className="item_ttl">Манты</div>
                <div className="item_desc">1000 г.</div>
                <div className="item_price">2 990 ₸</div>
              </div>
              <div className="line_item">
                <div className="item_img">
                  <img src="/images/more_imgae.png" alt="" />
                </div>
                <div className="item_ttl">Манты</div>
                <div className="item_desc">1000 г.</div>
                <div className="item_price">2 990 ₸</div>
              </div>
            </div>
          </div>
          <div className="count_of_devices">
            <div className="more_devices_desc">
              <div className="more_devices_left">
                <img src={Deivces} alt="Приборы" />
                <div className="more_ttl">Приборы</div>
              </div>
              <div className="devices_count">
                <div className="item_count_minus" onClick={() => dispatch(deviceQuantity({quantity: deviceCount - 1}))}>
                  <svg width="14" height="3" viewBox="0 0 14 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.2005 2.70002H1.40049C1.16179 2.70002 0.932875 2.6052 0.764092 2.43642C0.59531 2.26764 0.500488 2.03872 0.500488 1.80002C0.500488 1.56133 0.59531 1.33241 0.764092 1.16363C0.932875 0.994846 1.16179 0.900024 1.40049 0.900024H12.2005C12.4392 0.900024 12.6681 0.994846 12.8369 1.16363C13.0057 1.33241 13.1005 1.56133 13.1005 1.80002C13.1005 2.03872 13.0057 2.26764 12.8369 2.43642C12.6681 2.6052 12.4392 2.70002 12.2005 2.70002Z" fill="#8B0506"/>
                  </svg>
                </div>
                <span>{deviceCount}</span>
                <div className="item_count_plus" onClick={() => dispatch(deviceQuantity({quantity: deviceCount + 1}))}>
                  <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.71363 11.3369C6.71363 11.5393 6.63324 11.7334 6.49014 11.8765C6.34704 12.0196 6.15296 12.1 5.95059 12.1C5.74821 12.1 5.55413 12.0196 5.41103 11.8765C5.26793 11.7334 5.18754 11.5393 5.18754 11.3369V7.01302H0.863629C0.661258 7.01302 0.467175 6.93263 0.324076 6.78953C0.180978 6.64643 0.100586 6.45235 0.100586 6.24998C0.100586 6.0476 0.180978 5.85352 0.324076 5.71042C0.467175 5.56732 0.661258 5.48693 0.863629 5.48693H5.18754V1.16302C5.18754 0.960648 5.26793 0.766563 5.41103 0.623465C5.55413 0.480367 5.74821 0.399976 5.95059 0.399976C6.15296 0.399976 6.34704 0.480367 6.49014 0.623465C6.63324 0.766563 6.71363 0.960648 6.71363 1.16302V5.48693H11.0375C11.2399 5.48693 11.434 5.56732 11.5771 5.71042C11.7202 5.85352 11.8006 6.0476 11.8006 6.24998C11.8006 6.45235 11.7202 6.64643 11.5771 6.78953C11.434 6.93263 11.2399 7.01302 11.0375 7.01302H6.71363V11.3369Z" fill="#8B0506"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="details_of_order">
            <div className="order_wrapper">
              <div className="order_options">
                <div className="option_left">
                  <div className="option_img">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.2119 9.68127C13.5354 9.68127 10.4619 12.4026 10.4619 15.8688C10.4619 19.3349 13.5354 22.0563 17.2119 22.0563C18.0522 22.0573 18.8865 21.9134 19.6779 21.631L22.6209 22.8573C22.7182 22.8977 22.8248 22.91 22.9287 22.8927C23.0326 22.8755 23.1296 22.8294 23.2086 22.7598C23.2876 22.6902 23.3455 22.5998 23.3757 22.4988C23.4058 22.3979 23.407 22.2906 23.3792 22.189L22.6547 19.5306C23.4968 18.4957 23.9582 17.2031 23.9619 15.8688C23.9619 12.4026 20.8884 9.68127 17.2119 9.68127Z" fill="#8B0506"/>
                      <path d="M5.39941 11.0875C5.39941 12.4218 5.91016 13.648 6.76516 14.6122L6.20379 16.6686C6.12616 16.9533 6.08791 17.0961 6.12504 17.1861C6.15879 17.2649 6.22629 17.3234 6.30841 17.3459C6.40291 17.3729 6.53904 17.3155 6.81129 17.2019L9.11079 16.2445C9.18954 16.276 9.27016 16.306 9.35266 16.3345C9.34205 16.1795 9.3368 16.0242 9.33691 15.8688C9.33691 11.7153 12.9605 8.60465 17.114 8.55627C16.0959 6.72252 14.0034 5.46252 11.5869 5.46252C8.16916 5.46252 5.39941 7.9814 5.39941 11.0875Z" fill="#8B0506"/>
                    </svg>
                  </div>
                  <div className="option_ttl">
                    Комментарий к заказу
                  </div>
                </div>
                <div className="option_arrow">
                  <img src={option_arrow} alt="Стрелочка для опции заказа" />
                </div>
              </div>
            </div>
            <div className="order_wrapper">
              <div className="order_options">
                <div className="option_left">
                  <div className="option_img">
                    <svg width="23" height="17" viewBox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.52737 0.900024H22.2001V12.375H4.52737V0.900024ZM13.3637 3.76877C14.1449 3.76877 14.8941 4.07102 15.4465 4.60901C15.9989 5.14701 16.3092 5.87668 16.3092 6.63752C16.3092 7.39836 15.9989 8.12804 15.4465 8.66604C14.8941 9.20403 14.1449 9.50627 13.3637 9.50627C12.5826 9.50627 11.8334 9.20403 11.281 8.66604C10.7286 8.12804 10.4183 7.39836 10.4183 6.63752C10.4183 5.87668 10.7286 5.14701 11.281 4.60901C11.8334 4.07102 12.5826 3.76877 13.3637 3.76877ZM8.45464 2.81252C8.45464 3.31975 8.24776 3.8062 7.87951 4.16487C7.51125 4.52353 7.0118 4.72502 6.49101 4.72502V8.55002C7.0118 8.55002 7.51125 8.75152 7.87951 9.11018C8.24776 9.46885 8.45464 9.9553 8.45464 10.4625H18.2728C18.2728 9.9553 18.4797 9.46885 18.848 9.11018C19.2162 8.75152 19.7157 8.55002 20.2365 8.55002V4.72502C19.7157 4.72502 19.2162 4.52353 18.848 4.16487C18.4797 3.8062 18.2728 3.31975 18.2728 2.81252H8.45464ZM0.600098 4.72502H2.56373V14.2875H18.2728V16.2H0.600098V4.72502Z" fill="#8B0506"/>
                    </svg>
                  </div>
                  <div className="option_ttl">
                    Наличными при получении
                  </div>
                </div>
                <div className="option_arrow">
                  <img src={option_arrow} alt="Стрелочка для опции заказа" />
                </div>
              </div>
            </div>
          </div>
          <div className="detail_total_amount">
            <div className="order_wrapper">
              <div className="order_options">
                <div className="option_left">
                  <div className="option_img">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.17194 11.0554C7.75053 11.0554 7.39094 10.9055 7.09317 10.6059C6.79541 10.3062 6.64653 9.9457 6.64653 9.52429C6.64653 9.10287 6.79635 8.74329 7.09601 8.44552C7.39567 8.14776 7.75652 7.99887 8.17856 7.99887C8.60061 7.99887 8.9602 8.14902 9.25733 8.44931C9.55446 8.74959 9.70335 9.11013 9.70398 9.53091C9.70461 9.95169 9.55446 10.3113 9.25354 10.6097C8.95263 10.9081 8.59209 11.057 8.17194 11.0563M4.74449 3.74059H11.6051L13.3708 0.192017H2.97967L4.74449 3.74059ZM4.98674 15.3326H11.3628C12.5804 15.3326 13.615 14.9064 14.4666 14.0542C15.3189 13.2019 15.7451 12.1654 15.7451 10.9447C15.7451 10.4349 15.6577 9.93844 15.4829 9.45521C15.3082 8.97197 15.0559 8.53195 14.7259 8.13514L11.8473 4.68687H4.50224L1.62364 8.13514C1.2937 8.53195 1.04136 8.97197 0.866613 9.45521C0.691866 9.93781 0.604492 10.4343 0.604492 10.9447C0.604492 12.1654 1.03064 13.2019 1.88292 14.0542C2.73521 14.9064 3.76982 15.3326 4.98674 15.3326Z" fill="#8B0506"/>
                    </svg>
                  </div>
                  <div className="option_ttl">
                    Сумма
                  </div>
                </div>
                <div className="option_ttl">
                  {totalAmount} ₸
                </div>
              </div>
            </div>
            {isAuthenticated && <div className="order_wrapper">
              <div className="order_options">
                <div className="option_left">
                  <div className="option_img">
                    <img src={FSign} alt="" />
                  </div>
                  <div className="option_ttl">
                    Бонусы
                  </div>
                </div>
                <div className="option_ttl_honus">
                  {userInfo.userBonus_points} ₸
                </div>
              </div>
            </div>}
          </div>
        </div>
      </div>
      <div className="cart_bottom">
        {totalAmount !== 0 && <div className="cart_total_amount">
          <h3>Общая сумма</h3>
          <div className="total_amount"><h2>{isAuthenticated ? totalAmount - userInfo.userBonus_points : totalAmount} тг</h2></div>
        </div>}
        <button className="order_cart_btn">
          Оплатить и заказать
        </button>
      </div>
        </div>
      </div>
      {isCartOpen && <div className="cart_bg_black" onTouchEnd={() => dispatch(closeCart())}></div>}
    </>
  );
};

export default Cart;
