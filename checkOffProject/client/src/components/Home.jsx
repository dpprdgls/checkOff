import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/actions/userActions';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const isLoggedIn = Boolean(token);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <div>
      <h1>Welcome to Your Task Manager</h1>

      {!isLoggedIn ? (
        <div>
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/register')}>Register</button>
        </div>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}

      <div>
        <img 
          src='/vite.svg' 
          alt="Task Manager" 
          style={{ width: '300px', height: 'auto' }} 
        />
        <p>It's working now!</p>
      </div>
    </div>
  );
};

export default Home;