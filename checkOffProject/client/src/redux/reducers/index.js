import { combineReducers } from 'redux';
import authReducer from './authReducer.js'; 
import taskReducer from './taskReducer.js';
// import userReducer from './userReducer.js';
// Add other reducers as needed

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: taskReducer,
  // user: userReducer,
 
  // add more reducers here
});

export default rootReducer;