// authReducer.js
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGOUT,
  } from '../actions/userActions.js'; // Ensure the path is correct
  
  const initialState = {
    isAuthenticated: false,
    token: null,
    error: null,
    loading: false,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
        return { ...state, loading: true };
      case LOGIN_SUCCESS:
        return { ...state, loading: false, isAuthenticated: true, token: action.payload };
      case LOGIN_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case REGISTER_REQUEST:
        return { ...state, loading: true };
      case REGISTER_SUCCESS:
        return { ...state, loading: false };
      case REGISTER_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case LOGOUT:
        return { ...state, loading: false, isAuthenticated: false, token: null, error: action.payload };
      default:
        return state;
    }
  };
  
  export default authReducer;