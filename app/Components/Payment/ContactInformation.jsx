"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import NavBarr from "./NavBarr";
import Footer from "./Footer";
import OrderSummary from "./OrderSummary";
import { useAuth } from "../../Context/AuthContext"; // Adjust path
import { db, doc, setDoc, getDoc } from "../../firebase/config"; // Adjust path

const ContactInformation = () => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  // Load existing user data if available
  useEffect(() => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      getDoc(userRef).then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || "");
          setMobile(data.mobile || "");
          setAddress(data.address || "");
        }
      }).catch((err) => {
        console.error("Error loading user data:", err);
      });
    }
  }, [user]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleMobileChange = (event) => {
    setMobile(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleContinue = async () => {
    if (!user) {
      setError("Please log in to continue.");
      return;
    }

    if (!name || !mobile || !address) {
      setError("All fields are required.");
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        name,
        mobile,
        address,
        email: user.email, // Optional: Save email too
        updatedAt: new Date().toISOString(),
      }, { merge: true }); // Merge to avoid overwriting other fields
      setError(""); // Clear any previous errors
    } catch (err) {
      console.error("Error saving to Firebase:", err);
      setError("Failed to save contact information. Please try again.");
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
              <Link
                href={{
                  pathname: "/shipping-method",
                  query: { name, mobile, address },
                }}
                passHref
              >
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2, bgcolor: "gold", color: "#222" }}
                  onClick={handleContinue} // Save to Firebase before redirect
                >
                  CONTINUE TO SHIPPING METHOD
                </Button>
              </Link>
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