
// App.jsx
import React from 'react';
import './styles/tailwind.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Home from './pages/Home.jsx';
import Tasks from './components/Tasks';
import NavBar from './components/Navbar';
import Projects from './components/Projects';

const App = () => {
  return (
    <div className="flex">
      <Router>
        <NavBar />
        <div className="ml-56 w-full p-4"> {/* Adds left margin for sidebar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login/:id/tasks" element={<Tasks />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;