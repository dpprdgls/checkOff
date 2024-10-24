import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // React Router navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Dispatch loginUser action and get user ID
      const userId = await dispatch(loginUser(credentials.email, credentials.password));

      // Redirect the user to the tasks page using user ID
      navigate(`/login/${userId}/tasks`);
    } catch (err) {
      setError(err.message);
      console.error('Login error:', err);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          placeholder="Email"
        />
        <input
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          placeholder="Password"
        />
        <button type="submit">Log In</button>
      </form>
      
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default LoginForm;