import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orders: JSON.parse(localStorage.getItem('orders' || '')) ?? [],
    status: 'idle',
    currentOrder: JSON.parse(localStorage.getItem('currentOrder' || '')) ?? null,
    totalOrders: 0
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    saveCurrentOrder: (state, action) => {
        state.currentOrder = action.payload;
        localStorage.setItem('currentOrder', JSON.stringify(state.currentOrder));
        state.totalOrders += 1;
    },
    saveOrderSuccess: (state, action) => {
        state.orders.push(action.payload);
        state.currentOrder = null;
        localStorage.setItem('orders', JSON.stringify(state.orders));
        localStorage.removeItem('currentOrder')
    },
    resetOrder: (state) => {
        state.currentOrder = null;
      },
  },
});

export const { saveCurrentOrder, resetOrder, saveOrderSuccess } = orderSlice.actions;

export default orderSlice.reducer;
