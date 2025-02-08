"use client";
import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { ProductsData } from "../../static/products";
import { FaRegBookmark } from "react-icons/fa";
import { useBookmark } from "../../Context/BookMarkContext";
import ProductActionIcons from "./ProductActionIcons"; // Import the new component
import { motion } from "framer-motion"; // Import motion

const BestSellerProd = () => {
  const router = useRouter();
  const { addBookmark } = useBookmark();

  const handleBookmarkClick = (event, product) => {
    event.stopPropagation(); // Prevent triggering the card click
    addBookmark(product);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2}>
        {/* Products Grid */}
        <Grid item xs={12} sm={12} md={12}>
          <Grid container spacing={2}>
            {ProductsData.map((product, index) => (
              <React.Fragment key={index}>
                {index < 7 ? (
                  <Grid item xs={12} sm={6} md={3} lg={3}>
                    <motion.div
                      whileHover={{ scale: 1.05 }} // Scale up on hover
                      transition={{ type: "spring", stiffness: 300 }} // Animation properties
                    >
                      <Card sx={{ height: "100%" }}>
                        <CardMedia
                          component="img"
                          image={product.image}
                          alt={product.title}
                          sx={{
                            height: 330,
                            width: "100%",
                            objectFit: "fill",
                            borderRadius: "16px",
                            p: 2,
                          }}
                        />
                        <CardContent>
                          <Typography variant="h6" fontWeight="bold">
                            {product.title}
                          </Typography>
                          <Typography variant="subtitle2" mt={1}>
                            {product.author}
                          </Typography>
                          <Typography variant="body2" mt={1}>
                            ${product.priceNew}{" "}
                            <span className="text-gray-400">
                              {product?.priceOld}
                            </span>
                          </Typography>
                          <Typography variant="body2" position={"relative"}>
                            <Box mt={1}>
                              <ProductActionIcons productId={product.id} />
                            </Box>
                            <Box>
                              <IconButton
                                onClick={(event) =>
                                  handleBookmarkClick(event, product)
                                }
                                sx={{
                                  position: "absolute",
                                  bottom: 0,
                                  right: 0,
                                  fontSize: { md: "20px", xs: "13px" },
                                  color: "white",
                                  backgroundColor: "#2A2C2E",
                                  "&:hover": {
                                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                                  },
                                }}
                              >
                                <FaRegBookmark />
                              </IconButton>
                            </Box>
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ) : null}

                {/* See All Button */}
                {index === 7 ? (
                  <Grid item xs={12} sm={6} md={3} lg={3}>
                    <Button
                      variant="contained"
                      className="bg-[#F4CE47] transition ease-in-out delay-150 hover:-translate-y hover:scale-105  duration-300 h-[100%] w-[100%] border-r-[16px] flex justify-center items-center text-black font-bold p-2 hover:bg-[#e3b600] text-2xl "
                    >
                      SEE ALL
                    </Button>
                  </Grid>
                ) : null}
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BestSellerProd;
