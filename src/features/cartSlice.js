import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { cart } from '../constants/URLs';

import axios from '../axios';

export const getUserCart = createAsyncThunk(
  'getUserCart',
  async(_, {rejectWithValue}) => {
    try {
      const response = await axios.get(cart);
      console.log("User cart: ", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');

const initialState = {
  items: cartItems,
  devices: 1,
  isCartOpen: false, 
  isCartLoading: false,
  error: null,
};

const selectCartItems = (state) => state.cart.items;

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    closeCart: (state) => {
      state.isCartOpen = false;
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    addToCart: (state, action) => {
      const {item_id, quantity, price} = action.payload;
      const indexProductId = state.items.findIndex(item => item.item_id === item_id);
      if (indexProductId >= 0) {
        state.items[indexProductId].quantity += quantity;
      } else {
        state.items.push({item_id, quantity, price});
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeAllFromCart: (state) => {
      state.items = [];
    },
    cartItemQuantity: (state, action) => {
      const {item_id, quantity} = action.payload;
      const indexProductId = state.items.findIndex(item => item.item_id === item_id);
      if (indexProductId >= 0) {
        if (quantity > 0) {
          state.items[indexProductId].quantity = quantity;
        } else {
          state.items = state.items.filter(item => item.item_id !== item_id);
        }
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    deviceQuantity: (state, action) => {
      const {quantity} = action.payload;
      state.devices = quantity;
    },
  },
  extraReducers: (builder) => 
    builder
        .addCase(getUserCart.pending, (state) => {
          state.isCartLoading = true;
        })
        .addCase(getUserCart.fulfilled, (state, action) => {
          state.items = action.payload;
          console.log("Cart items: ", state.items);
          state.isCartLoading = false;
        })
        .addCase(getUserCart.rejected, (state, action) => {
          state.isCartLoading = false;
          state.error = action.payload;
        }),
});

export const selectTotalAmount = createSelector(
  selectCartItems,
  (items) => items.reduce((acc, item) => acc + item.quantity * item.price, 0)
);

export const { closeCart, toggleCart, addToCart, removeAllFromCart, deviceQuantity, cartItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
