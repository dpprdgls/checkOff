import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions/authActions';

const Sidebar = ({ isHovered, setIsHovered }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isLoggedIn = Boolean(token);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-900 text-gray-300 transition-all duration-300 ${
        isHovered ? 'w-64' : 'w-16'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-center text-white text-xl font-bold py-4">
        {isHovered ? 'MyApp' : 'M'}
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col mt-6 space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center justify-center gap-4 px-4 py-3 rounded-md hover:text-white ${
              isActive ? 'bg-gray-700' : ''
            }`
          }
        >
          <span className="material-icons-outlined text-lg">home</span>
          {isHovered && <span className="text-sm font-medium">Home</span>}
        </NavLink>
        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `flex items-center justify-center gap-4 px-4 py-3 rounded-md hover:text-white ${
              isActive ? 'bg-gray-700' : ''
            }`
          }
        >
          <span className="material-icons-outlined text-lg">task</span>
          {isHovered && <span className="text-sm font-medium">Tasks</span>}
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `flex items-center justify-center gap-4 px-4 py-3 rounded-md hover:text-white ${
              isActive ? 'bg-gray-700' : ''
            }`
          }
        >
          <span className="material-icons-outlined text-lg">folder</span>
          {isHovered && <span className="text-sm font-medium">Projects</span>}
        </NavLink>
      </nav>

      {/* Auth Buttons */}
      <div className="mt-auto mb-6 px-4">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className={`flex items-center justify-center gap-4 w-full text-white py-3 px-4 rounded-md text-center ${
              isHovered ? 'bg-red-500 hover:bg-red-700' : ''
            }`}
          >
            <span className="material-icons-outlined text-lg">logout</span>
            {isHovered && <span className="text-sm font-medium">Logout</span>}
          </button>
        ) : (
          <div className="flex flex-col space-y-2">
            <NavLink
              to="/login"
              className={`flex items-center justify-center gap-4 w-full text-white py-3 px-4 rounded-md text-center ${
                isHovered ? 'bg-stone-500 hover:bg-stone-700' : ''
              }`}
            >
              <span className="material-icons-outlined text-lg">login</span>
              {isHovered && <span className="text-sm font-medium">Login</span>}
            </NavLink>
            <NavLink
              to="/register"
              className={`flex items-center justify-center gap-4 w-full text-white py-3 px-4 rounded-md text-center ${
                isHovered ? 'bg-orange-500 hover:bg-orange-700' : ''
              }`}
            >
              <span className="material-icons-outlined text-lg">person_add</span>
              {isHovered && <span className="text-sm font-medium">Register</span>}
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;