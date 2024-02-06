// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './product/productsSlice';
import wishlistReducer from './wishlist/wishlistSlice';
import cartReducer from './cart/cartSlice';
import userReducer from './user/userSlice';
import ratingsAndReviews from './rating/ratingsAndReviews';
import orderReducer from './order/orderSlice';
import navigationReducer from './navigation/navigationSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    user: userReducer,
    ratingsAndReviews: ratingsAndReviews,
    order: orderReducer,
    navigation: navigationReducer,
    // other reducers
  },
});
