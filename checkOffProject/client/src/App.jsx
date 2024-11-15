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
    <div className='bg-white text-stone-900 min-h-screen font-inter'>
      <Router>
        <NavBar />
        <div className="max-w-5xl w-11/12 mx-auto mt-8 p-4"> {/* Added padding for spacing */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path='/login/:id/tasks' element={<Tasks />} />
            <Route path='/projects' element={<Projects />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;