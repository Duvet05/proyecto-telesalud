import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const SidebarToggleButton = ({ isSidebarOpen, toggleSidebar }) => {
  const buttonLabel = isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar';

  return (
    <button onClick={toggleSidebar} className="sidebar-toggle-button">
      {buttonLabel}
    </button>
  );
};

SidebarToggleButton.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default SidebarToggleButton;
