import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/index.js';

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development mode
});

export default store;