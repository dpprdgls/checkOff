

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions/authActions';

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isLoggedIn = Boolean(token);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <nav className="fixed w-full h-[80px] flex justify-between items-center px-6 bg-slate-700 text-gray-300 shadow-md">
      {/* Logo or Brand Name */}
      <div className="flex items-center space-x-4 px-4">
  <NavLink
    to="/"
    className={({ isActive }) =>
      `nav-button ${isActive ? 'bg-gray-700' : ''}`
    }
  >
    Home
  </NavLink>
  <button class='btn-primary'>Test</button>
  <NavLink
    to="/login/:id/tasks"
    className={({ isActive }) =>
      `nav-button ${isActive ? 'bg-gray-700' : ''}`
    }
  >
    Tasks
  </NavLink>
  <NavLink
    to="/projects"
    className={({ isActive }) =>
      `nav-button ${isActive ? 'bg-gray-700' : ''}`
    }
  >
    Projects
  </NavLink>
</div>

      {/* Auth Buttons */}
      <div>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        ) : (
          <div className="flex space-x-4">
            <NavLink
              to="/login"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Register
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

//is this the current file?
