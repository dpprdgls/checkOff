import React, { useEffect, useState } from 'react';

const Tasks = ({ match }) => {
  const [tasks, setTasks] = useState([]);
  const userId = match.params.id; // Extract userId from route params

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:4000/api/users/${userId}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setTasks(data);
    };

    fetchTasks();
  }, [userId]);

  return (
    <div>
      <h1>User's Tasks</h1>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>{task.title}</li>
          ))}
        </ul>
      ) : (
        <p>No tasks found</p>
      )}
    </div>
  );
};

export default Tasks;
