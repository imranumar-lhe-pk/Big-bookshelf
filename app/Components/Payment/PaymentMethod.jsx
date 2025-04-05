"use client";
import React, { useState, useEffect } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Modal,
  CircularProgress,
} from "@mui/material";
import validator from "validator";
import { useAuth } from "../../Context/AuthContext"; // Adjust path
import { useBookmark } from "../../Context/BookMarkContext"; // Adjust path
import { db, collection, addDoc } from "../../firebase/config"; // Adjust path
import { useSearchParams } from "next/navigation";

const PaymentMethod = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [focused, setFocused] = useState("");
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const { checkoutItems } = useBookmark();
  const searchParams = useSearchParams();

  useEffect(() => {
    const savedName = localStorage.getItem("name") || "";
    const savedMobile = localStorage.getItem("mobile") || "";
    const savedAddress = localStorage.getItem("address") || "";
    setName(savedName);
    setMobile(savedMobile);
    setAddress(savedAddress);
    console.log("PaymentMethod loaded contact info from localStorage:", { savedName, savedMobile, savedAddress });
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!/^\d{16}$/.test(cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }
    if (!/^[A-Za-z\s]+$/.test(cardName)) {
      newErrors.cardName = "Cardholder name must contain only alphabets";
    }
    if (
      !validator.isLength(expiry, { min: 5, max: 5 }) ||
      !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry) ||
      !isFutureDate(expiry)
    ) {
      newErrors.expiry = "Invalid or past expiry date (MM/YY)";
    }
    if (!/^\d{3}$/.test(cvc)) {
      newErrors.cvc = "CVC must be 3 digits";
    }
    if (!name) newErrors.name = "Name is required";
    if (!mobile) newErrors.mobile = "Mobile is required";
    if (!address) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFutureDate = (expiry) => {
    const [month, year] = expiry.split("/").map(Number);
    const now = new Date();
    const expiryDate = new Date(`20${year}`, month - 1);
    return expiryDate > now;
  };

  const handleExpiryChange = (value) => {
    if (/^[0-9]{1,2}$/.test(value) && value.length === 2) {
      setExpiry(value + "/");
    } else if (/^[0-9]{2}\/[0-9]{1,2}$/.test(value)) {
      setExpiry(value);
    } else if (value.length <= 5) {
      setExpiry(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const checkoutIds = searchParams.get("checkoutIds")?.split(",") || [];
      const itemsToOrder = checkoutIds.length > 0
        ? checkoutItems.filter((item) => checkoutIds.includes(item.id))
        : checkoutItems;

      if (itemsToOrder.length === 0) {
        setErrors({ general: "No items selected for purchase" });
        setLoading(false);
        return;
      }

      const contactInfo = { name, mobile, address };

      for (const book of itemsToOrder) {
        const softCopyUrl =
          book.type === "Soft Copy" && book.pdfBase64
            ? book.pdfBase64.startsWith("data:application/pdf;base64,")
              ? book.pdfBase64
              : `data:application/pdf;base64,${book.pdfBase64}`
            : "";

        console.log("Saving order with softCopyUrl:", softCopyUrl.substring(0, 50) + "...");

        const orderData = {
          userId: user.uid,
          contactInfo,
          bookId: book.id,
          imageUrl: book.imageBase64 || "",
          bookName: book.title || "Untitled",
          type: book.type || "Unknown",
          softCopyUrl,
          hardCopy: book.type === "Hard Copy" ? "" : "",
          price: book.price || 0,
          purchaseDate: new Date().toISOString(),
        };

        await addDoc(collection(db, "orders"), orderData);
        console.log("Order saved to Firebase:", orderData);
      }

      localStorage.setItem("name", name);
      localStorage.setItem("mobile", mobile);
      localStorage.setItem("address", address);
      console.log("Saved to localStorage:", { name, mobile, address });

      setLoading(false);
      setShowModal(true);

      localStorage.removeItem("CheckoutItems");
      localStorage.removeItem("CheckoutPrice");

      setTimeout(() => {
        setShowModal(false);
        window.location.href = "/";
      }, 3000);
    } catch (error) {
      console.error("Error creating order:", error);
      setErrors({ general: "Failed to process payment. Please try again." });
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
     

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ color: "white", textAlign: "center" }}>
          Enter Card Details
        </Typography>

        <Cards
          number={cardNumber}
          name={cardName}
          expiry={expiry.replace("/", "")}
          cvc={cvc}
          focused={focused}
        />

        <TextField
          label="Cardholder Name"
          value={cardName}
          onChange={(e) => {
            const value = e.target.value;
            if (/^[A-Za-z\s]*$/.test(value)) {
              setCardName(value);
            }
          }}
          fullWidth
          sx={textFieldStyle}
          onFocus={() => setFocused("name")}
          error={!!errors.cardName}
          helperText={errors.cardName || ""}
        />

        <TextField
          label="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
          fullWidth
          sx={textFieldStyle}
          onFocus={() => setFocused("number")}
          error={!!errors.cardNumber}
          helperText={errors.cardNumber || ""}
        />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="MM/YY"
              value={expiry}
              onChange={(e) => handleExpiryChange(e.target.value)}
              fullWidth
              sx={textFieldStyle}
              onFocus={() => setFocused("expiry")}
              error={!!errors.expiry}
              helperText={errors.expiry || ""}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="CVC"
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 3))}
              fullWidth
              sx={textFieldStyle}
              onFocus={() => setFocused("cvc")}
              error={!!errors.cvc}
              helperText={errors.cvc || ""}
            />
          </Grid>
        </Grid>

        {errors.general && (
          <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
            {errors.general}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{ marginTop: 3, bgcolor: "white", color: "black", "&:hover": { bgcolor: "grey.300" } }}
        >
          {loading ? <CircularProgress size={24} /> : "Submit Payment"}
        </Button>

        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" textAlign="center">
              Order Completed!
            </Typography>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

const textFieldStyle = {
  marginBottom: 2,
  marginTop: 2,
  "& .MuiOutlinedInput-root": {
    color: "white",
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
  "& .MuiInputLabel-root": {
    color: "white",
  },
  "& .MuiFormHelperText-root": {
    color: "white",
  },
};

export default PaymentMethod;