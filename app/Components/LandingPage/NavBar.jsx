'use client'

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Box, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import SaveIcon from '@mui/icons-material/Save';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Search" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SaveIcon />
          </ListItemIcon>
          <ListItemText primary="Save" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Cart" />
        </ListItem>
        <ListItem button>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', fontSize: '16px' }}>
            Books
          </Typography>
        </ListItem>
        <ListItem button>
          <Button variant="contained" sx={{ backgroundColor: '#F4CE47', color: '#2A2C2E', width: '100%' }}>
            Login
          </Button>
        </ListItem>
      </List>
    </Box>
  );

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
          <Box 
            component="img" 
            sx={{ height: { xs: '25px', sm: '35px' }, flexShrink: 0 }} 
            src="/logo.png" 
            alt="Logo"
          />

          {/* Hamburger Menu for Small Devices */}
          <IconButton 
            color="inherit" 
            aria-label="open drawer" 
            edge="end" 
            sx={{ display: { xs: 'block', sm: 'none' } }} 
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <Link  href="/books" passHref>
           <Typography 
            variant="h6" 
    
            component="a" // Change this to 'a' for an anchor tag
            sx={{ 
            flexGrow: 1, 
            textAlign: 'center', 
            fontSize: { xs: '16px', sm: '20px' },
             display: { xs: 'none', sm: 'block' },
             transition: 'color 0.3s ease, transform 0.3s ease', // Add transition for color and transform
             '&:hover': {
               color: '#F4CE47', // Change color on hover
               transform: 'scale(1.1)', // Slightly enlarge on hover
              },
            }}
            >
             Books
             </Typography>
           </Link>

          {/* Right side - Search, Save, Cart, Login */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1 }}>
            <IconButton color="inherit" size="small" sx={{ p: { xs: '6px', sm: '8px' } }}>
              <SearchIcon />
            </IconButton>
            <IconButton color="inherit" size="small" sx={{ p: { xs: '6px', sm: '8px' } }}>
              <SaveIcon />
            </IconButton>
            <IconButton color="inherit" size="small" sx={{ p: { xs: '6px', sm: '8px' } }}>
              <ShoppingCartIcon />
            </IconButton>
            <Button 
              variant="contained" 
              sx={{ 
                backgroundColor: '#F4CE47', 
                color: '#2A2C2E', 
                ml: { xs: 1, sm: 2 },
                fontSize: { xs: '12px', sm: '14px' },
                padding: { xs: '4px 8px', sm: '6px 12px' },
              }}
            >
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for Small Devices */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawerList()}
      </Drawer>

      {/* Image below the navbar */}
      <Box 
        component="img" 
        src="/H1.png" 
        sx={{ 
          width: { xs: '100%', sm: '95%' }, 
          mt: 2,
          height: 'auto',
        }} 
      />
    </Box>
  );
};

export default NavBar;
