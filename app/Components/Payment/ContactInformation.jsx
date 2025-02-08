"use client";
import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import NavBarr from './NavBarr';
import Footer from './Footer';
import OrderSummary from './OrderSummary';

const ContactInformation = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  

 

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleMobileChange = (event) => {
    setMobile(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  return (
    <Box>
      <NavBarr />
      <Container maxWidth="lg" sx={{ bgcolor: '#222', py: 4 , mt:5, borderRadius:'10px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box bgcolor="#333" p={3} borderRadius={2} color="#fff">
              <Typography variant="h5" sx={{ mb: 2 }}>CONTACT INFORMATION</Typography>
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                value={name}
                onChange={handleNameChange}
                sx={{ mb: 2, '& .MuiOutlinedInput-root': { color: '#fff' }, '& .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' }, '& .MuiInputLabel-root': { color: '#fff' }}}
              />
              <TextField
                fullWidth
                label="Mobile"
                variant="outlined"
                value={mobile}
                onChange={handleMobileChange}
                sx={{ mb: 2, '& .MuiOutlinedInput-root': { color: '#fff' }, '& .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' }, '& .MuiInputLabel-root': { color: '#fff' }}}
              />
              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                value={address}
                onChange={handleAddressChange}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": { color: "#fff" },
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
                  "& .MuiInputLabel-root": { color: "#fff" },
                }}
              />
              {/* Pass name, mobile, and cart details to the ShippingMethod page */}
              <Link 
                href={{
                  pathname: "/shipping-method",
                  query: { name,mobile,address},
                }}
              >
                <Button variant="contained" fullWidth sx={{ mt: 2, bgcolor: 'gold', color: '#222' }}>
                  CONTINUE TO SHIPPING METHOD
                </Button>
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <OrderSummary  />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default ContactInformation;
