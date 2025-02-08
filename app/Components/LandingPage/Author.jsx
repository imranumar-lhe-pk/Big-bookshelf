'use client'

import React, { useEffect, useState, useRef } from 'react';
import { Box, Grid, Typography, Card, CardContent, IconButton, Button } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Bestsellers = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing after first trigger
        }
      },
      { threshold: 0.01 } // Trigger when 10% of the component is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const books = [
    {
      title: '20 books',
      author: 'Murakami',
      image: '/aurthor.png',
    },
    {
      title: '10 books',
      author: 'Mario Puzo',
      image: '/aurthoe(2).png',
    },
    {
      title: '40 books',
      author: 'Daniel Gargallo',
      image: '/aurthor(3).png',
    },
    {
      title: '3 books',
      author: 'Erik Spiekermann',
      image: '/aurthor(4).png',
    },
    {
      title: '10 books',
      author: 'Patrick Ness',
      image: '/aurthor(5).png',
    },
  ];

  return (
    <Box 
      ref={ref}
      sx={{ 
        backgroundColor: '#2A2C2E', 
        p: 4, 
        width: { xs: '90%', sm: '95%' }, 
        m: { sm: 4, xs: 2 }, 
        borderRadius: '8px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out',
      }}
    >
      <Typography variant="h6" color="white" mb={3} fontWeight={'bold'} fontSize={'24px'} ml={1}>
        Popular Authors
      </Typography>
      <Grid container spacing={2}>
        {books.map((book, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ 
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity 0.8s ${0.1 * index}s ease-in-out, transform 0.8s ${0.1 * index}s ease-in-out`,
          }}>
            <Card sx={{ 
              backgroundColor: 'white', 
              borderRadius: '16px', 
              color: 'white', 
              height: '100%', 
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
                <Box 
                  component="img" 
                  src={book.image} 
                  alt={book.title} 
                  sx={{ 
                    width: { xs: '40%', sm: '30%' }, 
                    height: 'auto', 
                    borderRadius: '8px',
                    transition: 'transform 0.3s ease-in-out',
                  }} 
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1, ml: 2 }}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold" color={'#2A2C2E'} mt={2}>
                      {book.author}
                    </Typography>
                    <Typography variant="h6" color={'#2A2C2E'}>
                      {book.title}
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
        <Grid item xs={12} sm={6} md={4} sx={{ 
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: `opacity 0.8s ${0.1 * books.length}s ease-in-out, transform 0.8s ${0.1 * books.length}s ease-in-out`,
        }}>
          <Card sx={{ 
            backgroundColor: '#F4CE47', 
            borderRadius: '16px', 
            height: '100%', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}>
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
