import React from 'react'
import User from '/Icons/userAuthorized.svg';

import { useDispatch, useSelector } from 'react-redux';
import { openSingInModal } from '../features/singInSlice';


const UserProfile = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    if (!isAuthenticated) {
        return <button className="header__login-button" onClick={() => dispatch(openSingInModal())}>Войти</button>
    }

    return (
        <button onClick={() => {}} className='header__login-button'>
            <img src={User} alt="" />
        </button>
    )
}

export default UserProfile;