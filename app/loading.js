'use client'

import React from 'react';
import { Box, keyframes } from '@mui/material';

// Define the animation
const moving = keyframes`
  50% {
    width: 100%;
  }
  100% {
    width: 0;
    right: 0;
    left: unset;
  }
`;

const Loader = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',  // Full viewport height
    }}
  >
    <Box
      sx={{
        width: '130px',
        height: '4px',
        borderRadius: '30px',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          backgroundColor: '#2A2C2E',
          top: 0,
          left: 0,
          width: 0,
          height: '100%',
          borderRadius: '30px',
          animation: `${moving} 1s ease-in-out infinite`,
        },
      }}
    />
  </Box>
);

export default Loader;
