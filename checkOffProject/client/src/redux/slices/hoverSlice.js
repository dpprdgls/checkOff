import { createSlice } from '@reduxjs/toolkit';

const hoverSlice = createSlice({
  name: 'hover',
  initialState: {
    hoveredTaskId: null, // Stores the ID of the currently hovered task
  },
  reducers: {
    setHoveredTask(state, action) {
      state.hoveredTaskId = action.payload;
    },
    clearHoveredTask(state) {
      state.hoveredTaskId = null;
    },
  },
});

export const { setHoveredTask, clearHoveredTask } = hoverSlice.actions;
export default hoverSlice.reducer;