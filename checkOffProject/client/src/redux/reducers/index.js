import  { combineReducers } from 'redux';
import authReducer from './authReducer.js';
import userReducer from '../../models/user/userSlice.js';
const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,

});

export default rootReducer;