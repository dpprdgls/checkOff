import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (token) => ({
  type: LOGIN_SUCCESS,
  payload: token,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const loginUser = (formState) => async (dispatch) => {
    dispatch(loginRequest());

    try {
        const reponse = await axios.post('/api/auth/login', formState);
        const { token } = response.data;
        localStorage.setItem('id_token', token);
        dispatch(loginSuccess(token));
        window.location.assign('/');
    } catch (error) {
        dispatch(loginFailure(error.response.data.message));
    }
};