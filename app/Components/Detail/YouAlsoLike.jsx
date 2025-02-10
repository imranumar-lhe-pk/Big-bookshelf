import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { db, collection, getDocs } from '../../firebase/config'; // Ensure Firebase import

function YouAlsoLike({ ProductsData, currentId, prodCategory }) {
    console.log("🚀 ~ YouAlsoLike ~ ProductsData:", ProductsData)
    const [relatedAds, setRelatedAds] = useState([]);
    const [remainingAds, setRemainingAds] = useState([]);

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         // Check if ProductsData is passed correctly
    //         console.log("ProductsData:", ProductsData);

    //         if (!ProductsData) return;

    //         // Filter related ads (same category) and remaining ads (different category)
    //         const related = ProductsData.filter(product => 
    //             product?.category === prodCategory && product?.id !== currentId
    //         );

    //         const remaining = ProductsData.filter(product => 
    //             product?.category !== prodCategory
    //         );

    //         // Log the filtered data to debug
    //         console.log("Related Ads:", related);
    //         console.log("Remaining Ads:", remaining);

    //         // Update state
    //         setRelatedAds(related);
    //         setRemainingAds(remaining);
    //     };

    //     fetchProducts();
    // }, [ProductsData, currentId, prodCategory]);

    return (
        <Box mt={4}>
            {/* Related Ads Section */}
            <Typography variant="h6" gutterBottom>You May Also Like</Typography>
            <Grid container spacing={2}>
                {ProductsData?.slice(0, 5).map(product => (
                    <Grid item xs={12} sm={6} md={4} lg={2.4} key={product?.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={product?.imageBase64 || "https://via.placeholder.com/150"} // Fallback image
                                alt={product?.title || "Product Image"}
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {product?.author}
                                </Typography>
                                <Typography variant="subtitle1">{product?.title}</Typography>
                                <Typography variant="body2">{product?.description}</Typography>
                                <Typography variant="h6">{product?.price} USD</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Other Ads Section */}
            {remainingAds.length > 0 && (
                <>
                    <Typography variant="h6" gutterBottom>Other Ads</Typography>
                    <Grid container spacing={2}>
                        {remainingAds?.slice(0, 5).map(product => (
                            <Grid item xs={12} sm={6} md={4} lg={2.4} key={product?.id}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={product?.imageBase64 || "https://via.placeholder.com/150"} // Fallback image
                                        alt={product?.title || "Product Image"}
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            {product?.author}
                                        </Typography>
                                        <Typography variant="subtitle1">{product?.title}</Typography>
                                        <Typography variant="body2">{product?.description}</Typography>
                                        <Typography variant="h6">{product?.price} USD</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </Box>
    );
}

export default YouAlsoLike;
