// navigationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  navActiveLink: 'Home', // Default to Home
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setNavActiveLink: (state, action) => {
      state.navActiveLink = action.payload;
    },
  },
});

export const { setNavActiveLink } = navigationSlice.actions;
export const selectActiveLink = (state) => state.navigation.navActiveLink;
export default navigationSlice.reducer;
