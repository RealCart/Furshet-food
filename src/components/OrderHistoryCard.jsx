import React from 'react';
import '../styles/CardHistory.css';

function OrderHistoryCard({ userHistory }) {
  if (!userHistory || userHistory.length === 0) {
    return <div className="empty_cardHistory">Корзина пуста!</div>;
  }

  return (
    <>
      {userHistory.map((item) => {
        const dateObj = new Date(item.created_at);
        const dateString = dateObj.toLocaleDateString('ru-RU'); 
        const timeString = dateObj.toLocaleTimeString('ru-RU', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        return (
          <div className="card_history_wrapper" key={item.id}>
            <div className="card_history_inner">
              <div className="card_history_top">
                <div className="card_history_day">{dateString}</div>
                <div className="card_history_time">{timeString}</div>
              </div>
              <div className="card_history_bottom">
                {item.items.map((item) => {
                  return (
                    <div className="food_item">
                      <div className="food-left">
                        <div className="food_img">
                          <img src={item.food_item.image_path} alt={item.food_item.name_ru} />
                        </div>
                        <div className="food_mddl">
                          <div className="food_ttl">{item.food_item.name_ru}</div>
                          <div className="food_desc">{item.food_item.description_ru}</div>
                        </div>
                      </div>
                      <div className="food_price">{Math.round(item.price)} ₸</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default OrderHistoryCard;
