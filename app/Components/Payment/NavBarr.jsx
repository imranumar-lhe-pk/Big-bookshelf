'use client'

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Box, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import SaveIcon from '@mui/icons-material/Save';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';

const NavBarr = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

 

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <AppBar 
        position="static" 
        sx={{ 
          backgroundColor: '#2A2C2E', 
          borderRadius: '10px', 
          width: { xs: '100%', sm: '95%' }, 
          mt: 2, 
          border: '1px solid #ccc',
          padding: { xs: '0 8px', sm: '0 16px' },
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Left side - Logo */}
          <Link href='/'>
         <Box 
            component="img" 
            sx={{ height: { xs: '25px', sm: '35px' }, flexShrink: 0 }} 
            src="/logo.png" 
            alt="Logo"
          />
         </Link>

       
        </Toolbar>
      </AppBar>

      {/* Drawer for Small Devices */}
    

    </Box>
  );
};

export default NavBarr;
