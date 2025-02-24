


import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects, createProjects, deleteProject, updateProject, addTaskToProject } from '../redux/actions/projectActions';
import { createTask } from '../redux/actions/taskActions'; // Import createTask action
import ProjectCard from './ProjectCard';
import '../styles/tailwind.css';

const Projects = () => {
  const dispatch = useDispatch();
  const { projects = [], loading, error } = useSelector((state) => state.projects);
  
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
  });

  const [newTask, setNewTask] = useState({
    title: '',
    notes: '',
    itemsRequired: [''],
    cost: '',
    category: ''
  });

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showCreateTaskForm, setShowCreateTaskForm] = useState(null); // Track which project shows the task form
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
    setEditProject({ ...project });
  };

  const handleSaveEdit = async () => {
    try {
      await dispatch(updateProject(editMode, editProject));
      setEditMode(null);
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await dispatch(deleteProject(projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };
  const handleCreateTaskAndAddToProject = async (projectId) => {
    try {
      const createdTask = await dispatch(createTask(newTask)).unwrap();
      await dispatch(addTaskToProject(projectId, createdTask._id));
  
      // Reset task form and close it after creation
      setNewTask({ title: '', notes: '', itemsRequired: [''], cost: '', category: '' });
      setShowCreateTaskForm(null);
  
      console.log("Task created and added to project:", createdTask);
      console.log("Task form should be closed now:", showCreateTaskForm);
    } catch (error) {
      console.error('Error creating task and adding to project:', error);
    }
  };

//   return (
//     <div className="projectsWrapper">
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <h1 className='text-4xl md:text-7xl mb-1 md:mb-3 italic text-gray-500'>Your Projects</h1>

//         {error && <div>Error: {error}</div>}
//         {loading ? (
//           <div>Loading projects...</div>
//         ) : projects.length === 0 ? (
//           <div>
//             <p>No projects found</p>
//             <button onClick={() => setShowCreateForm(true)}>Create Project</button>
//           </div>
//         ) : (
//           <div className='projectCardContainer'>
//             {projects.map((project) => (
//               <div key={project._id}>
//                 {editMode === project._id ? (
//                   <div>
//                     {/* Edit Form with Field Labels */}
//                     <div>
//                       <label>Name</label>
//                       <input
//                         type="text"
//                         value={editProject.name}
//                         onChange={(e) => setEditProject({ ...editProject, name: e.target.value })}
//                       />
//                     </div>

//                     <div>
//                       <label>Description</label>
//                       <textarea
//                         value={editProject.description}
//                         onChange={(e) => setEditProject({ ...editProject, description: e.target.value })}
//                       />
//                     </div>

//                     <button onClick={handleSaveEdit}>Save</button>
//                     <button onClick={() => setEditMode(null)}>Cancel</button>
//                   </div>
//                 ) : (
//                   <>
//                     {/* Project Card */}
//                     <ProjectCard project={project} />
//                     <button onClick={() => handleEditProject(project)}>Edit</button>
//                     <button onClick={() => handleDeleteProject(project._id)}>Delete Project</button>
//                     <button onClick={() => setShowCreateTaskForm(project._id)}>Add Task to Project</button>
                    
//                     {showCreateTaskForm === project._id && (
//                       <div>
//                         <h3>Create New Task for {project.name}</h3>
//                         <input
//                           type="text"
//                           placeholder="Title"
//                           value={newTask.title}
//                           onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//                         />
//                         <textarea
//                           placeholder="Notes"
//                           value={newTask.notes}
//                           onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
//                         />
//                         <input
//                           type="text"
//                           placeholder="Items Required (comma-separated)"
//                           value={newTask.itemsRequired.join(', ')}
//                           onChange={(e) =>
//                             setNewTask({
//                               ...newTask,
//                               itemsRequired: e.target.value.split(',').map((item) => item.trim())
//                             })
//                           }
//                         />
//                         <input
//                           type="text"
//                           placeholder="Cost"
//                           value={newTask.cost}
//                           onChange={(e) => setNewTask({ ...newTask, cost: e.target.value })}
//                         />
//                         <input
//                           type="text"
//                           placeholder="Category"
//                           value={newTask.category}
//                           onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
//                         />
//                         <button onClick={() => handleCreateTaskAndAddToProject(project._id)}>Submit Task</button>
//                         <button onClick={() => setShowCreateTaskForm(null)}>Cancel</button>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>
//             ))}
//             <button onClick={() => setShowCreateForm(true)}>Create New Project</button>
//           </div>
//         )}

//         {showCreateForm && (
//           <div>
//             <h3>Create New Project</h3>
//             <input
//               type="text"
//               placeholder="Name"
//               value={newProject.name}
//               onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
//             />
//             <textarea
//               placeholder="Description"
//               value={newProject.description}
//               onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
//             />
//             <button onClick={handleCreateProject}>Submit</button>
//             <button onClick={() => setShowCreateForm(false)}>Cancel</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Projects;

return (
  <div className="min-h-screen bg-white flex flex-col items-center py-10">
    <h1 className="text-6xl font-bold text-blue-900 mb-12">Your Projects</h1>

    {error && <div className="text-red-500">Error: {error}</div>}
    {loading ? (
      <div>Loading projects...</div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {projects.map((project) => (
          <div key={project._id} className="bg-gray-100 rounded-lg shadow-lg p-6">
            {editMode === project._id ? (
              <div>
                <input
                  type="text"
                  className="w-full p-2 mb-2 border border-gray-300 rounded"
                  value={editProject.name}
                  onChange={(e) => setEditProject({ ...editProject, name: e.target.value })}
                />
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  value={editProject.description}
                  onChange={(e) => setEditProject({ ...editProject, description: e.target.value })}
                />
                <button
                  onClick={handleSaveEdit}
                  className="bg-green-500 text-white p-2 mt-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditMode(null)}
                  className="ml-2 bg-gray-400 text-white p-2 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <ProjectCard project={project} />
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => handleEditProject(project)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setShowCreateTaskForm(project._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Add Task
                  </button>
                </div>
              </>
            )}

            {showCreateTaskForm === project._id && (
              <div className="mt-4 p-4 bg-white border border-gray-300 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Create New Task for {project.name}</h3>
                <input
                  type="text"
                  placeholder="Title"
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
                <textarea
                  placeholder="Notes"
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  value={newTask.notes}
                  onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Items Required (comma-separated)"
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  value={newTask.itemsRequired.join(', ')}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      itemsRequired: e.target.value.split(',').map((item) => item.trim())
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Cost"
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  value={newTask.cost}
                  onChange={(e) => setNewTask({ ...newTask, cost: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Category"
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  value={newTask.category}
                  onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                />
                <button
                  onClick={() => handleCreateTaskAndAddToProject(project._id)}
                  className="bg-green-500 text-white p-2 mt-2 rounded w-full"
                >
                  Submit Task
                </button>
                <button
                  onClick={() => setShowCreateTaskForm(null)}
                  className="bg-gray-400 text-white p-2 mt-2 rounded w-full"
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Display Tasks in Project */}
            <div className="mt-4">
              {project.tasks && project.tasks.length > 0 ? (
                project.tasks.map((task) => <TaskCard key={task._id} task={task} />)
              ) : (
                <p className="text-gray-600">No tasks in this project.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Floating "Create Project" Button */}
    <button
      onClick={() => setShowCreateForm(true)}
      className="fixed bottom-6 right-6 flex items-center justify-center gap-4 p-6 rounded-full shadow-lg transition-all 
      bg-blue-500 hover:bg-blue-700 text-white w-16 h-16"
    >
      <span className="material-symbols-outlined text-3xl">add</span>
    </button>
  </div>
);
};

export default Projects;