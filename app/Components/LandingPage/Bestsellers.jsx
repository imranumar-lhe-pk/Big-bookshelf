"use client";
import React, { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import BestSellerProd from "./BestSellerProd";

const Bestsellers = () => {
  const [loading, setLoading] = useState(true);

  return (
    <Box
      sx={{
        backgroundColor: "#2A2C2E",
        p: 4,
        width: { xs: "90%", sm: "97%" },
        m: { sm: 2, xs: 2 },
        borderRadius: "8px",
        minHeight: 300,
      }}
    >
      {/* Heading remains on the left */}
      <Typography
       variant="h6" color="white" mb={4} fontWeight={'bold'} fontSize={'24px'} ml={1}
      >
        BESTSELLERS
      </Typography>

      {/* Skeletons or Product Cards */}
      <Grid container spacing={2}>
        <BestSellerProd loading={loading} setLoading={setLoading} />
      </Grid>
    </Box>
  );
};

export default Bestsellers;
