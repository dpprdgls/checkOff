import { combineReducers } from 'redux';
import authReducer from './authReducer.js'; 
import userReducer from './userReducer.js';
// Add other reducers as needed

const rootReducer = combineReducers({
  auth: authReducer,
  usser: userReducer,
  // add more reducers here
});

export default rootReducer;