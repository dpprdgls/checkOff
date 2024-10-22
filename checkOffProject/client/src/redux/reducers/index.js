import { combineReducers } from 'redux';
import authReducer from './authReducer.js'; 
// import userReducer from './userReducer.js';
// Add other reducers as needed

const rootReducer = combineReducers({
  auth: authReducer,
 
  // add more reducers here
});

export default rootReducer;