import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import '../styles/MenuMobile.css'
import { toggleCart } from '../features/cartSlice';

import homeIcon from '/Icons/home.svg';
import profileIcon from '/Icons/profile.svg';
import orderIcon from '/Icons/orders.svg'
import phoneIcon from '/Icons/phone.svg';
import instagramIcon from '/Icons/instagram.svg';
import whatsappIcon from '/Icons/whatsapp.svg';
import telephoneIcon from '/Icons/telephone.svg';

function MenuMobile() {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu((curr) => !curr);
    }

    const openCart = () => {
        setShowMenu((curr) => !curr);
        dispatch(toggleCart());
    }

    return (
        <>
            <div className="burger_menu" onClick={() => toggleMenu()}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            {showMenu && <div className="menu-class-background" onTouchStart={() => toggleMenu()}></div>}
            <div className="menu_class" style={{transform: showMenu ? "translateX(0)" : "translateX(-100%)"}}>
                <div className="menu_class_wrapper">
                    <div className="menu_top">
                        <div className="menu_close" onClick={() => toggleMenu()}>
                            <span></span>
                            <span></span>
                        </div>
                        <div className="menu_details">
                            <div className="menu_user_name">Вы</div>
                                <div className="menu_nav">
                                    <div className='menu_nav_item'><img src={homeIcon} alt="Главная" /><span>Главная</span></div>
                                    <div className='menu_nav_item'><img src={profileIcon} alt="Мой профиль" /><span>Мой профиль</span></div>
                                    <div className='menu_nav_item' onTouchStart={() => openCart()}><img src={orderIcon} alt="Мои заказы" /><span>Мои заказы</span></div>
                                    <div className='menu_nav_item'><img src={phoneIcon} alt="Сотрудничество" /><span>Сотрудничество</span></div>
                                </div>
                            <div className="menu_cashback">
                            
                            </div>
                        </div>
                    </div>
                    <div className="menu_bottom">
                        <div className="adress">ПР. Рақымжан Қошқарбаев, 54А</div>
                        <div className="schedule">Ежедневно: 08:00 - 21:00</div>
                        <div className="phone">+7 (778) 649 66 22</div>
                        <div className="contact_us">
                            <a href=""><img src={instagramIcon} alt="Иконка инстаграмма" /></a>
                            <a href=""><img src={whatsappIcon} alt="Иконка ватсаппа" /></a>
                            <a href=""><img src={telephoneIcon} alt="Иконка телефона" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MenuMobile