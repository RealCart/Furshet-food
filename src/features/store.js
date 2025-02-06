import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import singInReducer from './singInSlice';
import authSliceReducer from './authSlice';
import profileSliceReducer from  './profileSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    profile: profileSliceReducer,
    singIn: singInReducer,
    auth: authSliceReducer, 
  },
});
