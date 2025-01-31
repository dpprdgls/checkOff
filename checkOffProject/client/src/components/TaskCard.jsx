import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHoveredTask, clearHoveredTask } from '../redux/slices/hoverSlice';

const TaskCard = ({ task, editMode, editTask, setEditTask, handleEditTask, handleSaveEdit, handleDeleteTask }) => {
  const dispatch = useDispatch();
  const hoveredTaskId = useSelector((state) => state.hover.hoveredTaskId);
  const isEditing = editMode === task._id;

  return (
    <div className="bg-gray-200 shadow-md rounded-lg p-6 relative w-full max-w-sm mx-auto flex flex-col justify-between">
      {/* Task Content - Show Input Fields if Editing */}
      {isEditing ? (
        <div className="mb-6">
          <input
            type="text"
            value={editTask.title}
            onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={editTask.notes}
            onChange={(e) => setEditTask({ ...editTask, notes: e.target.value })}
            className="w-full mt-2 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">{task.title}</h3>
          <p className="text-gray-500 mb-6">{task.notes}</p>
        </div>
      )}

      {/* Buttons Container - Moved to Bottom Right */}
      <div className="absolute bottom-3 right-3 flex gap-2">
        {/* Save Button (Only Show in Edit Mode) */}
        {isEditing ? (
          <button
            onClick={handleSaveEdit}
            className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-800 transition"
          >
            Save
          </button>
        ) : (
          <>
            {/* Edit Button */}
            <button
              onMouseEnter={() => dispatch(setHoveredTask(`edit-${task._id}`))}
              onMouseLeave={() => dispatch(clearHoveredTask())}
              onClick={() => handleEditTask(task)}
              className={`flex items-center justify-center text-white px-2 py-2 rounded-md transition-all duration-200 overflow-hidden ${
                hoveredTaskId === `edit-${task._id}` ? 'bg-blue-900 w-24' : 'bg-blue-900 w-10'
              }`}
            >
              <span className="material-symbols-outlined">edit_note</span>
              {hoveredTaskId === `edit-${task._id}` && <span className="ml-2 text-sm">Edit</span>}
            </button>

            {/* Delete Button */}
            <button
              onMouseEnter={() => dispatch(setHoveredTask(`delete-${task._id}`))}
              onMouseLeave={() => dispatch(clearHoveredTask())}
              onClick={() => handleDeleteTask(task._id)}
              className={`flex items-center justify-center text-white px-2 py-2 rounded-md transition-all duration-200 overflow-hidden ${
                hoveredTaskId === `delete-${task._id}` ? 'bg-red-600 w-24' : 'bg-red-600 w-10'
              }`}
            >
              <span className="material-symbols-outlined">delete</span>
              {hoveredTaskId === `delete-${task._id}` && <span className="ml-2 text-sm">Delete</span>}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskCard;