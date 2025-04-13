// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import TaskForm from '../components/TaskForm';
// import TaskList from '../components/Tasklist';
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   const [tasks, setTasks] = useState([]);
//   const navigate = useNavigate();

//   const fetchTasks = async () => {
//     const username = localStorage.getItem('username');
//     if (!username) {
//       navigate('/login');
//       return;
//     }
//     try {
//       const res = await axios.post('http://localhost:5000/api/tasks/view', { username });
//       setTasks(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   return (
//     <div className="home">
//       <h1>Task Manager</h1>
//       <button
//         onClick={() => {
//           localStorage.removeItem('username');
//           navigate('/login');
//         }}
//         className="logout-btn"
//       >
//         Logout
//       </button>
//       <TaskForm fetchTasks={fetchTasks} />
//       <TaskList tasks={tasks} fetchTasks={fetchTasks} />
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/Tasklist';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const username = localStorage.getItem('username');
    if (!username) {
      navigate('/login');
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/tasks/view', { username });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]); // Add fetchTasks as a dependency

  return (
    <div className="home">
      <h1>Task Manager</h1>
      <button
        onClick={() => {
          localStorage.removeItem('username');
          navigate('/login');
        }}
        className="logout-btn"
      >
        Logout
      </button>
      <TaskForm fetchTasks={fetchTasks} />
      <TaskList tasks={tasks} fetchTasks={fetchTasks} />
    </div>
  );
};

export default Home;