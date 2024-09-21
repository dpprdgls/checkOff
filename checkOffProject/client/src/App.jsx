import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<h1>Welcome to the app</h1>} />
        <Route path="/login" element={<LoginForm />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;