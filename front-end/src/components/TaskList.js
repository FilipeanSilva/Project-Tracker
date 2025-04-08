import React from 'react';
import '../styles/TaskList.css';

const TaskList = ({ tasks }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="empty-tasks">
        <p>No tasks have been added to this project yet.</p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'to do':
        return 'status-todo';
      case 'in progress':
        return 'status-in-progress';
      case 'done':
        return 'status-done';
      default:
        return '';
    }
  };

  return (
    <div className="task-list">
      <div className="task-list-header">
        <div className="task-title-header">Task</div>
        <div className="task-status-header">Status</div>
      </div>
      
      {tasks.map(task => (
        <div key={task.id} className="task-item">
          <div className="task-title">
            {task.title}
          </div>
          <div className="task-status">
            <span className={`status-badge ${getStatusColor(task.status)}`}>
              {task.status || 'No Status'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;