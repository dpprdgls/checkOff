


// Action types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';


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

    if (!data.user || !data.user.id) {
      throw new Error('User data missing in response');
    }
    
    // Store token locally
    localStorage.setItem('token', data.token); // Store token locally

    // Dispatch the login success action with the token
    dispatch(loginSuccess(data.token));

    // Return the user ID for redirect purposes in the component
    return data.user.id; 
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : error.message;
    dispatch(loginFailure(errorMessage));
    throw error; // Ensure the error is thrown so the component can catch it
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

    // Redirect to login page after successful registration (can be handled in the component too)
    setTimeout(() => {
      window.location.assign('/login');
    }, 100);
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : error.message;
    dispatch(registerFailure(errorMessage));
  }
};


// Logout user
export const logoutUser = () => (dispatch) => {
  // Clear local storage and token
  localStorage.removeItem('token');
  
  // Redirect or handle logout success here if needed
  dispatch({ type: 'LOGOUT_SUCCESS' });
};