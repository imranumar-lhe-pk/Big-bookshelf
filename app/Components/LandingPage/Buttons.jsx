import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function Banner() {
  return (
    <Box display={'flex'} flexDirection={{xs:'column', md:'row'}} >
        <Card
      sx={{
        width: { xs: '90%', md: '35%' },
        height:'20vh',
        m:{sm: 4, xs:2},
        backgroundColor: '#2A2C2E',
        borderRadius: '16px',
        textAlign:'center',
        
      }}
    >
      <Typography
          color='#FFFFFF'
          fontFamily={'Clash Grotesk Variable'}
          fontSize={'32px'}
          fontWeight={500}
          letterSpacing={'0.25%'}
          lineHeight={'40px'} // Adjusted lineHeight for better readability
          mt={5}
        >
         DISCOUNTS
        </Typography>
    </Card>
        <Card
      sx={{
        width: { xs: '90%', md: '55%' },
        height:'20vh',
        m: {sm:4,xs:2},
        backgroundColor: '#2A2C2E',
        borderRadius: '16px',
        textAlign:'center',
        
      }}
    >
      <Typography
          color='#FFFFFF'
          fontFamily={'Clash Grotesk Variable'}
          fontSize={'32px'}
          fontWeight={500}
          letterSpacing={'0.25%'}
          lineHeight={'40px'} // Adjusted lineHeight for better readability
          mt={{xs:3, sm:5}}
          
        >
         THE BEST BOOKS FOR A GIFT
        </Typography>
    </Card>
    </Box>
  );
}

export default Banner;
