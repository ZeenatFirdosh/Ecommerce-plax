// src/features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';


const initialState = { 
  cartItems : JSON.parse(localStorage.getItem('cart')) ?? [],
}


const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,

  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find((item) => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      // Update local storage
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
      console.log(JSON.parse(localStorage.getItem('cart')));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
      // Update local storage
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    setQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload.id);
      if (item && (item.quantity < item.stock)) {
        item.quantity = action.payload.quantity;
        // Update local storage
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        // Update local storage
        localStorage.setItem('cart', JSON.stringify(state.cartItems));
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload.id);
      if (item && (item.quantity < item.stock)) {
        item.quantity += 1;
        // Update local storage
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      // Update local storage
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  setQuantity,
} = cartSlice.actions;
export const selectCart = (state) => state.cart.cartItems;
export default cartSlice.reducer;
