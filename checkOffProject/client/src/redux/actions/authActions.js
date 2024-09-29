export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

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
      body: JSON.stringify({ email, password }), // Send email and password as an object
    });

    if (!response.ok) {
      throw new Error('Login failed');
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
      body: JSON.stringify({ email, username, password }), // Send email, username, and password
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const data = await response.json(); // If needed, handle token here
    dispatch(registerSuccess());
    window.location.assign('/login'); // Redirect to login on success
  } catch (error) {
    dispatch(registerFailure(error.message));
  }
};