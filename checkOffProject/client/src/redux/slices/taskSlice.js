import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from './path/to/taskSlice'; // Adjust path to taskSlice

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Assuming user ID is stored after login
    dispatch(fetchTasks(userId)); // Pass the user ID to fetch tasks
  }, [dispatch]);

  return (
    <div>
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
