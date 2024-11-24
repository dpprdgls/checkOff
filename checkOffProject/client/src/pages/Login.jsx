
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/actions/authActions';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(formState));
  };

  return (
    <div className="flex">
      {/* Main Content */}
      <main className="ml-60 flex-1 p-8">
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">
            Log In
          </h2>
          {loading && <p className="text-center text-gray-500">Loading...</p>}
          {!loading && (
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your email"
                  value={formState.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="******"
                  value={formState.password}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              >
                Submit
              </button>
            </form>
          )}
          {error && (
            <div className="mt-4 p-3 bg-red-500 text-white text-center rounded-md">
              {error}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Login;

// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginUser } from '../redux/actions/authActions';

// const Login = () => {
//   const [formState, setFormState] = useState({ email: '', password: '' });
//   const dispatch = useDispatch();
//   const { loading, error } = useSelector((state) => state.auth);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormState({
//       ...formState,
//       [name]: value,
//     });
//   };

//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     dispatch(loginUser(formState));
//   };

//   return (
//     <div className="flex">
//       {/* Sidebar placeholder */}
//       <div className="hidden md:block w-60 bg-gray-800 h-screen fixed left-0 top-0"></div>

//       {/* Main content */}
//       <main className="ml-60 flex-1 p-6">
//         <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
//           <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">
//             Log In
//           </h2>
//           {loading && <p className="text-center text-gray-500">Loading...</p>}
//           {!loading && (
//             <form onSubmit={handleFormSubmit}>
//               <div className="mb-4">
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Email
//                 </label>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Your email"
//                   value={formState.email}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="mb-4">
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Password
//                 </label>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="******"
//                   value={formState.password}
//                   onChange={handleChange}
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md focus:outline-none focus:ring focus:ring-blue-300"
//               >
//                 Submit
//               </button>
//             </form>
//           )}
//           {error && (
//             <div className="mt-4 p-3 bg-red-500 text-white text-center rounded-md">
//               {error}
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginUser } from '../redux/actions/authActions';

// const Login = () => {
//     const [formState, setFormState] = useState({ email: '', password: ''});
//     const dispatch = useDispatch();
//     const { loading, error } = useSelector((state) => state.auth);

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setFormState({
//             ...formState,
//             [name]: value,
//         });
//     };

//     const handleFormSubmit = (event) => { 
//         event.preventDefault();
//         dispatch(loginUser(formState));
//     };

//     return (
//         <main className="flex-row justify-center mb-4">
//       <div className="col-12 col-lg-10">
//         <div className="card">
//           <h4 className="card-header bg-dark text-light p-2">Login</h4>
//           <div className="card-body">
//             {loading ? (
//               <p>Loading...</p>
//             ) : (
//               <form onSubmit={handleFormSubmit}>
//                 <input
//                   className="block w-full px-3 py-2 border border-gray-300 rounded-md"
//                   placeholder="Your email"
//                   name="email"
//                   type="email"
//                   value={formState.email}
//                   onChange={handleChange}
//                 />
//                 <input
//                   className="block w-full px-3 py-2 border border-gray-300 rounded-md"
//                   placeholder="******"
//                   name="password"
//                   type="password"
//                   value={formState.password}
//                   onChange={handleChange}
//                 />
//                 <button
//                   className="btn btn-block btn-info"
//                   style={{ cursor: 'pointer' }}
//                   type="submit"
//                 >
//                   Submit
//                 </button>
//               </form>
//             )}

//             {error && (
//               <div className="my-3 p-3 bg-danger text-white">
//                 {error}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </main>
//   );

// };

// export default Login;


