import React, { useState } from 'react';
import styles from './TaskCard.module.css'; // Ensure the correct CSS module filename

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
      
      {/* Display task notes or fallback to a placeholder if empty */}
      <div className={styles.taskCardDetails}>{task.notes || 'No notes available'}</div>

      {expanded && (
        <div className={styles.taskCardExpand}>
          <p>Notes: {task.notes || 'No notes available'}</p>
          <p>Items: {task.itemsRequired || 'No items listed'}</p>
          <p>Cost: {task.cost || 'No cost specified'}</p>
          <p>Category: {task.category || 'No category specified'}</p>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
