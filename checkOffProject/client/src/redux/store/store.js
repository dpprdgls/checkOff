// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from '../reducers/index.js';

// const store = configureStore({
//   reducer: rootReducer,
//   devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development mode
// });

// export default store;

// redux/store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import taskReducer from '../reducers/taskReducer.js'; // Assuming this is the path to your task reducer
import userReducer from '../reducers/userReducer.js'; // Import other reducers here

const rootReducer = combineReducers({
  tasks: taskReducer,
  user: userReducer, // Add your user reducer or other reducers here
  // other reducers...
});

// Configure the Redux store
const store = configureStore({
  reducer: rootReducer,
});

export default store;