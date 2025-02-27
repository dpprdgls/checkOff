
// redux/store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import taskReducer from '../reducers/taskReducer.js'; // Assuming this is the path to your task reducer
import authReducer from '../reducers/authReducer.js'; // Assuming this is the path to your auth reducer
import projectReducer from '../reducers/projectReducer.js'; // Assuming this is the path to your project reducer
import hoverReducer from '../slices/hoverSlice.js'; // Assuming this is the path to your hover slice
const rootReducer = combineReducers({
  tasks: taskReducer,
  auth: authReducer,
  projects: projectReducer, 
  hover: hoverReducer,
  // other reducers...
});

// Configure the Redux store
const store = configureStore({
  reducer: rootReducer,
});

export default store;