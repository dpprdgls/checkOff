// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchTasks } from './path/to/taskSlice'; // Adjust path to taskSlice

// const TaskList = () => {
//   const dispatch = useDispatch();
//   const tasks = useSelector((state) => state.tasks.tasks);

//   useEffect(() => {
//     const userId = localStorage.getItem('userId'); // Assuming user ID is stored after login
//     dispatch(fetchTasks(userId)); // Pass the user ID to fetch tasks
//   }, [dispatch]);

//   return (
//     <div>
//       {tasks.map((task) => (
//         <TaskCard key={task._id} task={task} />
//       ))}
//     </div>
//   );
// };

// export default TaskList;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch tasks (existing functionality)
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/tasks/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete task (new functionality)
export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      return taskId; // Return taskId so we can remove it from the state
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Handle deleteTask action
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;