import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import singInReducer from './singInSlice';
import authSliceReducer from './authSlice';
import profileSliceReducer from  './profileSlice';
import foodInfoReducer from './foodInfo';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    foodInfo: foodInfoReducer,
    profile: profileSliceReducer,
    singIn: singInReducer,
    auth: authSliceReducer, 
  },
});
