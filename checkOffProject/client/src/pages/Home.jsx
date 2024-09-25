import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import TaskCard from '../components/TaskCard';

const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      notes
      itemsRequired
      cost
      category
    }
  }
`;

const Home = () => {
  const { data, loading, error } = useQuery(GET_TASKS);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (data) {
      setTasks(data.tasks);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching tasks</div>;

  return (
    <div>
      <h1>Your Projects</h1>
      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Home;