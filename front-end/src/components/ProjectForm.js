import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProjectForm.css';

const ProjectForm = ({ addProject }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: '',
    StartDate: '',
    EndDate: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user makes changes
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate Name
    if (!formData.Name.trim()) {
      newErrors.Name = 'Project name is required';
    }
    
    // Validate Start Date
    if (!formData.StartDate) {
      newErrors.StartDate = 'Start date is required';
    }
    
    // Validate End Date
    if (!formData.EndDate) {
      newErrors.EndDate = 'End date is required';
    } else if (formData.StartDate && new Date(formData.EndDate) < new Date(formData.StartDate)) {
      newErrors.EndDate = 'End date must be after start date';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await addProject(formData);
      
      if (result.success) {
        navigate('/');
      } else {
        setErrors({ form: result.error || 'Failed to create project' });
      }
    } catch (error) {
      setErrors({ form: 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="project-form-container">
      <h2>Create New Project</h2>
      
      {errors.form && (
        <div className="error-message">{errors.form}</div>
      )}
      
      <form onSubmit={handleSubmit} className="project-form">
        <div className="form-group">
          <label htmlFor="name">Project Name</label>
          <input
            type="text"
            id="name"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            className={errors.Name ? 'input-error' : ''}
            disabled={isSubmitting}
          />
          {errors.Name && <div className="error-text">{errors.Name}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="StartDate"
            value={formData.StartDate}
            onChange={handleChange}
            className={errors.StartDate ? 'input-error' : ''}
            disabled={isSubmitting}
          />
          {errors.StartDate && <div className="error-text">{errors.StartDate}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            name="EndDate"
            value={formData.EndDate}
            onChange={handleChange}
            className={errors.EndDate ? 'input-error' : ''}
            disabled={isSubmitting}
          />
          {errors.EndDate && <div className="error-text">{errors.EndDate}</div>}
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/')}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Project'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
