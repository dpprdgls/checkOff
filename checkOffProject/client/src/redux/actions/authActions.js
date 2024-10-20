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
    const response = await fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }), // Send email and password as an object
    });

    if (!response.ok) {
      const errorData = await response.json(); // Extract the error message from response
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token); // Store token locally
    dispatch(loginSuccess(data.token));
    
    // Delay the redirect to ensure Redux action completes first
    setTimeout(() => {
      window.location.assign(`http://localhost:3000/api/auth/login/${data.user.id}/tasks`);
    }, 100);
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : error.message;
    dispatch(loginFailure(errorMessage));
  }
};

// Register user
export const registerUser = (email, username, password) => async (dispatch) => {
  dispatch(registerRequest());

  try {
    const response = await fetch('http://localhost:4000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, username, password }), // Send email, username, and password
    });

    if (!response.ok) {
      const errorData = await response.json(); // Extract the error message from response
      throw new Error(errorData.message || 'Registration failed');
    }

    const data = await response.json(); // Handle token if needed (e.g., in response)
    dispatch(registerSuccess());

    // Redirect to login page after successful registration
    setTimeout(() => {
      window.location.assign('/login');
    }, 100);
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : error.message;
    dispatch(registerFailure(errorMessage));
  }
};
