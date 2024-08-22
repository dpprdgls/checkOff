import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/authActions';

const initialState = {
    loading: false,
    isAuthenticated: false,
    token: null,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, loading: true };
        case LOGIN_SUCCESS:
            return { ...state, loading: false, isAuthenticated: true, token: action.payload, error: null };
        case LOGIN_FAILURE:
            return { ...state, loading: false, isAuthenticated: false, token: null, error: action.payload };
        default: 
            return state;
    }
};

export default authReducer;