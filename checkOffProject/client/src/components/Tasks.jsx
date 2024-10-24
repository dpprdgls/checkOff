// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchTasks, createTask, deleteTask, updateTask } from '../redux/actions/taskActions.js';

// const Tasks = () => {
//   const dispatch = useDispatch();
  
//   const { tasks = [], loading, error } = useSelector((state) => state.tasks); 
  
//   const [newTask, setNewTask] = useState({
//     title: '', 
//     notes: '', 
//     itemsRequired: '', 
//     cost: '', 
//     category: ''
//   });

//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [editMode, setEditMode] = useState(null); // Edit mode for a specific item
//   const [editedItem, setEditedItem] = useState(''); // Store edited item content

//   useEffect(() => {
//     dispatch(fetchTasks());
//   }, [dispatch]);

//   // Handle task creation
//   const handleCreateTask = async () => {
//     try {
//       await dispatch(createTask(newTask));
//       // dispatch(fetchTasks()); // Dispatch the createTask action
//       setShowCreateForm(false); // Hide the form after creating a task
//       setNewTask({ title: '', notes: '', itemsRequired: '', cost: '', category: '' }); // Reset form fields
//     } catch (error) {
//       console.error('Error creating task:', error); // Log any error
//     }
//   };

//   const handleEditItem = async (taskId, itemIndex, updatedItem) => {
//     const taskToEdit = tasks.find(task => task._id === taskId);

//     // Ensure the itemsRequired array is properly updated with the edited item
//     const updatedItems = [...taskToEdit.itemsRequired];
//     updatedItems[itemIndex] = updatedItem;

//     const updatedTask = { ...taskToEdit, itemsRequired: updatedItems }; // Update only the itemsRequired array

//     try {
//       // Dispatch the updateTask action with the updated task object
//       await dispatch(updateTask(taskId, updatedTask));
//       setEditMode(null); // Exit edit mode after updating
//     } catch (error) {
//       console.error('Error updating task:', error);
//     }
//   };

//   const handleUpdateTask = async (taskId, updatedTaskData) => {
//     try {
//       await dispatch(updateTask(taskId, updatedTaskData));
//       dispatch(fetchTasks()); // Dispatch the fetchTasks action after updating a task
//     } catch (error) {
//       console.error('Error updating task:', error);
//     }
//   };

//   const handleDeleteTask = async (taskId) => {
//     try {
//       await dispatch(deleteTask(taskId));
//       dispatch(fetchTasks()); // Dispatch the fetchTasks action after deleting a task

//     } catch (error) {
//       console.error('Error deleting task:', error);
//     }
//   }

//   return (
//     <div>
//       <h1>Your Tasks</h1>

//       {error && <div>Error: {error}</div>}
      
//       {loading ? (
//         <div>Loading tasks...</div>
//       ) : tasks.length === 0 ? (
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
//               <p>Cost: ${task.cost}</p>
//               <p>Category: {task.category}</p>

//               <h3>Items Required:</h3>
//               <ul>
//                 {task.itemsRequired.map((item, index) => (
//                   <li key={index}>
//                     {/* Edit button for individual items */}
//                     {editMode === `${task._id}-${index}` ? (
//                       <>
//                         <input
//                           type="text"
//                           value={editedItem}
//                           onChange={(e) => setEditedItem(e.target.value)}
//                         />
//                         <button onClick={() => handleEditItem(task._id, index, editedItem)}>Save</button>
//                         <button onClick={() => setEditMode(null)}>Cancel</button>
//                       </>
//                     ) : (
//                       <>
//                         {item}
//                         <button onClick={() => {
//                           setEditMode(`${task._id}-${index}`);
//                           setEditedItem(item);
//                         }}>Edit</button>
//                       </>
//                     )}
//                   </li>
//                 ))}
//               </ul>

//               {/* Delete button for the entire task */}
//               <button onClick={() => handleDeleteTask(task._id)}>Delete Task</button>
//             </div>
//           ))}
//           <button onClick={() => setShowCreateForm(true)}>Create New Task</button>
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
import { fetchTasks, createTask, deleteTask, updateTask } from '../redux/actions/taskActions.js';

const Tasks = () => {
  const dispatch = useDispatch();

  const { tasks = [], loading, error } = useSelector((state) => state.tasks);

  const [newTask, setNewTask] = useState({
    title: '',
    notes: '',
    itemsRequired: [''], // Initialize as an array for multiple items
    cost: '',
    category: ''
  });

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editMode, setEditMode] = useState(null); // Edit mode for a specific item
  const [editedItem, setEditedItem] = useState(''); // Store edited item content
  const [taskIdToEdit, setTaskIdToEdit] = useState(null); // Store task ID for editing

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // Handle task creation
  const handleCreateTask = async () => {
    try {
      await dispatch(createTask(newTask));
      setShowCreateForm(false); // Hide the form after creating a task
      setNewTask({ title: '', notes: '', itemsRequired: [''], cost: '', category: '' }); // Reset form fields
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleEditItem = async (taskId, itemIndex, updatedItem) => {
    const taskToEdit = tasks.find((task) => task._id === taskId);

    // Ensure the itemsRequired array is properly updated with the edited item
    const updatedItems = [...taskToEdit.itemsRequired];
    updatedItems[itemIndex] = updatedItem;

    const updatedTask = { ...taskToEdit, itemsRequired: updatedItems }; // Update only the itemsRequired array

    try {
      await dispatch(updateTask(taskId, updatedTask)); // Dispatch the updateTask action
      setEditMode(null); // Exit edit mode after updating
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await dispatch(deleteTask(taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <h1>Your Tasks</h1>

      {error && <div>Error: {error}</div>}

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
              <p>Cost: ${task.cost}</p>
              <p>Category: {task.category}</p>

              <h3>Items Required:</h3>
              <ul>
                {task.itemsRequired.map((item, index) => (
                  <li key={index}>
                    {editMode === `${task._id}-${index}` ? (
                      <>
                        <input
                          type="text"
                          value={editedItem}
                          onChange={(e) => setEditedItem(e.target.value)}
                        />
                        <button onClick={() => handleEditItem(task._id, index, editedItem)}>Save</button>
                        <button onClick={() => setEditMode(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        {item}
                        <button onClick={() => {
                          setEditMode(`${task._id}-${index}`);
                          setEditedItem(item);
                        }}>Edit</button>
                      </>
                    )}
                  </li>
                ))}
              </ul>

              {/* Delete button for the entire task */}
              <button onClick={() => handleDeleteTask(task._id)}>Delete Task</button>
            </div>
          ))}
          <button onClick={() => setShowCreateForm(true)}>Create New Task</button>
        </div>
      )}

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
            placeholder="Items Required (comma-separated)"
            value={newTask.itemsRequired.join(', ')} // Join array for display
            onChange={(e) => setNewTask({ ...newTask, itemsRequired: e.target.value.split(',').map(item => item.trim()) })}
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