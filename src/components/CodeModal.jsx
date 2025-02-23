import React, {useState, useRef, useEffect} from 'react'
import '../styles/CodeModal.css';
import SuccessfullyLoggedIn from '/Icons/successfullyLoggedIn.svg'

import axios from "../axios";
import { verifyOtp, cartMerge } from '../constants/URLs';
import { validateSessionFunc, getUserFunc } from "../features/authSlice";
import { useDispatch, useSelector } from 'react-redux';


const CodeModal = () => {
    const [code, setCode] = useState(['', '', '', '', '', '']); 
    const divRefs = useRef([]);

    const dispatch = useDispatch();
    
    const [success, setSuccess] = useState(false);

    const userPhone = useSelector((state) => state.auth.userInfo.userphone)
    
    const handleKeyDown = (e, index) => {
        const key = e.key;
        
        if (/^\d$/.test(key)) {
            const newCode = [...code];
            newCode[index] = key;
            setCode(newCode);
            divRefs.current[index].classList.remove('code-box-unselected');
            divRefs.current[index].classList.add('code-box-selected');
        
            if (index < code.length - 1) {
                divRefs.current[index + 1]?.focus();
            } else {
                const fullCode = newCode.join('');
                const sendData = {
                    phone: userPhone,
                    otp: fullCode,
                };
                const verifyCode = async () => {
                    try {
                        console.log("SendedCode: ", sendData)
                        const response = await axios.post(verifyOtp, sendData, { withCredentials: true });
                        setSuccess(true)
                        console.log(response)
                    } catch (error) {
                        console.log("Ошибка: ", error);
                    }
                };
                verifyCode();
            }
        } else if (key === 'Backspace') {
            const newCode = [...code];
            newCode[index] = '';
            setCode(newCode);
            divRefs.current[index].classList.remove('code-box-selected');
            divRefs.current[index].classList.add('code-box-unselected');
        
            if (index > 0 && newCode[index] === '') {
                divRefs.current[index - 1]?.focus();
            }
        }
    };

    const mergingCarts = async () => {
        try {
            const response = await axios.post(cartMerge);
            console.log("Successfully merged cart: ", response);
        } catch (error) {
            console.log("Error while merging carts: ", error);
        }
    }
    
    
    const handleClick = () => {
        divRefs.current[code.findIndex((el) => el === '')]?.focus();
    };

    useEffect(() => {
        if (success) {
            dispatch(validateSessionFunc())
            .unwrap().then(() => {
                dispatch(getUserFunc());
                mergingCarts();
            })
        }
      }, [success])

    return (
        <>
            <h2 className="signIn_title">Введите код из смс</h2>
            <p className="signIn_description">{userPhone}</p>
            {!success ? (
                <>
                    <div className="code-container">
                        {code.map((digit, index) => (
                            <div
                                key={index}
                                ref={(el) => (divRefs.current[index] = el)}
                                tabIndex={0}
                                className="code-box-unselected"
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onClick={() => handleClick(index)}
                            >
                                {digit}
                            </div>
                        ))}
                    </div>
                    <h6>Получить новый  код можно через</h6>
                </>
            ) : (
                <>
                    <div className="code-container">
                        <img src={SuccessfullyLoggedIn} alt="" />
                    </div>
                </>
            )}
        </>
    )
}

export default CodeModal;