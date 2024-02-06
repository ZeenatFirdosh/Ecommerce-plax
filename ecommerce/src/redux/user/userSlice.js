// src/redux/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('user/login', async (credentials) => {
    const response = await axios.post('https://dummyjson.com/auth/login',  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      console.log(response.data);
    return response.data;
  });

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) ?? null,
    token:localStorage.getItem('token') ?? null,
    addresses: JSON.parse(localStorage.getItem('addresses')) ?? [],
    activeComponent: 'profile', // default active component
    status: 'idle',
    error: null,
  };

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user= action.payload;
      localStorage.setItem('user',JSON.stringify(state.user));
    },
    setToken: (state, action) => {
      state.token= action.payload;
      localStorage.setItem('token', state.token);
    },
    addAddress: (state, action) => {
      state.addresses.push(action.payload);
      localStorage.setItem('addresses', JSON.stringify(state.addresses));

    },
    removeAddress: (state, action) => {
      state.addresses = state.addresses.filter(address => address.id !== action.payload.id);
      localStorage.setItem('addresses', JSON.stringify(state.addresses));

    },
    updateAddress: (state, action) => {
      const { id, updatedAddress } = action.payload;
      const index = state.addresses.findIndex(address => address.id === id);
      if (index !== -1) {
        state.addresses[index] = updatedAddress;
      }
      localStorage.setItem('addresses', JSON.stringify(state.addresses));

    },
    setActiveComponent: (state, action) => {
      state.activeComponent = action.payload;
    },
  },
    // Update the user slice to handle signup asynchronously
    extraReducers: (builder) => {
        builder
          .addCase(loginUser.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(loginUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = action.payload;
            localStorage.setItem('User', state.user);
            state.error = null;
          })
          .addCase(loginUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });
      },

});


export const { setUser , setToken, addAddress, removeAddress, updateAddress, setActiveComponent} = userSlice.actions;

export default userSlice.reducer;
