import React from 'react';
import styles from './styles/style.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Home from './components/Home';
import Tasks from './components/Tasks'; // Examp

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/home" component={Home} />
        <Route path='/login/:id/tasks' element={<Tasks />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;