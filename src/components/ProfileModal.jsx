import React from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { toggleProfile } from '../features/profileSlice';

import '../styles/ProfileModal.css';

const ProfileModal = () => {
    const dispatch = useDispatch();

    const {userInfo} = useSelector((state) => state.auth);
    
    return (
        <div className="profile_modal">
            <div className="profile_modal_wrapper">
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
                <span></span>
                <div className="profile_modal_body">

                </div>
                <div className="profile_modal_bottom">

                </div>
            </div>
        </div>
    )
}

export default ProfileModal