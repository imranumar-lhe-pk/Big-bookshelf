'use client';
import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  IconButton,
  Divider,
} from '@mui/material';
import { FaRegBookmark, FaTrashAlt } from 'react-icons/fa'; // Trash icon for removing
import { MdRemoveShoppingCart } from 'react-icons/md'; // Remove from cart icon

const ItemSidebar = ({ open, onClose, items, removeItem, type }) => {
  const isBookmark = type === 'bookmark'; // Check if it is a bookmark or cart

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: { xs: '80%', sm: 300 } }} role="presentation" onClick={onClose} onKeyDown={onClose}>
        <Typography variant="h6" p={2} fontWeight={'bold'}>
          {isBookmark ? 'Bookmarks' : 'Cart'}
        </Typography>
        <Divider orientation="horizontal" variant="middle" />
        <List sx={{ mt: 2 }}>
          {items.length > 0 ? (
            items.map((item, index) => (
              <ListItem key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '50px', height: '75px', borderRadius: '8px' }}
                  />
                </ListItemIcon>
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <ListItemText
                    primary={
                      <Typography variant="body1" fontWeight="bold" noWrap>
                        {item.title}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="body2" noWrap>
                          {item.author}
                        </Typography>
                        <Typography variant="body2" noWrap>
                          {item.priceNew}
                        </Typography>
                        {isBookmark ? (
                          <Button
                            href="/payment"
                            size="small"
                            sx={{
                              marginTop: 1,
                              backgroundColor: '#2A2C2E',
                              color: 'white',
                              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
                            }}
                          >
                            Buy Now
                          </Button>
                        ) : (
                          <Typography variant="body2" sx={{ marginTop: 1 }}>
                            Quantity: {item.quantity}
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                  <Divider orientation="horizontal" variant="fullWidth" sx={{ mt: 1 }} />
                </Box>
                <IconButton
                  onClick={() => removeItem(item.id)} // Handle removal
                  sx={{ ml: 1, color: 'red' }}
                >
                  {isBookmark ? <FaTrashAlt /> : <MdRemoveShoppingCart />} {/* Conditional icon */}
                </IconButton>
              </ListItem>
            ))
          ) : (
            <ListItem>No {isBookmark ? 'bookmarks' : 'cart items'} yet</ListItem>
          )}
        </List>
      </Box>
    </Drawer>
  );
};

export default ItemSidebar;
