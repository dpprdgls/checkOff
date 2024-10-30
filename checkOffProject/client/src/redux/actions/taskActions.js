// redux/actions/taskActions.js

export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS';

export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
export const UPDATE_TASK_FAILURE = 'UPDATE_TASK_FAILURE';

// Define or import these action types at the top of taskActions.js
export const DELETE_TASK_REQUEST = 'DELETE_TASK_REQUEST';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const DELETE_TASK_FAILURE = 'DELETE_TASK_FAILURE';

export const fetchTasks = () => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:4000/api/tasks', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const tasks = await response.json();
    dispatch({ type: FETCH_TASKS_SUCCESS, payload: tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};

export const createTask = (taskData) => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:4000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) {
      throw new Error('Failed to create task');
    }

    const newTask = await response.json();
    dispatch({ type: CREATE_TASK_SUCCESS, payload: newTask });
    console.log('Task created successfully:', newTask);
  } catch (error) {
    console.error('Error creating task:', error);
  }
};

export const updateTask = (taskId, updatedTaskData) => async (dispatch) => {
    try {
        const response = await fetch(`http://localhost:4000/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(updatedTaskData),
        });
        if (!response.ok) {
            throw new Error('Failed to update task');
        }
        const updatedTask = await response.json();
        dispatch({ type: UPDATE_TASK_SUCCESS, payload: updatedTask });
        } catch (error) {
            dispatch({ type: UPDATE_TASK_FAILURE, payload: error.message });
            console.error('Error updating task:', error);
        }
    };

export const deleteTask = (taskId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_TASK_REQUEST });
        console.log('Deleting task:', taskId);
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:4000/api/tasks/${taskId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete task');
        }

     
        dispatch({ type: DELETE_TASK_SUCCESS, payload: taskId });
    } catch (error) {
        console.error('Error deleting task', error);
        dispatch({ type: DELETE_TASK_FAILURE, payload: error.message });
    }
};