"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Button, CardMedia } from "@mui/material";
import YouAlsoLike from "./YouAlsoLike";
import Link from "next/link";
import { useBookmark } from "../../Context/BookMarkContext";
import { db, doc, getDoc, collection, getDocs, query, where } from "../../firebase/config";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [productsData, setProductsData] = useState([]); // For storing all products
  const { addCart } = useBookmark();

  const fetchProductDetails = async (productId) => {
    try {
      const productDocRef = doc(db, "books", productId);
      const productDoc = await getDoc(productDocRef);
      if (productDoc.exists()) {
        const productData = productDoc.data();
        setProduct(productData);

        await fetchAllProducts(productData?.category, productId);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  
  const fetchAllProducts = async (category, currentId) => {
    
    try {
      const productsRef = collection(db, "books");
      const categoryQuery = query(
        productsRef,
        where("category", "==", category)
      );
  
      const productsSnapshot = await getDocs(categoryQuery);
      
      if (!productsSnapshot.empty) {
        const allProducts = productsSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,  // Attach the Firebase document ID to each product
        }));
        const filteredProducts = allProducts.filter(product => product.id !== currentId);

        setProductsData(filteredProducts); // Save all products in state
      } else {
        console.log("No products found for category:", category); // If no products found
      }
    } catch (error) {
      console.error("Error fetching all products:", error);
    }
  };
  

  useEffect(() => {
    const productId = window.location.href.split("/").pop(); // Get productId from URL
    if (!productId) return;

    fetchProductDetails(productId);
  }, []);

  const handleAddCartClick = (event) => {
    event.stopPropagation();
    if (product) addCart(product);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          bgcolor: "#2A2C2E",
          borderRadius: "10px",
          p: 3,
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            width: "100%",
          }}
        >
          <Box sx={{ width: { xs: "100%", md: "37%" }, p: 2 }}>
            <CardMedia
              component="img"
              image={product?.imageBase64 || "https://via.placeholder.com/150"} // Directly use base64 or fallback
              alt={product?.title || "Product Image"}
              sx={{
                width: { md: "90%", sm: "80%" },
                height: "auto",
                borderRadius: "8px",
              }}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/150";
                console.error("Image loading failed, fallback triggered.");
              }}
            />
          </Box>

          <Box sx={{ width: { xs: "100%", md: "60%" }, pt: 3 }}>
            <Typography variant="h4" fontWeight="bold" color="white">
              {product?.title}
            </Typography>
            <Typography variant="subtitle1" color="gray" mt={2}>
              Author: {product?.author}
            </Typography>
            <Typography
              variant="body1"
              color="white"
              sx={{ mt: 2, fontSize: "14px", fontWeight: "bold" }}
            >
              Category: {product?.category}
            </Typography>
            <Typography
              variant="body1"
              color="white"
              sx={{ mt: 2, fontSize: "14px", fontWeight: "bold" }}
            >
              Publisher: {product?.publisher}
            </Typography>
            <Typography variant="body1" color="white" sx={{ mt: 2 }}>
              Rs: {product?.price}
            </Typography>

            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
              <Link href="/payment">
                <Button variant="contained" color="primary">
                  Buy Now
                </Button>
              </Link>
              <Button
                variant="outlined"
                sx={{ color: "white", borderColor: "white" }}
                onClick={handleAddCartClick}
              >
                Add to Bag
              </Button>
            </Box>
          </Box>
        </Box>

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
            {product?.description}
          </Typography>
          <Button variant="text" sx={{ color: "#2A2C2E", mt: 2 }}>
            Read More
          </Button>
        </Box>
      </Box>

      {/* You Also Like Section */}
      <YouAlsoLike
        ProductsData={productsData}
        currentId={product?.id}
        prodCategory={product?.category}
      />
    </Box>
  );
}
