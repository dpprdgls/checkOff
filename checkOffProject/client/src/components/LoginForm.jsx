import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations.js';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [login, { data, loading, error }] = useMutation(LOGIN_USER);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ variables: { email: credentials.email, password: credentials.password } });
    } catch (err) {
      console.error(err);
    }
  };

  // Check loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (data) {
    // Handle successful login, e.g., store token in localStorage
    return <div>Welcome, {data.login.username}!</div>;
  }

  return (
    <div>
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
      <button onClick={handleLogin}>
        Log In
      </button>
    </div>
  );
};

export default LoginForm;