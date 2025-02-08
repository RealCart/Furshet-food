import React from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { toggleProfile, setProfileWindow } from '../features/profileSlice';

import FSign from '/Icons/FSign.svg';
import cashbackIcon from '/Icons/cashback_profileModal.svg';
import profileSectionArrow from '/Icons/profile_section_arrow.svg';
import backBtn from '/Icons/banner_btn.svg';

import '../styles/ProfileModal.css';

const ProfileModal = () => {
    const dispatch = useDispatch();

    const {userInfo} = useSelector((state) => state.auth);
    const {currentProfileWindow} = useSelector((state) => state.profile);
    
    return (
        <div className="profile_modal">
            <div className="profile_modal_wrapper">
                {currentProfileWindow === 0 && (
                    <div className="profile_modal_inner">
                        <div className="profile_modal_header">
                            <div className="ttl_profile_modal">{userInfo.userName === null ? "Вы" : userInfo.userName}</div>
                            <div className="close_profile_modal" onClick={() => dispatch(toggleProfile())}>
                                <svg
                                    width="37"
                                    height="36"
                                    viewBox="0 0 37 36"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle cx="18.2002" cy="18" r="18" fill="#FAFAFA" />
                                    <path
                                    d="M12.8003 12.6L23.6003 23.4M12.8003 23.4L23.6003 12.6"
                                    stroke="#272727"
                                    strokeWidth="0.9"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="profile_modal_line"></div>
                        <div className="sections_profile_modal">
                            <span>Кэшбэк</span> 
                            <img src={cashbackIcon} alt="Кэшбэк" />
                        </div>
                        <div className="sections_profile_modal">
                            <span>Баланс</span> 
                            <div className="header__balance">
                                <img src={FSign} alt="" />
                                <div className="balance__count">
                                    {userInfo.userBonus_points} ₸
                                </div>
                            </div>
                        </div>
                        <div className="profile_serction sections_profile_modal" onClick={() => dispatch(setProfileWindow({indexOfPage: 1}))}>
                            <span>Профиль</span> 
                            <img src={profileSectionArrow} alt="стрела" />
                        </div>
                        <div className="profile_serction sections_profile_modal" onClick={() => dispatch(setProfileWindow({indexOfPage: 2}))}>
                            <span>Мои заказы</span> 
                            <img src={profileSectionArrow} alt="стрела" />
                        </div>
                    </div>
                )}
                {currentProfileWindow === 1 && (
                    <div className="profile_modal_userProfile">
                        <div className="profile_modal_userProfile_header">
                            <img src={backBtn} alt="Кнопка назад"  onClick={() => dispatch(setProfileWindow({indexOfPage: 0}))}/>
                            <span>Мой профиль</span>
                            <div className="close_profile_modal" onClick={() => dispatch(toggleProfile())}>
                                <svg
                                    width="37"
                                    height="36"
                                    viewBox="0 0 37 36"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle cx="18.2002" cy="18" r="18" fill="#FAFAFA" />
                                    <path
                                    d="M12.8003 12.6L23.6003 23.4M12.8003 23.4L23.6003 12.6"
                                    stroke="#272727"
                                    strokeWidth="0.9"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="profile_modal_userProfile_body">

                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProfileModal