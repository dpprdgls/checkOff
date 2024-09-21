
import { configureStore  } from '@reduxjs/toolkit';
import userReducer from '../models/user/userSlice.js';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index.js';


const store = configureStore({
    reducer: {
        reducer: rootReducer,
        
    }
});

export default store;
