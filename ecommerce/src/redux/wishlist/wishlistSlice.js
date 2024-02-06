// src/features/wishlist/wishlistSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
  wishListItems : JSON.parse(localStorage.getItem('wishList')) ?? [],
  wishlistMap: JSON.parse(localStorage.getItem('wishlistMap')) ??{}
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const existingItem = state.wishListItems.find((item) => item.id === action.payload.id);

      if (!existingItem) {
        state.wishListItems.push(action.payload);
        state.wishlistMap[action.payload.id] = true;
      } 
      // Update local storage
      localStorage.setItem('wishList', JSON.stringify(state.wishListItems));
      localStorage.setItem('wishlistMap', JSON.stringify(state.wishlistMap));
      console.log(JSON.parse(localStorage.getItem('wishList')));
    },
    removeFromWishlist: (state, action) => {
      // state.wishListItems = state.wishListItems.filter(item => item.id !== action.payload.id);
      const index =  state.wishListItems.filter(item => item.id !== action.payload.id);
      if (index !== -1) {
        state.wishListItems.splice(index, 1);
        delete state.wishlistMap[action.payload.id];
      }
      // Update local storage
      localStorage.setItem('wishList', JSON.stringify(state.wishListItems));
      localStorage.setItem('wishlistMap', JSON.stringify(state.wishlistMap));
      console.log(JSON.parse(localStorage.getItem('wishList')));
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export const selectWishlist = state => state.wishlist.items;
export default wishlistSlice.reducer;
