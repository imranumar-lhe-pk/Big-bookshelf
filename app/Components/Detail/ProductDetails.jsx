'use client';
import React, { useEffect, useState } from "react";
import { Box, Typography, Button, CardMedia } from "@mui/material";
import { ProductsData } from "../../static/products";
import YouAlsoLike from "./YouAlsoLike";
import Link from "next/link";
import { useBookmark } from "../../Context/BookMarkContext";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const { addCart } = useBookmark();

  // Use effect to extract the product index from the URL
  useEffect(() => {
    if (window) {
      const prodIndex = window?.location?.href.split("/")?.[3];
      const product = ProductsData?.find(p => p.id === parseInt(prodIndex)); // Correct way to find product
      setProduct(product);
    }
  }, []);

  const handleAddCartClick = (event, product) => {
    event.stopPropagation();
    addCart(product); // Adding product to cart via context
  };


  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Change to 'md' for tablet
          bgcolor: "#2A2C2E",
          borderRadius: "10px",
          p: 3,
          alignItems: "flex-start",
        }}
      >
        {/* Product Image and Details */}
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, width: "100%" }}>
          <Box sx={{ width: { xs: "100%", md: "37%" }, p: 2 }}>
            <CardMedia
              component="img"
              image={product?.image}
              alt={product?.title}
              sx={{
                width: { md: "90%", sm: "80%" },
                height: "auto",
                borderRadius: "8px",
              }}
            />
          </Box>

          <Box sx={{ width: { xs: "100%", md: "60%" }, pt: 3 }}>
            <Typography variant="h4" fontWeight="bold" color="white">
              {product?.title}
            </Typography>
            <Typography variant="subtitle1" color="gray" mt={2}>
              {product?.author}
            </Typography>
            <Typography variant="body1" color="white" sx={{ mt: 2, fontSize: "14px", fontWeight: "bold" }}>
              Category: {product?.category}
            </Typography>
            <Typography variant="body1" color="white" sx={{ mt: 2, fontSize: "14px", fontWeight: "bold" }}>
              Language: {product?.language}
            </Typography>
            <Typography variant="body1" color="white" sx={{ mt: 2, fontSize: "14px", fontWeight: "bold" }}>
              Page: {product?.page}
            </Typography>
            <Typography variant="body1" color="white" sx={{ mt: 2, fontSize: "14px", fontWeight: "bold" }}>
              Read-Time: {product?.readTime}
            </Typography>
            <Typography variant="body1" color="white" sx={{ mt: 2, fontSize: "14px", fontWeight: "bold" }}>
              Publisher: {product?.publisher}
            </Typography>

            <Typography variant="body1" color="white" sx={{ mt: 2 }}>
              {product?.priceNew}
            </Typography>

            {/* Add to Cart Button */}
            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
              <Link href="/payment">
                <Button variant="contained" color="primary">
                  Buy Now
                </Button>
              </Link>
              <Button
                variant="outlined"
                sx={{ color: "white", borderColor: "white" }}
                onClick={(event) => handleAddCartClick(event, product)}
              >
                Add to Bag
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Plot Summary Section */}
        <Box
          sx={{
            width: { xs: "100%", md: "40%" },
            bgcolor: "white",
            p: 3,
            borderRadius: "8px",
            ml: { md: 3 },
            mt: { xs: 3, md: 0 },
          }}
        >
          <Typography variant="h6" fontWeight="bold" color="black">
            PLOT SUMMARY
          </Typography>
          <Typography variant="body2" color="black" sx={{ mt: 2 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
          <Button variant="text" sx={{ color: "#2A2C2E", mt: 2 }}>
            Read More
          </Button>
        </Box>
      </Box>

      {/* You Also Like Section */}
      <YouAlsoLike ProductsData={ProductsData} currentId={product?.id} prodCategory={product?.category} />
    </Box>
  );
}
