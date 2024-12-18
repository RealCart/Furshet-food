import React from 'react'
import {Logo, ion_cart, FSign} from "../../assets/Image/Header.js"
import '../../styles/Header.css'

function Header() {
    return (
        <header className="header">
            <div className="header__content">
                <div className="header__logo">
                    <a href="/">
                        <img
                            src={Logo}
                            alt="Furshet Food"
                            className="header__logo-image"
                        />
                    </a>
                </div>

                <nav className="header__nav">
                    <ul className="header__nav-list">
                        <li className="header__nav-item">
                            <a href="/" className="header__nav-link">Главная</a>
                        </li>
                        <li className="header__nav-item">
                            <a href="/menu" className="header__nav-link">Меню</a>
                        </li>
                        <li className="header__nav-item">
                            <a href="/partnership" className="header__nav-link">Сотрудничество</a>
                        </li>
                    </ul>
                </nav>

                <div className="header__actions">
                    <div className="header__balance">
                        F 1000₸
                    </div>
                    <button className="header__login-button">
                        Войти
                    </button>
                    <button className="header__cart-button">
                        <span className="header__cart-icon">
                            <img src={ion_cart} alt="Cart"/>
                        </span>
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
