import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const TopBar = () => {
  return (
    <Box 
      display="flex" 
      justifyContent="space-between" 
      alignItems="center" 
      bgcolor="#2A2C2E" // Set the background color
      padding="8px 16px" // Add some padding for better spacing
      color="#FFFFFF" // Ensure text is visible on dark background
    >
      <Typography variant="h6">FILTER 120 results</Typography>

      {/* Replace these with the correct elements from your design */}
      <Box display="flex" gap="16px">
        <Button variant="outlined" color="inherit">Reset all</Button>
        <Button variant="outlined" color="inherit">Option 1</Button>
        <Button variant="outlined" color="inherit">Option 2</Button>
        <Button variant="outlined" color="inherit">Option 3</Button>
        <Button variant="contained" color="inherit" endIcon={<YourDropdownIcon />}>FEATURED</Button>
      </Box>
    </Box>
  );
};

export default TopBar;
