import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import React from 'react'

function Cards() {
  return (
    <Box display={'flex'} justifyContent={'center'} gap={4} flexWrap={{ xs: 'wrap', md: 'nowrap' }} >
      <Card sx={{ width: { xs: '100%', md: '40%' }, mt: 5, backgroundColor: '#2A2C2E', borderRadius: '16px', position: 'relative' }}>
        <CardContent>
          <Typography color='#FFFFFF' fontFamily={'Clash Grotesk Variable'} fontSize={"32"} fontWeight={500}
            letterSpacing={"0.25%"} lineHeight={"20px"} mt={2}>
            FIND SOMETHING
          </Typography>
          <Typography color='#FFFFFF' fontFamily={'Clash Grotesk Variable'} fontSize={"32"} fontWeight={500}>
            TO READ
          </Typography>
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Typography color='#FFFFFF' width={{ xs: '100%', sm: '70%' }} fontFamily={'Literata'} fontSize={"16px"} fontWeight={300}
              letterSpacing={"0.15%"} lineHeight={"24px"} mt={1}>
              Fancy something unusual and unpredictable? Funny or exciting? No problem. Check out the collections we have prepared for you.
            </Typography>
          </Box>
        </CardContent>
        <Box
          component="img"
          src="/Search.png"
          sx={{
            position: 'absolute',
            top: '40%',
            right: '0%',
            width: { xs: '40%', sm: '45%' },
            height: 'auto',
            transform: 'translateY(-30%) rotate(0deg)', // Center vertically and rotate
          }}
        />
        <Button sx={{ color: '#F4CE47', padding: '16px 28px', border: '1.5px solid #F4CE47', borderRadius: '16px', m: 2 }}>
          BROWSE NOW
        </Button>
      </Card>
      <Box component={'img'} src='/book.png' sx={{ width: { xs: '100%', md: 550 }, height: { xs: 'auto', md: 330 }, mt: 5 }} />
    </Box>
  )
}

export default Cards
