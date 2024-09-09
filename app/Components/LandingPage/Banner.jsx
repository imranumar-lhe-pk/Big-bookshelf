import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function Banner() {
  return (
    <Card
      sx={{
        width: { xs: '90%', md: '95%' },
        m: { xs: 2, sm: 5 }, // Responsive margin
        backgroundColor: '#2A2C2E',
        borderRadius: '16px',
        position: 'relative',
        p: { xs: 2, sm: 3 }, // Responsive padding
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' }, // Stack vertically on small screens, horizontally on medium and up
        justifyContent: 'space-between',
        alignItems: 'center',
        height: { xs: 'auto', md: '40vh' }, // Set a minimum height for the banner
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', md: 'flex-start' }, // Center on small screens, left-align on medium and up
          textAlign: { xs: 'center', md: 'left' }, // Center align text on small screens
        }}
      >
        <Typography
          color='#FFFFFF'
          fontFamily={'Clash Grotesk Variable'}
          fontSize={{ xs: '24px', sm: '28px', md: '32px' }} // Responsive font size
          fontWeight={500}
          letterSpacing={'0.25%'}
          lineHeight={'1.2'}
          mb={2} // Margin bottom for spacing
        >
          FIND SOMETHING TO READ
        </Typography>

        <Typography
          color='#FFFFFF'
          width={{ xs: '100%', sm: '80%', md: '60%' }} // Responsive width
          fontFamily={'Literata'}
          fontSize={{ xs: '14px', sm: '16px' }} // Responsive font size
          fontWeight={300}
          letterSpacing={'0.15%'}
          lineHeight={'1.5'}
          mb={2} // Margin bottom for spacing
        >
          Fancy something unusual and unpredictable? Funny or exciting? No problem. Check out the collections we have prepared for you.
        </Typography>
      </CardContent>

      <Box 
        display={'flex'} 
        justifyContent={'center'} 
        alignItems={'center'}
        sx={{ mt: { xs: 2, md: 0 } }} // Margin top on small screens
      >
        <Grid container justifyContent="center">
          <Grid item xs={8} sm={6} md={12}>
            <Card
              sx={{
                backgroundColor: '#F4CE47',
                borderRadius: '16px',
                height: '25vh', // Adjusted height for the button card
                width:{sm:'20vw', xs:'40vw'},
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                fullWidth
                sx={{
                  color: '#2A2C2E',
                  height: '100%',
                  fontSize: { xs: '12px', sm: '14px' }, // Responsive font size
                  fontWeight: 'bold',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <ArrowDownwardIcon
                  sx={{
                    fontSize: { xs: '24vw', sm: '8vw' }, // Responsive icon size
                    transform: 'rotate(-45deg)', // Rotate icon slightly
                    mr: 1, // Margin right for spacing between icon and text
                  }}
                />
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

export default Banner;
