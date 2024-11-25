

import React, { useState } from 'react';
import './styles/tailwind.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home.jsx';
import Tasks from './components/Tasks';
import Projects from './components/Projects';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const App = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex">
      <Router>
        <Sidebar isHovered={isHovered} setIsHovered={setIsHovered} />
        <div
          className={`transition-all duration-300 ${
            isHovered ? 'ml-64' : 'ml-16'
          } w-full p-4`}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;