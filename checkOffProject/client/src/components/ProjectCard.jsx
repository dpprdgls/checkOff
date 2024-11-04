// src/components/ProjectCard.js

import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      {/* Display additional fields as needed */}
    </div>
  );
};

export default ProjectCard;