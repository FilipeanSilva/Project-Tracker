import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = ({ onRemoveProjects }) => {
  return (
    <header className='header'>
      <div className='header-content'>
        <div className='logo'>
          <Link to='/'>
            <h1>ProjectTracker</h1>
          </Link>
        </div>
        <nav className='nav-menu'>
          <ul>
            <li>
              <Link to='/' className='nav-link'>
                Projects
              </Link>
            </li>
            <li>
              <Link to='/add-project' className='nav-link'>
                Add Project
              </Link>
            </li>
            <li>
              <button
                onClick={onRemoveProjects}
                className='nav-link remove-projects-btn'
              >
                Remove All Projects
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
