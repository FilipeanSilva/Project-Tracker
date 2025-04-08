import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
import ProjectDetails from './components/ProjectDetails';

const AppRouter = ({
  projects,
  loading,
  refreshProjects,
  addProject,
  addTask,
}) => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <ProjectList
            projects={projects}
            loading={loading}
            refreshProjects={refreshProjects}
          />
        }
      />
      <Route
        path='/add-project'
        element={<ProjectForm addProject={addProject} />}
      />
      <Route
        path='/projects/:projectId'
        element={
          <ProjectDetails
            projects={projects}
            addTask={addTask}
            loading={loading}
          />
        }
      />
    </Routes>
  );
};

export default AppRouter;
