
import '../styles/tailwind.css';
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
    <div className='navWrapper fixed w-full'>
    <nav className="fixed w-full h-[50px] flex justify-between items-center px-6 bg-gray-100 text-gray-300 shadow-md">
      {/* Logo or Brand Name */}
      <div className="flex items-center space-x-4 px-8">
  <NavLink
    to="/"
    className={({ isActive }) =>
      `navi-btn ${isActive ? 'bg-gray-700' : ''}`
    }
  >
    Home
  </NavLink>
  
  <NavLink
    to="/login/:id/tasks"
    className={({ isActive }) =>
      `navi-btn ${isActive ? 'bg-gray-700' : ''}`
    }
  >
    Tasks
  </NavLink>
  <NavLink
    to="/projects"
    className={({ isActive }) =>
      `navi-btn ${isActive ? 'bg-gray-700' : ''}`
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
            className="logout-btn"
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
    </div>
  );
};

export default NavBar;

//is this the current file?
