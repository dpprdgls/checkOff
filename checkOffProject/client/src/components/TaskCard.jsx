import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHoveredTask, clearHoveredTask } from '../redux/slices/hoverSlice';

const TaskCard = ({ task, handleEditTask, handleDeleteTask }) => {
  const dispatch = useDispatch();
  const hoveredTaskId = useSelector((state) => state.hover.hoveredTaskId);

  return (
    <div className="bg-gray-200 shadow-md rounded-lg p-6 relative w-full max-w-sm mx-auto flex flex-col justify-between">
      {/* Task Title & Content */}
      <h3 className="text-xl font-semibold text-gray-600 mb-2">{task.title}</h3>
      <p className="text-gray-500 mb-6">{task.notes}</p>

      {/* Buttons Container - Positioned at the Bottom */}
      <div className="flex justify-center gap-4">
        {/* Edit Button */}
        <button
          onMouseEnter={() => dispatch(setHoveredTask(`edit-${task._id}`))}
          onMouseLeave={() => dispatch(clearHoveredTask())}
          onClick={() => handleEditTask(task)}
          className={`flex items-center justify-center text-white px-2 py-2 rounded-md transition-all duration-200 overflow-hidden min-w-10 ${
            hoveredTaskId === `edit-${task._id}` ? 'bg-blue-900 w-24' : 'bg-blue-900 w-10'
          }`}
        >
          <span className="material-symbols-outlined">edit_note</span>
          {hoveredTaskId === `edit-${task._id}` ? <span className="ml-2 text-sm">Edit</span> : null}
        </button>

        {/* Delete Button */}
        <button
          onMouseEnter={() => dispatch(setHoveredTask(`delete-${task._id}`))}
          onMouseLeave={() => dispatch(clearHoveredTask())}
          onClick={() => handleDeleteTask(task._id)}
          className={`flex items-center justify-center text-white px-2 py-2 rounded-md transition-all duration-200 overflow-hidden min-w-10 ${
            hoveredTaskId === `delete-${task._id}` ? 'bg-red-600 w-24' : 'bg-red-600 w-10'
          }`}
        >
          <span className="material-symbols-outlined">delete</span>
          {hoveredTaskId === `delete-${task._id}` ? <span className="ml-2 text-sm">Delete</span> : null}
        </button>
      </div>
    </div>
  );
};

export default TaskCard;