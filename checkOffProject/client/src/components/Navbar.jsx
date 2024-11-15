

import '../styles/tailwind.css';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';


const NavBar = () => {
  const [nav, setNav] = useState(false);

  return (
    <div className='fixed w-full h-[80px] flex justify-between items-center px-4 bg-slate-800 text-gray-300 mb-8'>
      <ul className='hidden md:flex'>
        <li>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive ? 'text-orange-500 px-4 cursor-pointer' : 'px-4 cursor-pointer'
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/login/:id/tasks'
            className={({ isActive }) =>
              isActive ? 'text-orange-500 px-4 cursor-pointer' : 'px-4 cursor-pointer'
            }
          >
            Tasks
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/projects'
            className={({ isActive }) =>
              isActive ? 'text-orange-500 px-4 cursor-pointer' : 'px-4 cursor-pointer'
            }
          >
            Projects
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;