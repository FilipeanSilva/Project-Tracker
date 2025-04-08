import React, { useState } from 'react';
import '../styles/TaskForm.css';

const TaskForm = ({ addTask, onCancel }) => {
  const [formData, setFormData] = useState({
    Title: '',
    Status: 'To Do'
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
    
    // Validate Title
    if (!formData.Title.trim()) {
      newErrors.Title = 'Task title is required';
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
      const result = await addTask(formData);
      
      if (!result.success) {
        setErrors({ form: result.error || 'Failed to create task' });
      } else {
        // Reset form on success
        setFormData({
          Title: '',
          Status: 'To Do'
        });
      }
    } catch (error) {
      setErrors({ form: 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="task-form-container">
      <h4>Add New Task</h4>
      
      {errors.form && (
        <div className="error-message">{errors.form}</div>
      )}
      
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Task Title</label>
            <input
              type="text"
              id="title"
              name="Title"
              value={formData.Title}
              onChange={handleChange}
              className={errors.Title ? 'input-error' : ''}
              disabled={isSubmitting}
              placeholder="Enter task title"
            />
            {errors.Title && <div className="error-text">{errors.Title}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="Status"
              value={formData.Status}
              onChange={handleChange}
              disabled={isSubmitting}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;