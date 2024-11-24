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
      <nav className="flex flex-col mt-6 space-y-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-2 hover:text-white ${
              isActive ? 'bg-gray-700' : ''
            }`
          }
        >
          <span className="material-icons-outlined">home</span>
          {isHovered && <span>Home</span>}
        </NavLink>
        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-2 hover:text-white ${
              isActive ? 'bg-gray-700' : ''
            }`
          }
        >
          <span className="material-icons-outlined">task</span>
          {isHovered && <span>Tasks</span>}
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-2 hover:text-white ${
              isActive ? 'bg-gray-700' : ''
            }`
          }
        >
          <span className="material-icons-outlined">folder</span>
          {isHovered && <span>Projects</span>}
        </NavLink>
      </nav>

      {/* Auth Buttons */}
      <div className="mt-auto mb-6 px-4">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
          >
            {isHovered ? 'Logout' : <span className="material-icons-outlined">logout</span>}
          </button>
        ) : (
          <div className="flex flex-col space-y-4">
            <NavLink
              to="/login"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 text-center"
            >
              {isHovered ? 'Login' : <span className="material-icons-outlined">login</span>}
            </NavLink>
            <NavLink
              to="/register"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 text-center"
            >
              {isHovered ? 'Register' : <span className="material-icons-outlined">person_add</span>}
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;