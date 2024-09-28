import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/actions/authActions'; // Assuming you have an authActions file

const RegisterForm = () => {
  const [formData, setFormData] = useState({ email: '', username: '', password: '' });
  
  const dispatch = useDispatch();
  
  // Get loading, success, and error states from Redux
  const { loading, error, success } = useSelector((state) => state.auth); // Assuming state.auth contains auth states

  const handleRegister = (e) => {
    e.preventDefault();
    
    // Dispatch the register action
    dispatch(registerUser(formData));
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="text"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
      />
      <input
        type="text"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        placeholder="Username"
      />
      <input
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="Password"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
      
      {error && <p>Error: {error}</p>}
      {success && <p>Registration successful!</p>}
    </form>
  );
};

export default RegisterForm;