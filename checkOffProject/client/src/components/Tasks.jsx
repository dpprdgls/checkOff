// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchTasks, createTask } from '../redux/actions/taskActions.js'; // Ensure these actions are correctly defined

// const Tasks = () => {
//   const dispatch = useDispatch();
//   const tasks = useSelector((state) => state.tasks); // Assuming tasks are in state.tasks
//   const [newTask, setNewTask] = useState({ title: '', notes: '', itemsRequired: '', cost: '', category: '' });
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     dispatch(fetchTasks()); // Fetch the tasks when the component mounts
//   }, [dispatch]);

//   const handleCreateTask = async () => {
//     try {
//       await dispatch(createTask(newTask)); // Dispatch the createTask action
//       setShowCreateForm(false); // Hide the form after creating a task
//       setNewTask({ title: '', notes: '', itemsRequired: '', cost: '', category: '' }); // Reset form fields
//     } catch (error) {
//       setError('Error creating task.'); // Set error if task creation fails
//     }
//   };

//   return (
//     <div>
//       <h1>Your Tasks</h1>
//       {error && <div>Error: {error}</div>}
//       {tasks.length === 0 ? (
//         <div>
//           <p>No tasks found</p>
//           <button onClick={() => setShowCreateForm(true)}>Create Task</button>
//         </div>
//       ) : (
//         <div>
//           {tasks.map((task) => (
//             <div key={task._id}>
//               <h2>{task.title}</h2>
//               <p>{task.notes}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {showCreateForm && (
//         <div>
//           <h3>Create New Task</h3>
//           <input
//             type="text"
//             placeholder="Title"
//             value={newTask.title}
//             onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//           />
//           <textarea
//             placeholder="Notes"
//             value={newTask.notes}
//             onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Items Required"
//             value={newTask.itemsRequired}
//             onChange={(e) => setNewTask({ ...newTask, itemsRequired: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Cost"
//             value={newTask.cost}
//             onChange={(e) => setNewTask({ ...newTask, cost: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Category"
//             value={newTask.category}
//             onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
//           />
//           <button onClick={handleCreateTask}>Submit</button>
//           <button onClick={() => setShowCreateForm(false)}>Cancel</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Tasks;

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, createTask, deleteTask } from '../redux/actions/taskActions.js'; // Ensure these actions are correctly defined

const Tasks = () => {
  const dispatch = useDispatch();
  
  // Fetch state from Redux store
  const { tasks = [], loading, error } = useSelector((state) => state.tasks); // Assuming tasks, loading, and error are in state.tasks
  
  const [newTask, setNewTask] = useState({
    title: '', 
    notes: '', 
    itemsRequired: '', 
    cost: '', 
    category: ''
  });
  
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Fetch tasks on component mount
  useEffect(() => {
    dispatch(fetchTasks()); // Fetch the tasks when the component mounts
  }, [dispatch]);

  // Handle task creation
  const handleCreateTask = async () => {
    try {
      await dispatch(createTask(newTask));
      // dispatch(fetchTasks()); // Dispatch the createTask action
      setShowCreateForm(false); // Hide the form after creating a task
      setNewTask({ title: '', notes: '', itemsRequired: '', cost: '', category: '' }); // Reset form fields
    } catch (error) {
      console.error('Error creating task:', error); // Log any error
    }
  };

  return (
    <div>
      <h1>Your Tasks</h1>

      {/* Display error */}
      {error && <div>Error: {error}</div>}
      
      {/* Show loading state */}
      {loading ? (
        <div>Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div>
          <p>No tasks found</p>
          <button onClick={() => setShowCreateForm(true)}>Create Task</button>
        </div>
      ) : (
        <div>
          {tasks.map((task) => (
            <div key={task._id}>
              <h2>{task.title}</h2>
              <p>{task.notes}</p>
            </div>
          ))}
          <button onClick={() => setShowCreateForm(true)}>Create New Task</button>
        </div>
      )}

      {/* Show the task creation form */}
      {showCreateForm && (
        <div>
          <h3>Create New Task</h3>
          <input
            type="text"
            placeholder="Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <textarea
            placeholder="Notes"
            value={newTask.notes}
            onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
          />
          <input
            type="text"
            placeholder="Items Required"
            value={newTask.itemsRequired}
            onChange={(e) => setNewTask({ ...newTask, itemsRequired: e.target.value })}
          />
          <input
            type="text"
            placeholder="Cost"
            value={newTask.cost}
            onChange={(e) => setNewTask({ ...newTask, cost: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            value={newTask.category}
            onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
          />
          <button onClick={handleCreateTask}>Submit</button>
          <button onClick={() => setShowCreateForm(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Tasks;