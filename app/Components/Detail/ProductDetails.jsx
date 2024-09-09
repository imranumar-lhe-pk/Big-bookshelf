"use client";
import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Button, CardMedia } from "@mui/material";
import { ProductsData } from "../../static/products";

export default function ProductDetails() {
  const [product, setProduct] = useState("");

  useEffect(() => {
    if (window) {
      const prodIndex = window?.location?.href.split("/")?.[3];
      const product = ProductsData?.[prodIndex];
        
      setProduct(product);
    }
  }, [window]);

  return (
    <Box sx={{ p: 3 }}>
      {/* Main content container */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          bgcolor: '#2A2C2E',
          borderRadius: '10px',
          p: 3,
          alignItems: 'flex-start',
        }}
      >
        {/* Left side: Image and details */}
        <Box sx={{ display: 'flex', flexDirection: 'row', width: { xs: '100%', sm: '60%' } }}>
          <Box sx={{ width: '40%', p: 2 }}>
            <CardMedia
              component="img"
              image={product?.image}
              alt={product?.title}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
              }}
            />
          </Box>

          <Box sx={{ width: '60%', pt: 2 }}>
            <Typography variant="h4" fontWeight="bold" color="white" >
              {product?.title}
            </Typography>
            <Typography variant="subtitle1" color="gray" mt={2}>
              {product?.author}
            </Typography>
            <Typography variant="body1" color="white" sx={{ mt: 2, fontSize:'14px', fontWeight:'bold'}}>
              Category: {product?.category}
            </Typography>
            <Typography variant="body1" color="white"  sx={{ mt: 2, fontSize:'14px', fontWeight:'bold'}}>
              Language: {product?.language}
            </Typography>
            <Typography variant="body1" color="white"  sx={{ mt: 2, fontSize:'14px', fontWeight:'bold'}}>
              Page: {product?.page}
            </Typography>
            <Typography variant="body1" color="white"  sx={{ mt: 2, fontSize:'14px', fontWeight:'bold'}}>
              Read-Time: {product?.readTime}
            </Typography>
            <Typography variant="body1" color="white"  sx={{ mt: 2, fontSize:'14px', fontWeight:'bold'}}>
              Type: {product?.type}
            </Typography>
            <Typography variant="body1" color="white"  sx={{ mt: 2, fontSize:'14px', fontWeight:'bold'}}>
              Publisher: {product?.publisher}
            </Typography>
            
            <Typography variant="body1" color="white" sx={{ mt: 2 }}>
              {product?.priceNew}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <Button variant="contained" color="primary">
                Buy Now
              </Button>
              <Button variant="outlined" sx={{ color: 'white', borderColor: 'white' }}>
                Add to Bag
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Right side: Plot Summary */}
        <Box
          sx={{
            width: { xs: '100%', sm: '40%' },
            bgcolor: 'white',
            p: 3,
            borderRadius: '8px',
            ml: { sm: 3 },
            mt: { xs: 3, sm: 0 },
          }}
        >
          <Typography variant="h6" fontWeight="bold" color="black">
            PLOT SUMMARY
          </Typography>
          <Typography variant="body2" color="black" sx={{ mt: 2 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna.
          </Typography>
          <Button variant="text" sx={{ color: '#2A2C2E', mt: 2 }}>
            Read More
          </Button>
        </Box>
      </Box>

      {/* Bottom Section: Dropdown or more options */}
      <Box sx={{ mt: 3 }}>
      <Typography fontWeight={'bold'}>YOU MAY ALSO LIKE</Typography>
      <Box sx={{ width: '40%', p: 2 }}>
            <CardMedia
              component="img"
              image={product?.image}
              alt={product?.title}
              sx={{
                width: '40%',
                height: 'auto',
                borderRadius: '8px',
              }}
            />
          </Box>
            <Typography variant="subtitle1" color="black" ml={2}>
              {product?.author}
            </Typography>
          <Typography variant="h6" fontWeight="bold" color="black" ml={2}>
              {product?.title}
            </Typography>
      </Box>
    </Box>
  );
}
