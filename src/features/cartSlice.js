import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { cart, cartGuest } from '../constants/URLs';

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

export const getGuestCart = createAsyncThunk(
  'getGuestCart',
  async(_, {rejectWithValue}) => {
    try {
      const response = await axios.get(cartGuest);
      console.log('guest cart: ', response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

const initialState = {
  items: [],
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
    removeAllFromCart: (state) => {
      state.items = [];
    },
    deviceQuantity: (state, action) => {
      const {quantity} = action.payload;
      if (quantity >= 0) {
        state.devices = quantity;
      } else {
        return
      }
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
        })
        .addCase(getGuestCart.pending, (state) => {
          state.isCartLoading = true;
        })
        .addCase(getGuestCart.fulfilled, (state, action) => {
          state.items = action.payload;
          console.log("Cart items: ", state.items);
          state.isCartLoading = false;
        })
        .addCase(getGuestCart.rejected, (state, action) => {
          state.error = action.payload;
          state.isCartLoading = false;
        })
});

export const selectTotalAmount = createSelector(
  selectCartItems,
  (items) => items.reduce((acc, item) => acc + item.quantity * item.price, 0)
);

export const selectTotalQuantity = createSelector(
  selectCartItems,
  (items) => items.reduce((acc, item) => acc + item.quantity, 0)
);

export const { closeCart, toggleCart, addToCart, removeAllFromCart, deviceQuantity, cartItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
