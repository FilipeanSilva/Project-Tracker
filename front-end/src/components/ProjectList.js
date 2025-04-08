import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProjectList.css';

const ProjectList = ({ projects, loading, refreshProjects }) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading projects...</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="empty-state">
        <h2>No Projects Found</h2>
        <p>Get started by adding your first project.</p>
        <Link to="/add-project" className="btn btn-primary">Add Project</Link>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate project status based on dates
  const getProjectStatus = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (now < start) return "Not Started";
    if (now > end) return "Completed";
    return "In Progress";
  };

  // Calculate progress percentage
  const calculateProgress = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (now < start) return 0;
    if (now > end) return 100;
    
    const total = end - start;
    const current = now - start;
    return Math.round((current / total) * 100);
  };

  return (
    <div className="project-list-container">
      <div className="project-list-header">
        <h2>Projects</h2>
        <Link to="/add-project" className="btn btn-primary">Add Project</Link>
      </div>
      
      <div className="project-cards">
        {projects.map(project => {
          const status = getProjectStatus(project.startDate, project.endDate);
          const progress = calculateProgress(project.startDate, project.endDate);
          const taskCount = project.tasks ? project.tasks.length : 0;
          
          return (
            <div key={project.id} className="project-card">
              <h3 className="project-title">{project.name}</h3>
              
              <div className="project-dates">
                <div>
                  <span className="date-label">Start:</span> {formatDate(project.startDate)}
                </div>
                <div>
                  <span className="date-label">End:</span> {formatDate(project.endDate)}
                </div>
              </div>
              
              <div className="project-status">
                <span className={`status-badge status-${status.toLowerCase().replace(' ', '-')}`}>
                  {status}
                </span>
              </div>
              
              <div className="progress-container">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className="progress-text">{progress}%</span>
              </div>
              
              <div className="project-stats">
                <span className="task-count">
                  <i className="fas fa-tasks"></i> {taskCount} Tasks
                </span>
              </div>
              
              <Link to={`/projects/${project.id}`} className="btn btn-secondary">
                View Details
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectList;
