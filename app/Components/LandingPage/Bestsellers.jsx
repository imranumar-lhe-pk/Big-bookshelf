import React from 'react';
import { Box, Grid, Typography, Card, CardContent, IconButton, Button } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Bestsellers = () => {
  // Dummy data for the books
  const books = [
    {
      title: 'After Dark',
      author: 'Murakami',
      priceOld: '$15.50',
      priceNew: '$10.50',
      rating: 4.0,
      reviews: 1000,
      image: '/murakami.png', // replace with your actual image path
    },
    {
      title: 'The Godfather',
      author: 'Mario Puzo',
      priceOld: '',
      priceNew: '$14.50',
      rating: 4.8,
      reviews: 825,
      image: '/godfather.png', // replace with your actual image path
    },
    {
      title: 'She Beyond Sun',
      author: 'Daniel Gargallo',
      priceOld: '$19.50',
      priceNew: '$15.00',
      rating: 4.6,
      reviews: 165,
      image: '/beyound.png', // replace with your actual image path
    },
    {
      title: 'Hello I am Erik',
      author: 'Erik Spiekermann',
      priceOld: '$15.50',
      priceNew: '$10.50',
      rating: 4.5,
      reviews: 120,
      image: '/erik.png', // replace with your actual image path
    },
    {
      title: 'More Than This',
      author: 'Patrick Ness',
      priceOld: '',
      priceNew: '$20.00',
      rating: 4.4,
      reviews: 428,
      image: '/more.png', // replace with your actual image path
    },
  ];

  return (
    <Box sx={{ backgroundColor: '#2A2C2E', p: 4, width:{xs:'90%', sm:'95%'}, m:{sm:4, xs:2} }}>
      <Typography variant="h6" color="white" mb={3}>
        BESTSELLERS
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
                    <Typography variant="subtitle1" color={'#2A2C2E'} mt={2}>
                      {book.author}
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" color={'#2A2C2E'} >
                      {book.title}
                    </Typography>
                    <Box display="flex" alignItems="center" mt={1} >
                      <Typography variant="body2" color="grey">
                        {book.rating}
                      </Typography>
                      <Typography variant="body2" color="grey" ml={1}>
                        ({book.reviews} reviews)
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mt={1} color={'#2A2C2E'}>
                      {book.priceOld && (
                        <Typography variant="body2" color="grey" sx={{ textDecoration: 'line-through' }}>
                          {book.priceOld}
                        </Typography>
                      )}
                      <Typography variant="h6" ml={1} color={'#2A2C2E'}>
                        {book.priceNew}
                      </Typography>
                    </Box>
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
