// src/redux/reducers/authReducer.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    error: null,
  },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

// Export actions and reducer
export const { login, logout, setError } = authSlice.actions;
export default authSlice.reducer;