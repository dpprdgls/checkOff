import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../styles/tailwind.css';

const NavBar = () => {
    const [nav, setNav] = useState(false);
    const location = useLocation();
    // const handleClick = () => setNav(!nav);



return (
    <div className='fixed w-full h-[80px] flex justify-between items-center px-4 bg-slate text-gray-300'>
         <ul className='hidden md:flex'>
            <li>
            <NavLink exact to='/' className={location.pathname === '/' ? 'active-link' : ''}>
            Home
          </NavLink>
            </li>
            <li>
            <NavLink to='/login/:id/tasks' className={location.pathname === '/tasks' ? 'active-link' : ''}>
            Tasks
          </NavLink>
            </li>
            <li>
            <NavLink to='/projects' className={location.pathname === '/projects' ? 'active-link' : ''}>
            Projects
          </NavLink>
            </li>
         </ul>
    </div>
);

};
export default NavBar;