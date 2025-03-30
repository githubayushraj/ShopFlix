import { createSlice } from '@reduxjs/toolkit';

export const loginsignupSlice = createSlice({
  name: 'auth', 
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload; // Store user details
    },
    signup: (state, action) => {
      state.user = action.payload; // Same logic for signup
    },
    // logout: (state) => {
    //   state.user = null; // Clear user on logout
    // },
  },
});

export const { login, signup, logout } = loginsignupSlice.actions;

export default loginsignupSlice.reducer;
