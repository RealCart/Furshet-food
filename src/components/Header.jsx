import React from 'react';
import '../styles/Header.css'
import Logo from '/image/Logo.svg';
import FSign from '/Icons/FSign.svg';
import Cart from '/Icons/Cart.svg';

function Header(props) {
  return (
    <header className="header">
      <div className="header__content">
        <div className="header__logo">
          <a href='/'>
            <img src={Logo} alt="Furshet Food" className="header__logo-image" />
          </a>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item"><a href="/" className="header__nav-link">Главная</a></li>
            <li className="header__nav-item"><a href="/menu" className="header__nav-link">Меню</a></li>
            <li className="header__nav-item"><a href="/partnership" className="header__nav-link">Сотрудничество</a></li>
          </ul>
        </nav>
        <div className="header__actions">
          <div className="header__balance">
            <img src={FSign} alt="" />
            <div className="balance__count">
                1000 ₸
            </div>
          </div>
          <button className="header__login-button">Войти</button>
          <button className="header__cart-button" onClick={props.openCart}>
            <span className="header__cart-icon">
                <img src={Cart} alt="" />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
