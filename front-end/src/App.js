import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import AppRouter from './Router';
import './styles/App.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dynamic backend selection based on environment
  const getBackendBaseUrl = () => {
    const local = `http://localhost:${process.env.REACT_APP_PORT_BE || 5070}`;
    const prod = 'https://project-tracker-9k0g.onrender.com';
    return window.location.hostname === 'localhost' ? local : prod;
  };

  // Fetch projects from backend
  const fetchProjects = useCallback(async () => {
    const BACKEND_BASE_URL = getBackendBaseUrl();
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/projects`);
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
        setError(null);
      } else {
        setError('Failed to fetch projects. Please try again later.');
      }
    } catch (error) {
      setError(
        'Connection error. Please check if the backend server is running.'
      );
      console.error('Connection error:', error);
    } finally {
      setLoading(false);
    }
  }, []); // no more dynamic dependencies

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Add new project
  const addProject = async (projectData) => {
    const BACKEND_BASE_URL = getBackendBaseUrl();
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        await fetchProjects();
        return { success: true };
      } else {
        return {
          success: false,
          error: 'Failed to create project. Please try again.',
        };
      }
    } catch (error) {
      console.error('Error adding project:', error);
      return {
        success: false,
        error:
          'Connection error. Please check if the backend server is running.',
      };
    }
  };

  // Add new task to a project
  const addTask = async (projectId, taskData) => {
    const BACKEND_BASE_URL = getBackendBaseUrl();
    try {
      const response = await fetch(
        `${BACKEND_BASE_URL}/api/projects/${projectId}/tasks`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taskData),
        }
      );

      if (response.ok) {
        await fetchProjects();
        return { success: true };
      } else {
        return {
          success: false,
          error: 'Failed to create task. Please try again.',
        };
      }
    } catch (error) {
      console.error('Error adding task:', error);
      return {
        success: false,
        error:
          'Connection error. Please check if the backend server is running.',
      };
    }
  };

  //Remove all projects
  const removeProjects = async () => {
    const BACKEND_BASE_URL = getBackendBaseUrl();
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        await fetchProjects();
        return { success: true };
      } else {
        return {
          success: false,
          error: 'Failed to reset projects. Please try again.',
        };
      }
    } catch (error) {
      console.error('Error resetting projects:', error);
      return {
        success: false,
        error:
          'Connection error. Please check if the backend server is running.',
      };
    }
  };

  return (
    <div className='app-container'>
      <Header onRemoveProjects={removeProjects} />
      {error && <div className='error-message'>{error}</div>}
      <AppRouter
        projects={projects}
        loading={loading}
        refreshProjects={fetchProjects}
        addProject={addProject}
        addTask={addTask}
      />
      <footer className='app-footer'>
        <p>© 2025 Filipe Silva</p>
      </footer>
    </div>
  );
}

export default App;