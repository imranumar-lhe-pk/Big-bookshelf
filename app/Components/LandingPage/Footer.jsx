import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import { Box } from '@mui/material';
import React from 'react';

function Footer() {
  return (
    <Box 
      sx={{ 
        backgroundColor: '#2A2C2E', 
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'center', // Align items vertically centered
        ml: {sm:4, xs:0},
        width: { xs: '100%', sm: '95%' }, 
        height: '12vh',
        mt: 3, 
        border: '1px solid #ccc',
        padding: { xs: '8px 16px', sm: '16px 32px' }, // Adjust padding for small devices
      }}
    >
      <Box 
        component="img" 
        sx={{ 
          height: { xs: '25px', sm: '35px' }, 
          flexShrink: 0,
          mr: { xs: 1, sm: 2 }, // Add right margin to the image
        }} 
        src="/logo.png" 
        alt="Logo"
      />
      <Box 
        sx={{
          display: 'flex',
          gap: { xs: '8px', sm: '16px' }, // Add gap between icons
          alignItems: 'center',
          color:'white'
        }}
      >
        <Instagram sx={{ fontSize: { xs: '20px', sm: '24px' } }} />
        <Facebook sx={{ fontSize: { xs: '20px', sm: '24px' } }} />
        <Twitter sx={{ fontSize: { xs: '20px', sm: '24px' } }} />
      </Box>
    </Box>
  );
}

export default Footer;
