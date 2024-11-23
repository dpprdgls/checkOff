import '../styles/tailwind.css';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions/authActions';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isLoggedIn = Boolean(token);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <div className="fixed top-0 left-0 h-full w-[250px] bg-gray-800 text-gray-300 shadow-lg">
      {/* Logo or Brand Name */}
      <div className="p-4 text-2xl font-bold text-white border-b border-gray-600">
        MyApp
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col p-4 space-y-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `py-2 px-4 rounded text-lg hover:bg-gray-700 hover:text-white ${
              isActive ? 'bg-gray-700 text-white' : ''
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/login/:id/tasks"
          className={({ isActive }) =>
            `py-2 px-4 rounded text-lg hover:bg-gray-700 hover:text-white ${
              isActive ? 'bg-gray-700 text-white' : ''
            }`
          }
        >
          Tasks
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `py-2 px-4 rounded text-lg hover:bg-gray-700 hover:text-white ${
              isActive ? 'bg-gray-700 text-white' : ''
            }`
          }
        >
          Projects
        </NavLink>
      </div>

      {/* Auth Buttons */}
      <div className="absolute bottom-4 left-0 w-full px-4">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 bg-red-500 hover:bg-red-700 text-white font-bold rounded"
          >
            Logout
          </button>
        ) : (
          <div className="flex flex-col space-y-2">
            <NavLink
              to="/login"
              className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded text-center"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="py-2 px-4 bg-green-500 hover:bg-green-700 text-white font-bold rounded text-center"
            >
              Register
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;



