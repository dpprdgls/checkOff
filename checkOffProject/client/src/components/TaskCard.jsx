import React, { useState } from 'react';
import styles from './TaskCard.modules.css';


const TaskCard = ({ task }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div 
      className={`${styles.taskCard} ${expanded ? styles.taskCardExpanded : ''}`} 
      onClick={handleToggleExpand}
    >
      <div className={styles.taskCardTitle}>{task.title}</div>
      <div className={styles.taskCardDetails}>{task.description}</div>

      {expanded && (
        <div className={styles.taskCardExpand}>
          <p>Notes: {task.notes}</p>
          <p>Items: {task.items}</p>
          <p>Cost: {task.cost}</p>
          <p>Category: {task.category}</p>
        </div>
      )}
    </div>
  );
};

export default TaskCard;