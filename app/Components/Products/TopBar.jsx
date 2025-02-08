import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import { ProductsData } from '../../static/products'; // Import your data

const TopBar = () => {
  // Use ProductsData directly or set it in the state if needed
  const results = ProductsData; // Or use state if you fetch or modify data

  return (
    <Box 
      display="flex" 
      justifyContent="space-between" 
      alignItems="center" 
      bgcolor="#2A2C2E" // Set the background color
      padding="8px 16px" // Add some padding for better spacing
      color="#FFFFFF" // Ensure text is visible on dark background
      m={'2%'}
    >
      <Typography variant="h6">FILTER {results.length} results</Typography>

      <Box display="flex" gap="1px">
        <Button variant="outlined" color="inherit" endIcon={<ArrowDropDown />}>
          FEATURED
        </Button>
      </Box>
    </Box>
  );
};

export default TopBar;
