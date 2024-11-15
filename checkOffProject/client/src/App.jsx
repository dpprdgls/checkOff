import React from 'react';
import './styles/tailwind.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Home from './components/Home';
import Tasks from './components/Tasks'; 
import NavBar from './components/Navbar';
import Projects from './components/Projects';

const App = () => {
  return (
    <div>
      <div className='bg-white text-stone-900 min-h-screen font-inter max-w-5xl w-11/12 mx-auto'>
      <Router>
      <NavBar />


        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/home" element={<Home />} />
          <Route path='/login/:id/tasks' element={<Tasks />} />
          <Route path='/projects' element={<Projects />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
      </div>
    </div>
  );
};

export default App;