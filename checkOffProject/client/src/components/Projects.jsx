import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects, createProjects, deleteProject, updateProject } from '../redux/actions/projectActions.js';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const dispatch = useDispatch();
  const { projects = [], loading, error } = useSelector((state) => state.projects);
  
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
  });

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editMode, setEditMode] = useState(null); // Track project in edit mode
  const [editProject, setEditProject] = useState(null); // Store project being edited

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleCreateProject = async () => {
    try {
      await dispatch(createProjects(newProject));
      setShowCreateForm(false);
      setNewProject({ name: '', description: '' });
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleEditProject = (project) => {
    setEditMode(project._id);
    setEditProject({ ...project }); // Populate edit form with project details
  };

  const handleSaveEdit = async () => {
    try {
      await dispatch(updateProject(editMode, editProject));
      setEditMode(null); // Exit edit mode
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      console.log('Deleting project:', projectId);
      await dispatch(deleteProject(projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div className="projectsWrapper">
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <h1 className='text-4xl md:text-7xl mb-1 md:mb-3 font-bold text-gray-500'>Your Projects</h1>

        {error && <div>Error: {error}</div>}
        {loading ? (
          <div>Loading projects...</div>
        ) : projects.length === 0 ? (
          <div>
            <p>No projects found</p>
            <button onClick={() => setShowCreateForm(true)}>Create Project</button>
          </div>
        ) : (
          <div className='projectCardContainer'>
            {projects.map((project) => (
              <div key={project._id}>
                {editMode === project._id ? (
                  <div>
                    {/* Edit Form with Field Labels */}
                    <div>
                      <label>Name</label>
                      <input
                        type="text"
                        value={editProject.name}
                        onChange={(e) => setEditProject({ ...editProject, name: e.target.value })}
                      />
                    </div>

                    <div>
                      <label>Description</label>
                      <textarea
                        value={editProject.description}
                        onChange={(e) => setEditProject({ ...editProject, description: e.target.value })}
                      />
                    </div>

                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={() => setEditMode(null)}>Cancel</button>
                  </div>
                ) : (
                  <>
                    {/* Project Card */}
                    <ProjectCard project={project} />
                    <button onClick={() => handleEditProject(project)}>Edit</button>
                    <button onClick={() => handleDeleteProject(project._id)}>Delete Project</button>
                  </>
                )}
              </div>
            ))}
            <button onClick={() => setShowCreateForm(true)}>Create New Project</button>
          </div>
        )}

        {showCreateForm && (
          <div>
            <h3>Create New Project</h3>
            <input
              type="text"
              placeholder="Name"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            />
            <textarea
              placeholder="Description"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            />
            <button onClick={handleCreateProject}>Submit</button>
            <button onClick={() => setShowCreateForm(false)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;