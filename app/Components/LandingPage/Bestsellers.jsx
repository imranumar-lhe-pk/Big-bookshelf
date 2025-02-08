'use client';

import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import BestSellerProd from './BestSellerProd';

const Bestsellers = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true); // Trigger animation when the component mounts
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: '#2A2C2E',
        p: 4,
        width: { xs: '90%', sm: '97%' },
        m: { sm: 2, xs: 2 },
        borderRadius: '8px',
        opacity: isAnimated ? 1 : 0,
        transform: isAnimated ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out',
      }}
    >
      <Typography variant="h6" color="white" mb={3} fontWeight='bold' fontSize='24px' ml={1}>
        BESTSELLERS
      </Typography>
      <Grid container spacing={2}>
        <BestSellerProd />
      </Grid>
    </Box>
  );
};

export default Bestsellers;
