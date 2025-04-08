import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import '../styles/ProjectDetails.css';

const ProjectDetails = ({ projects, addTask, loading }) => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  
  // Find the project from the projects array
  useEffect(() => {
    if (projects.length > 0) {
      const foundProject = projects.find(p => p.id === parseInt(projectId));
      if (foundProject) {
        setProject(foundProject);
      } else {
        // Project not found
        navigate('/'); // Redirect to project list
      }
    }
  }, [projectId, projects, navigate]);

  if (loading || !project) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading project details...</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate project duration in days
  const calculateDuration = () => {
    const start = new Date(project.startDate);
    const end = new Date(project.endDate);
    const durationMs = end - start;
    return Math.ceil(durationMs / (1000 * 60 * 60 * 24)); // Convert ms to days
  };

  // Calculate project progress based on dates
  const calculateProgress = () => {
    const now = new Date();
    const start = new Date(project.startDate);
    const end = new Date(project.endDate);
    
    if (now < start) return 0;
    if (now > end) return 100;
    
    const total = end - start;
    const current = now - start;
    return Math.round((current / total) * 100);
  };

  // Get project status
  const getProjectStatus = () => {
    const now = new Date();
    const start = new Date(project.startDate);
    const end = new Date(project.endDate);
    
    if (now < start) return "Not Started";
    if (now > end) return "Completed";
    return "In Progress";
  };

  // Handle task creation
  const handleAddTask = async (taskData) => {
    const result = await addTask(project.id, taskData);
    if (result.success) {
      setShowTaskForm(false);
    }
    return result;
  };

  return (
    <div className="project-details-container">
      <div className="back-link" onClick={() => navigate('/')}>
        &larr; Back to Projects
      </div>
      
      <div className="project-header">
        <h2>{project.name}</h2>
        <div className="project-status-badge">
          <span className={`status-indicator status-${getProjectStatus().toLowerCase().replace(' ', '-')}`}>
            {getProjectStatus()}
          </span>
        </div>
      </div>
      
      <div className="project-info">
        <div className="info-card">
          <h4>Project Duration</h4>
          <div className="date-range">
            <div className="date-item">
              <span className="date-label">From:</span>
              <span className="date-value">{formatDate(project.startDate)}</span>
            </div>
            <div className="date-item">
              <span className="date-label">To:</span>
              <span className="date-value">{formatDate(project.endDate)}</span>
            </div>
          </div>
          <div className="duration-days">{calculateDuration()} days total</div>
        </div>
        
        <div className="info-card">
          <h4>Project Progress</h4>
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
            <span className="progress-text">{calculateProgress()}% Complete</span>
          </div>
        </div>
      </div>
      
      <div className="tasks-section">
        <div className="section-header">
          <h3>Tasks</h3>
          <button 
            className="btn btn-primary"
            onClick={() => setShowTaskForm(!showTaskForm)}
          >
            {showTaskForm ? 'Cancel' : 'Add Task'}
          </button>
        </div>
        
        {showTaskForm && (
          <TaskForm 
            addTask={handleAddTask} 
            onCancel={() => setShowTaskForm(false)}
          />
        )}
        
        <TaskList tasks={project.tasks || []} />
      </div>
    </div>
  );
};

export default ProjectDetails;