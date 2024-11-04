// src/components/ProjectList.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../redux/actions/projectActions';
import ProjectCard from './ProjectCard';

const ProjectList = () => {
  const dispatch = useDispatch();
  const projects = useSelector(state => state.projects.projects || []); // Fallback to an empty array if undefined
  const loading = useSelector(state => state.projects.loading);
  const error = useSelector(state => state.projects.error);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>Error loading projects: {error}</p>;

  return (
    <div className="project-list">
      {projects.map(project => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;