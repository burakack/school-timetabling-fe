import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
          School Timetabling
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
