import React, { useEffect } from 'react';
import { Box, Grid, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import ReviewCard from './ReviewCard';
import ReviewButton from './ReviewButton';


function YouAlsoLike({ ProductsData, currentId, prodCategory }) {
    // Debugging: Log the inputs to check values
    console.log('Current ID:', currentId);
    console.log('Product Category:', prodCategory);

    // Filter out the current product and match the same category
    const filteredProducts = ProductsData?.filter(product => {
        // Ensure product has a category before comparison
        if (!product?.category) {
            return false; // Skip products without a category
        }
        return product?.id !== currentId && product?.category === prodCategory;
    });

    // Debugging: Log the filtered products
    console.log('Filtered Products:', filteredProducts);

    return (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>You May Also Like</Typography>
          <Grid container spacing={2}>
            {filteredProducts?.slice(0, 5)?.map(product => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={product?.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={product?.image}
                    alt={product?.title}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {product?.author}
                    </Typography>
                    <Typography variant="subtitle1">{product?.title}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
         <ReviewButton />
          <ReviewCard />
       
        </Box>

    );
}

export default YouAlsoLike;
