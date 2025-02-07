import axios from '../axios';
import React, { useEffect, useState } from 'react'
import '../styles/FoodInfoModal.css'

import { foodItems } from '../constants/URLs';
import { useDispatch, useSelector } from 'react-redux';
import { closeFood } from '../features/foodInfo';
import LoadingModal from './LoadingModal';

function FoodInfoModal() {
    const [dataInfo, setDataInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const item_id = useSelector((state) => state.foodInfo.itemId)

    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(foodItems).then((response) => {
            const findDetail = response.data.find((item) => item.id === item_id);
            setDataInfo(findDetail);
        }).catch((error) => {
            setError(error);
            console.error("Ошибка при получении данных о товаре:", error);
        }).finally(() => setLoading(false));
    }, [item_id])

    
    if (loading) return <LoadingModal/>;
    if (error) return <div>Ошибка загрузки товара</div>;
    

    return (
        <div className="food_info">
            <div className="food_info_wrapper">
                <div className="btn_close" onClick={() => dispatch(closeFood())}>
                    <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="18.2002" cy="18" r="18" fill="#FAFAFA"/>
                        <path d="M12.8003 12.6L23.6003 23.4M12.8003 23.4L23.6003 12.6" stroke="#272727" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <section className="food_info_top">
                    <div className="food_info_img"><img src={dataInfo.image_path} alt={dataInfo.name}/></div>
                    <div className="food_info__info">
                        <div className="food_info_ttl">{dataInfo.name}</div>
                        <div className="food_info_desc">{dataInfo.description}</div>
                        <div className="food_info_price">{dataInfo.price} тг</div>
                        <div className="button_add_to_basket">Добавить в корзину </div>
                    </div>
                </section>
                <section className="food_info_botttom">
                    <h2>Что-то ещё?</h2>
                    <div className="food_info_list"></div>
                </section>
            </div>
        </div>
    )
}

export default FoodInfoModal