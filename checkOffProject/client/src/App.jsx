// import React from 'react';
// import './styles/tailwind.css';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import LoginForm from './components/LoginForm';
// import RegisterForm from './components/RegisterForm';
// import Home from './components/Home';
// import Tasks from './components/Tasks'; 
// import NavBar from './components/Navbar';
// import Projects from './components/Projects';

// const App = () => {
//   return (
//     <Router>
//       {/* Main App Container */}
//       <div className="bg-white text-stone-900 min-h-screen font-inter">
//         {/* NavBar at the top */}
//         <NavBar />

//         {/* Page Content Area */}
//         <div className="max-w-screen-lg mx-auto mt-8 p-4"> {/* Centers content and adds padding */}
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<LoginForm />} />
//             <Route path="/register" element={<RegisterForm />} />
//             <Route path="/login/:id/tasks" element={<Tasks />} />
//             <Route path="/projects" element={<Projects />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// };


// export default App;
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