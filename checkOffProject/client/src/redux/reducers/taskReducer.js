// redux/reducers/taskReducer.js

import { FETCH_TASKS_SUCCESS, CREATE_TASK_SUCCESS } from '../actions/taskActions.js';

const initialState = [];

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASKS_SUCCESS:
      return action.payload;
    case CREATE_TASK_SUCCESS:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default taskReducer;