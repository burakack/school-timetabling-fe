import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { useNavigate } from "react-router-dom";



const Navbar = () => {
  const {  logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logout();
    navigate("/login");
  };


  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
          School Timetabling
        </Typography>

        <IconButton
          edge="end"
          color="inherit"
          aria-label="logout"
          onClick={handleLogoutClick}
        >
          <ExitToAppIcon />
        </IconButton>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
