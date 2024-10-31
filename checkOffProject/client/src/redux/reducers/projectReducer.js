// redux/reducers/projectReducer.js

import { 
    FETCH_PROJECT_SUCCESS, 
    CREATE_PROJECT_SUCCESS,
    UPDATE_PROJECT_SUCCESS,
    UPDATE_PROJECT_FAILURE,
    DELETE_PROJECT_SUCCESS,
    DELETE_PROJECT_FAILURE,
} from '../actions/prjectActions.js';

const initialState = [];

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECT_SUCCESS:
        return { 
            ...state, 
            projects: action.payload, 
            loading: false 
        };
    case CREATE_PROJECT_SUCCESS:
        return {
            ...state, 
            projects: [
                ...state.projects,
                action.payload
            ]
        };
    case UPDATE_PROJECT_SUCCESS:
        return {
            ...state,
            projects: state.projects.map(project =>
                project._id === action.payload._id ? action.payload : project
            ),
        };
    case UPDATE_PROJECT_FAILURE:
        return {
            ...state,
            error: action.payload,
        };
    case DELETE_PROJECT_SUCCESS:
        return { ...state,
            loading: false,
            projects: state.projects.filter(project => 
                project._id !== action.payload)
        };
    case DELETE_PROJECT_FAILURE:
        return { ...state, 
            loading: false, 
            error: action.payload }
    
        default:
        return state;
  }
};

export default projectReducer;