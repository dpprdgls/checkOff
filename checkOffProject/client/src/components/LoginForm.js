import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, selectIsAuthenticated, selectUserError, selectIsLoading } from '../models/user/userSlice.js';

const LoginForm = () => {
   
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectUserError);

  const handleLogin = () => {
    dispatch(loginUser(credentials));
  };

  if (isAuthenticated) {
    return <div>You are logged in!</div>;
  }

  return (
    <div>
      <input
        type="text"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        placeholder="Username"
      />
      <input
        type="password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        placeholder="Password"
      />
      <button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Log In'}
      </button>
      {error && <div>{error}</div>}
    </div>
  );
};

export default LoginForm;