// redux/actions/projectActions.js

export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS';
export const CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS';

export const UPDATE_PROJECT_SUCCESS = 'UPDATE_PROJECT_SUCCESS';
export const UPDATE_PROJECT_FAILURE = 'UPDATE_PROJECT_FAILURE';

// Define or import these action types at the top of taskActions.js
export const DELETE_PROJECT_REQUEST = 'DELETE_PROJECT_REQUEST';
export const DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS';
export const DELETE_PROJECT_FAILURE = 'DELETE_PROJECT_FAILURE';

export const fetchProjects = () => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:4000/api/projects', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const projects = await response.json();
    dispatch({ type: FETCH_PROJECTS_SUCCESS, payload: projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
};

export const createProjects = (projectData) => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:4000/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(projectData),
    });
    if (!response.ok) {
      throw new Error('Failed to create project');
    }

    const newProject = await response.json();
    dispatch({ type: CREATE_PROJECT_SUCCESS, payload: newProject });
    console.log('Project created successfully:', newProject);
  } catch (error) {
    console.error('Error creating project:', error);
  }
};

export const updateProject = (projectId, updatedProjectData) => async (dispatch) => {
    try {
        const response = await fetch(`http://localhost:4000/api/projects/${projectId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(updatedProjectData),
        });
        if (!response.ok) {
            throw new Error('Failed to update project');
        }
        const updatedProject = await response.json();
        dispatch({ type: UPDATE_PROJECT_SUCCESS, payload: updatedProject });
        } catch (error) {
            dispatch({ type: UPDATE_PROJECT_FAILURE, payload: error.message });
            console.error('Error updating project:', error);
        }
    };

export const deleteProject = (projectId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PROJECT_REQUEST });
        console.log('Deleting project:', projectId);
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:4000/api/projects/${projectId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete task');
        }

     
        dispatch({ type: DELETE_PROJECT_SUCCESS, payload: projectId });
    } catch (error) {
        console.error('Error deleting project', error);
        dispatch({ type: DELETE_PROJECT_FAILURE, payload: error.message });
    }
};