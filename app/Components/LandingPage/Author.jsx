import React from 'react';
import { Box, Grid, Typography, Card, CardContent, IconButton, Button } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Bestsellers = () => {
  // Dummy data for the books
  const books = [
    {
      title: '20',
      author: 'Murakami',
    
      image: '/aurthor.png', // replace with your actual image path
    },
    {
      title: '10',
      author: 'Mario Puzo',
     
      image: '/aurthoe(2).png', // replace with your actual image path
    },
    {
      title: '40',
      author: 'Daniel Gargallo',
    
      image: '/aurthor(3).png', // replace with your actual image path
    },
    {
      title: '3',
      author: 'Erik Spiekermann',
      
      image: '/aurthor(4).png', // replace with your actual image path
    },
    {
      title: '10',
      author: 'Patrick Ness',
     
      image: '/aurthor(5).png', // replace with your actual image path
    },
  ];

  return (
    <Box sx={{ backgroundColor: '#2A2C2E', p: 4, width:{xs:'90%', sm:'95%'}, m:{sm:4, xs:2} }}>
      <Typography variant="h6" color="white" mb={3}>
        Aurthor
      </Typography>
      <Grid container spacing={2}>
        {books.map((book, index) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={index} >
            <Card sx={{ backgroundColor: 'white', borderRadius: '16px', color: 'white', height: '100%' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
                <Box 
                  component="img" 
                  src={book.image} 
                  alt={book.title} 
                  sx={{ width: '40%', height: 'auto', borderRadius: '8px' }} 
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1, ml: 2 }}>
                  <Box>
                    <Typography variant="h6" color={'#2A2C2E'} >
                      {book.title}
                    </Typography>
                        <Typography variant="subtitle1"  fontWeight="bold" color={'#2A2C2E'} mt={2}>
                        {book.author}
                        </Typography>
                    
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton sx={{ color: 'black' }}>
                      <FavoriteBorderIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Card sx={{ backgroundColor: '#F4CE47', borderRadius: '16px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button fullWidth sx={{ color: '#2A2C2E', height: '100%', fontSize: '18px', fontWeight: 'bold' }}>
              SEE ALL
            </Button>
          </Card>
        </Grid>
      </Grid>
      
    </Box>
  );
};

export default Bestsellers;
