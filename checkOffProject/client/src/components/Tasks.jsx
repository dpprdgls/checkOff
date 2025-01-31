import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, createTask, updateTask, deleteTask } from '../redux/actions/taskActions';
import TaskCard from './TaskCard';
import '../styles/tailwind.css';

const Tasks = () => {
  const dispatch = useDispatch();
  const { tasks = [], loading, error } = useSelector((state) => state.tasks);

  const [editMode, setEditMode] = useState(null); // Track task being edited
  const [editTask, setEditTask] = useState({ title: '', notes: '' });

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleCreateTask = async () => {
    try {
      await dispatch(createTask(editTask));
      setEditMode(null);
      setEditTask({ title: '', notes: '' });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleEditTask = (task) => {
    setEditMode(task._id); // Track which task is in edit mode
    setEditTask({ ...task }); // Copy task data to state
  };

  const handleSaveEdit = async () => {
    try {
      await dispatch(updateTask(editMode, editTask));
      setEditMode(null); // Exit edit mode
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
    <div className="min-h-screen bg-white flex flex-col items-center py-10">
      {/* Page Title */}
      <h1 className="text-6xl font-bold text-blue-900 mb-12">Your Tasks</h1>

      {/* Task Cards Grid */}
      {error && <div className="text-red-500">Error: {error}</div>}
      {loading ? (
        <div>Loading tasks...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              editMode={editMode}
              editTask={editTask}
              setEditTask={setEditTask}
              handleEditTask={handleEditTask}
              handleSaveEdit={handleSaveEdit}
              handleDeleteTask={handleDeleteTask}
            />
          ))}
        </div>
      )}

      {/* Floating "Create Task" Button */}
      <button
        onClick={() => setEditMode('new')}
        className="fixed bottom-6 right-6 flex items-center justify-center gap-4 p-6 rounded-full shadow-lg transition-all 
        bg-blue-500 hover:bg-blue-700 text-white w-16 h-16"
      >
        <span className="material-symbols-outlined text-3xl">new_window</span>
      </button>
    </div>
  );
};

export default Tasks;