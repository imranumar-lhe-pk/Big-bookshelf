"use client";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import NavBarr from "./NavBarr";
import OrderSummary from "./OrderSummary";
import PaymentMethod from "./PaymentMethod";
import Footer from "./Footer";
import { useSearchParams } from "next/navigation";

function ShippingMethod() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Not provided";
  const mobile = searchParams.get("mobile") || "Not provided";
  const address = searchParams.get("address") || "Not provided";

  return (
    <Box>
      <NavBarr />
      <Container
        maxWidth="lg"
        sx={{ bgcolor: "#222", py: 4, mt: 5, borderRadius: "10px" }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box bgcolor="#333" p={3} borderRadius={2} color="#fff">
              <Box border={"1px solid"}>
                <Typography
                  variant="h5"
                  m={2}
                  sx={{ mb: 2, fontWeight: "bold" }}
                >
                  CONTACT INFORMATION
                </Typography>
                <Typography variant="body1" m={2}>
                  <strong>Name:</strong> {decodeURIComponent(name)}
                </Typography>
                <Typography variant="body1" m={2}>
                  <strong>Mobile:</strong> {decodeURIComponent(mobile)}
                </Typography>
                <Typography variant="body1" m={2}>
                  <strong>Address:</strong> {decodeURIComponent(address)}
                </Typography>
              </Box>
              {/* Shipping method selection section */}
              <Typography variant="h5" sx={{ mb: 2, mt: 4, fontWeight: "bold" }}>
                PAYMENT METHOD
              </Typography>
              <PaymentMethod />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <OrderSummary />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
}

export default ShippingMethod;