// redux/reducers/taskReducer.js

import { 
    FETCH_TASKS_SUCCESS, 
    CREATE_TASK_SUCCESS,
    UPDATE_TASK_SUCCESS,
    UPDATE_TASK_FAILURE,
    DELETE_TASK_SUCCESS,
    DELETE_TASK_FAILURE,
} from '../actions/taskActions.js';

const initialState = {
    tasks: [],  // Initialize tasks as an empty array
    loading: false,
    error: null,
  };

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASKS_SUCCESS:
        return { 
            ...state, 
            tasks: action.payload, 
            loading: false 
        };
    case CREATE_TASK_SUCCESS:
        return {
            ...state, 
            tasks: [
                ...state.tasks,
                action.payload
            ]
        };
    case UPDATE_TASK_SUCCESS:
        return {
            ...state,
            tasks: state.tasks.map(task =>
                task._id === action.payload._id ? action.payload : task
            ),
        };
    case UPDATE_TASK_FAILURE:
        return {
            ...state,
            error: action.payload,
        };
    case DELETE_TASK_SUCCESS:
        return { ...state,
            loading: false,
            tasks: state.tasks.filter(task => 
                task._id !== action.payload)
        };
    case DELETE_TASK_FAILURE:
        return { ...state, 
            loading: false, 
            error: action.payload }
    
        default:
        return state;
  }
};

export default taskReducer;