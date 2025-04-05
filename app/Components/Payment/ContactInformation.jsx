"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import NavBarr from "./NavBarr";
import Footer from "./Footer";
import OrderSummary from "./OrderSummary";
import { useAuth } from "../../Context/AuthContext"; // Adjust path
import { useBookmark } from "../../Context/BookMarkContext"; // Adjust path
import { db, doc, setDoc } from "../../firebase/config";

const ContactInformation = () => {
  const { user } = useAuth();
  const { checkoutItems } = useBookmark();
  const router = useRouter();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const handleNameChange = (event) => setName(event.target.value);
  const handleMobileChange = (event) => setMobile(event.target.value);
  const handleAddressChange = (event) => setAddress(event.target.value);

  const handleContinue = async () => {
    if (!user) {
      setError("Please log in to continue.");
      return;
    }

    if (!name || !mobile || !address) {
      setError("All fields are required.");
      return;
    }

    if (checkoutItems.length === 0) {
      setError("No items selected for checkout.");
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(
        userRef,
        {
          name,
          mobile,
          address,
          email: user.email,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
      console.log("Contact info saved to Firebase:", { name, mobile, address });

      localStorage.setItem("name", name);
      localStorage.setItem("mobile", mobile);
      localStorage.setItem("address", address);

      const checkoutIds = checkoutItems.map((item) => item.id).join(",");
      console.log("Redirecting to shipping-method with checkoutIds:", checkoutIds);

      setError("");
      // Pass name, mobile, and address as query params
      router.push(
        `/shipping-method?checkoutIds=${checkoutIds}&name=${encodeURIComponent(name)}&mobile=${encodeURIComponent(mobile)}&address=${encodeURIComponent(address)}`
      );
    } catch (err) {
      console.error("Error saving to Firebase:", err);
      setError("Failed to save contact information: " + err.message);
    }
  };

  return (
    <Box>
      <NavBarr />
      <Container maxWidth="lg" sx={{ bgcolor: "#222", py: 4, mt: 5, borderRadius: "10px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box bgcolor="#333" p={3} borderRadius={2} color="#fff">
              <Typography variant="h5" sx={{ mb: 2 }}>
                CONTACT INFORMATION
              </Typography>
              {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                  {error}
                </Typography>
              )}
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                value={name}
                onChange={handleNameChange}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": { color: "#fff" },
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
                  "& .MuiInputLabel-root": { color: "#fff" },
                }}
              />
              <TextField
                fullWidth
                label="Mobile"
                variant="outlined"
                value={mobile}
                onChange={handleMobileChange}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": { color: "#fff" },
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
                  "& .MuiInputLabel-root": { color: "#fff" },
                }}
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
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2, bgcolor: "gold", color: "#222" }}
                onClick={handleContinue}
              >
                CONTINUE TO PAYMENT METHOD
              </Button>
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
};

export default ContactInformation;