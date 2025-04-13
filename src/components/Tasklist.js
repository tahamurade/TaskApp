import React from 'react';
import axios from 'axios';

const Tasklist = ({ tasks, fetchTasks }) => {
  const handleComplete = async (taskId) => {
    try {
      const username = localStorage.getItem('username');
      if (!username) {
        alert('Please log in to complete tasks.');
        return;
      }
      await axios.post('http://localhost:5000/api/tasks/complete', { taskId, username });
      fetchTasks();
    } catch (err) {
      console.error('Error completing task:', err);
      alert(err.response?.data?.message || 'Failed to complete task.');
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const username = localStorage.getItem('username');
      if (!username) {
        alert('Please log in to delete tasks.');
        return;
      }
      await axios.post('http://localhost:5000/api/tasks/delete', { taskId, username });
      fetchTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
      alert(err.response?.data?.message || 'Failed to delete task.');
    }
  };

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className={`task-card ${task.completed ? 'completed' : ''}`}>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <p>Created: {new Date(task.createdAt).toLocaleDateString()}</p>
          <div className="task-actions">
            {!task.completed && (
              <button onClick={() => handleComplete(task.id)}>Complete</button>
            )}
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tasklist;