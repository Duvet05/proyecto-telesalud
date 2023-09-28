import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
const SidebarToggleButton = ({ toggleSidebar }) => {
  /* const buttonLabel = isSidebarOpen ? 'Close' : 'Open'; */

  return (
    <IconButton onClick={toggleSidebar} >
      <MenuIcon/>
    </IconButton>
  );
};

SidebarToggleButton.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default SidebarToggleButton;
