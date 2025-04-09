import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function Banner() {
  return (
    <Card
      sx={{
        width: { xs: '95%', md: '90%' },
        m: { xs: 2, sm: 5 },
        ml: { sm: '5%' },
        backgroundColor: '#2A2C2E',
        borderRadius: '16px',
        position: 'relative',
        p: { xs: 2, sm: 3 },
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
        height: { xs: 'auto', md: '40vh' },
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', md: 'flex-start' },
          textAlign: { xs: 'center', md: 'left' },
          width: { xs: '100%', md: '50%' },
        }}
      >
        <Typography
          color='#FFFFFF'
          fontFamily='Clash Grotesk Variable'
          fontSize={{ xs: '22px', sm: '28px', md: '32px', lg: '36px' }}
          fontWeight={500}
          letterSpacing='0.25%'
          lineHeight='1.2'
          mb={2}
        >
          FIND SOMETHING TO READ
        </Typography>

        <Typography
          color='#FFFFFF'
          width={{ xs: '100%', sm: '80%', md: '80%' }}
          fontFamily='Literata'
          fontSize={{ xs: '14px', sm: '16px', md: '18px' }}
          fontWeight={300}
          letterSpacing='0.15%'
          lineHeight='1.5'
          mb={2}
        >
          Fancy something unusual and unpredictable? Funny or exciting? No problem. Check out the collections we have prepared for you.
        </Typography>
      </CardContent>

      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        sx={{ width: { xs: '100%', md: '50%' } }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={10} sm={8} md={6} lg={4}>
            <Card
              sx={{
                backgroundColor: '#F4CE47',
                borderRadius: '16px',
                ml: { md: 12, sm: 0 },
                height: { xs: '20vh', sm: '25vh' },
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                href='/books'
                fullWidth
                sx={{
                  color: '#2A2C2E',
                  height: '100%',
                  fontSize: { xs: '12px', sm: '14px', md: '16px' },
                  fontWeight: 'bold',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transition: 'background-color 0.3s ease, transform 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#e3b600',
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <ArrowDownwardIcon
                  sx={{
                    fontSize: { xs: '14vw', sm: '15vw', md: '6vw' },
                    transform: 'rotate(-45deg)',
                    mr: 1,
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
