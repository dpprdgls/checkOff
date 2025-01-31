import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, createTask, deleteTask, updateTask } from '../redux/actions/taskActions.js';
import { setHoveredTask, clearHoveredTask } from '../redux/slices/hoverSlice.js';
import TaskCard from './TaskCard';
import '../styles/tailwind.css';

const Tasks = () => {
  const dispatch = useDispatch();
  const hoveredTaskId = useSelector((state) => state.hover.hoveredTaskId);
  const { tasks = [], loading, error } = useSelector((state) => state.tasks);

  const [newTask, setNewTask] = useState({
    title: '',
    notes: '',
    itemsRequired: [''],
    cost: '',
    category: '',
  });

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleCreateTask = async () => {
    try {
      await dispatch(createTask(newTask));
      setShowCreateForm(false);
      setNewTask({ title: '', notes: '', itemsRequired: [''], cost: '', category: '' });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleEditTask = (task) => {
    setEditMode(task._id);
    setEditTask({ ...task });
  };

  const handleSaveEdit = async () => {
    try {
      await dispatch(updateTask(editMode, editTask));
      setEditMode(null);
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
    <div className="tasksWrapper">
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <h1 className="text-4xl md:text-7xl mb-1 md:mb-3 font-bold text-gray-500">Your Tasks</h1>

        {error && <div>Error: {error}</div>}
        {loading ? (
          <div>Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div>
            <p>No tasks found</p>
            <button onClick={() => setShowCreateForm(true)}>Create Task</button>
          </div>
        ) : (
          <div className="taskCardContainer">
            {tasks.map((task) => (
              <div key={task._id}>
                {editMode === task._id ? (
                  <div>
                    {/* Edit Form */}
                    <div>
                      <label>Title</label>
                      <input
                        type="text"
                        value={editTask.title}
                        onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <label>Notes</label>
                      <textarea
                        value={editTask.notes}
                        onChange={(e) => setEditTask({ ...editTask, notes: e.target.value })}
                      />
                    </div>
                    <div>
                      <label>Items Required (comma-separated)</label>
                      <input
                        type="text"
                        value={editTask.itemsRequired.join(', ')}
                        onChange={(e) =>
                          setEditTask({
                            ...editTask,
                            itemsRequired: e.target.value.split(',').map((item) => item.trim()),
                          })
                        }
                      />
                    </div>
                    <div>
                      <label>Cost</label>
                      <input
                        type="text"
                        value={editTask.cost}
                        onChange={(e) => setEditTask({ ...editTask, cost: e.target.value })}
                      />
                    </div>
                    <div>
                      <label>Category</label>
                      <input
                        type="text"
                        value={editTask.category}
                        onChange={(e) => setEditTask({ ...editTask, category: e.target.value })}
                      />
                    </div>
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={() => setEditMode(null)}>Cancel</button>
                  </div>
                ) : (
                  <>
                    {/* Task Card */}
                    <TaskCard task={task} />

                    {/* Edit Button */}
                    <button
                      onMouseEnter={() => dispatch(setHoveredTask(`edit-${task._id}`))}
                      onMouseLeave={() => dispatch(clearHoveredTask())}
                      onClick={() => handleEditTask(task)}
                      className={`flex items-center justify-center gap-4 w-full text-white py-3 px-4 rounded-md text-center ${
                        hoveredTaskId === `edit-${task._id}` ? 'bg-gray-700' : 'bg-gray-500'
                      }`}
                    >
                      
                        {hoveredTaskId === `edit-${task._id}` ? 'Edit' : <span className="material-symbols-outlined">edit_note</span>}
                    </button>

                    
                    {/* Delete Button */}
                    <button
                      onMouseEnter={() => dispatch(setHoveredTask(`delete-${task._id}`))}
                      onMouseLeave={() => dispatch(clearHoveredTask())}
                      onClick={() => handleDeleteTask(task._id)}
                      className={`flex items-center justify-center gap-4 w-full text-white py-3 px-4 rounded-md text-center ${
                        hoveredTaskId === `delete-${task._id}` ? 'bg-red-500 hover:bg-red-700' : 'bg-gray-500'
                      }`}
                    >
                      
                      {hoveredTaskId === `delete-${task._id}` ? 'Delete' : <span className="material-icons-outlined">delete</span>}
                      </button>
                  </>
                )}
              </div>
            ))}
            <div className="createTaskWrapper">
              {/* Floating "Create Task" Button */}
              <button
                onMouseEnter={() => dispatch(setHoveredTask('create-task'))}
                onMouseLeave={() => dispatch(clearHoveredTask())}
                onClick={() => setShowCreateForm(true)}
                className={`fixed bottom-6 right-6 flex items-center justify-center gap-4 p-6 rounded-full shadow-lg transition-all ${
                  hoveredTaskId === 'create-task' ? 'bg-blue-600 hover:bg-blue-800 w-48' : 'bg-blue-500 w-16'
                } text-white`}
              >
                {hoveredTaskId === 'create-task' ? 'Create Task' : <span className="material-symbols-outlined text-3xl">new_window</span>}
              </button>
            </div>
          </div>
        )}

        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">Create New Task</h3>
              
              {/* Title Input */}
              <input
                type="text"
                placeholder="Title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="w-full px-4 py-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              {/* Notes Input */}
              <textarea
                placeholder="Notes"
                value={newTask.notes}
                onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                className="w-full px-4 py-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
              />

              {/* Items Required Input */}
              <input
                type="text"
                placeholder="Items Required (comma-separated)"
                value={newTask.itemsRequired.join(', ')}
                onChange={(e) =>
                  setNewTask({ ...newTask, itemsRequired: e.target.value.split(',').map((item) => item.trim()) })
                }
                className="w-full px-4 py-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Cost Input */}
              <input
                type="text"
                placeholder="Cost"
                value={newTask.cost}
                onChange={(e) => setNewTask({ ...newTask, cost: e.target.value })}
                className="w-full px-4 py-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Category Input */}
              <input
                type="text"
                placeholder="Category"
                value={newTask.category}
                onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Buttons */}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateTask}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;