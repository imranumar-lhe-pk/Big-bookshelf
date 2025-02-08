// pages/AllDetail.js
'use client';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import NavBar from '../LandingPage/NavBar'; // Adjust path if necessary
import ProductDetails from './ProductDetails'; // Adjust path if necessary

function AllDetail() {
 
  return (
    <Box>
      <NavBar />
      <ProductDetails  />
    </Box>
  );
}

export default AllDetail;
