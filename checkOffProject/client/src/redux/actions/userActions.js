export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const LOGOUT = 'LOGOUT';

// Action creators for login
export const loginRequest = () => ({ type: LOGIN_REQUEST });
export const loginSuccess = (token) => ({ type: LOGIN_SUCCESS, payload: token });
export const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

// Action creators for registration
export const registerRequest = () => ({ type: REGISTER_REQUEST });
export const registerSuccess = () => ({ type: REGISTER_SUCCESS });
export const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

// Login user
export const loginUser = (email, password) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }), // Corrected to an object
    });

    if (!response.ok) {
      const errorData = await response.json(); // Extract error message from server
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token); // Store token locally
    dispatch(loginSuccess(data.token));
    window.location.assign('/'); // Redirect on success
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

// Register user
export const registerUser = (email, username, password) => async (dispatch) => {
  dispatch(registerRequest());

  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, username, password }), // Corrected to an object
      
    });

    if (!response.ok) {
        console.log(response);
      const errorData = await response.json(); // Extract error message from server
      throw new Error(errorData.message || 'Registration failed');
    }

    dispatch(registerSuccess());
    window.location.assign('/login'); // Redirect on success
  } catch (error) {
    dispatch(registerFailure(error.message));
  }
};

export const logoutUser = () => {
    return (dispatch) => {
        localStorage.removeItem('token');

        dispatch({ type: LOGOUT });
    };
};