import { createSlice, createSelector } from '@reduxjs/toolkit';

const cartItems = JSON.parse(localStorage.getItem('cart')  || '[]');

const initialState = {
  items: cartItems,
  devices: 1,
  isCartOpen: false, 
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
      };
    },
    removeAllFromCart: (state) => {
      state.items = [];
    },
    cartItemQuantity: (state, action) => {
      const {item_id, quantity} = action.payload
      const indexProductId = state.items.findIndex(item => item.item_id === item_id);
      state.items[indexProductId].quantity = quantity
    },
    deviceQuantity: (state, action) => {
      const {quantity} = action.payload
      state.devices = quantity;
    },
  },
});

export const selectTotalAmount = createSelector(
  selectCartItems,
  (items) => items.reduce((acc, item) => acc + item.quantity * item.price, 0)
);

export const { closeCart, toggleCart, addToCart, removeAllFromCart, deviceQuantity,  cartItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
