

// NavBar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions/authActions';

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isLoggedIn = Boolean(token);

  // Check if isLoggedIn is correct
  console.log('isLoggedIn:', isLoggedIn);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <div className="fixed w-full h-[80px] flex justify-between items-center px-4 bg-slate-700 text-gray-300">
      <ul className="flex space-x-6 ml-4">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link text-orange-600' : '')}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/login/:id/tasks" className={({ isActive }) => (isActive ? 'active-link text-orange-600' : '')}>
            Tasks
          </NavLink>
        </li>
        <li>
          <NavLink to="/projects" className={({ isActive }) => (isActive ? 'active-link text-orange-600' : '')}>
            Projects
          </NavLink>
        </li>
      </ul>

      <div className="mr-4">
        {isLoggedIn ? (
          // Show logout button if user is logged in
          <button
            onClick={handleLogout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        ) : (
          // Show login and register links if user is not logged in
          <div className="flex space-x-4">
            <NavLink to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Login
            </NavLink>
            <NavLink to="/register" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Register
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;

//is this the current file?
