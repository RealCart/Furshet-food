import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import singInReducer from './singInSlice';
import authSliceReducer from './authSlice';
import profileSliceReducer from  './profileSlice';
import foodInfoReducer from './foodInfo';
import orderSliceReducer from './orderHistory';
import randomExtraItems from './randomExtraItems';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    foodInfo: foodInfoReducer,
    orderHistory: orderSliceReducer,
    profile: profileSliceReducer,
    singIn: singInReducer,
    auth: authSliceReducer, 
    randomItems: randomExtraItems,
  },
});
