import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'primary.main', 
        color: 'white', 
        padding: '1rem',
        position: 'fixed',
        bottom: 0,
        width: '100%'
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
