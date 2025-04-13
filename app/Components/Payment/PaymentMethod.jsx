"use client";
import React, { useEffect, useState } from "react";
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
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import validator from "validator";
import { db, collection, addDoc } from "../../firebase/config";
import { useAuth } from "../../Context/AuthContext";
import { useBookmark } from "../../Context/BookMarkContext";
import { useSearchParams } from "next/navigation";

const PaymentMethod = ({ finalTotal, bookType }) => {
  const isMixed = bookType === "both";
  const isSoft = bookType === "soft";
  const isHard = bookType === "hard";

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focused, setFocused] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Online");

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");

  const { user } = useAuth();
  const { checkoutItems } = useBookmark();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Force online payment for soft or mixed orders
    if (isSoft || isMixed) {
      setPaymentMethod("Online");
    }
    setName(localStorage.getItem("name") || "");
    setMobile(localStorage.getItem("mobile") || "");
    setAddress(localStorage.getItem("address") || "");
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (paymentMethod === "Online") {
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
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFutureDate = (expiry) => {
    const [month, year] = expiry.split("/").map(Number);
    const now = new Date();
    const expiryDate = new Date(2000 + year, month - 1);
    return expiryDate > now;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const checkoutIds = searchParams.get("checkoutIds")?.split(",") || [];
      const itemsToOrder = checkoutIds.length
        ? checkoutItems.filter((item) => checkoutIds.includes(item.id))
        : checkoutItems;

      for (const book of itemsToOrder) {
        const orderData = {
          userId: user.uid,
          contactInfo: { name, mobile, address },
          bookId: book.id,
          imageUrl: book.imageBase64 || "",
          bookName: book.title || "Untitled",
          type: book.type || "Unknown",
          softCopyUrl:
            book.type?.toLowerCase() === "soft copy" && book.pdfBase64
              ? book.pdfBase64.startsWith("data:")
                ? book.pdfBase64
                : `data:application/pdf;base64,${book.pdfBase64}`
              : "",
          hardCopy: book.type?.toLowerCase() === "hard copy" ? "yes" : "",
          price: book.price || 0,
          paymentDetails: {
            method: paymentMethod,
            amountPaid: finalTotal,
            cardInfo:
              paymentMethod === "Online"
                ? { number: cardNumber, name: cardName, expiry, cvc }
                : null,
          },
          purchaseDate: new Date().toISOString(),
        };

        await addDoc(collection(db, "orders"), orderData);
      }

      setShowModal(true);
      localStorage.removeItem("CheckoutItems");

      setTimeout(() => {
        setShowModal(false);
        window.location.href = "/";
      }, 3000);
    } catch (err) {
      console.error("Payment error:", err);
      setErrors({ general: "Failed to process payment. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <form onSubmit={handleSubmit}>
        {isHard && (
          <FormControl component="fieldset" sx={{ color: "white", mb: 3 }}>
            <Typography sx={{ color: "white", mb: 1 }}>
              Select Payment Method
            </Typography>
            <RadioGroup
              row
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel
                value="Online"
                control={<Radio />}
                label="Online Payment"
              />
              <FormControlLabel
                value="COD"
                control={<Radio />}
                label="Cash on Delivery"
              />
            </RadioGroup>
          </FormControl>
        )}

        {paymentMethod === "Online" && (
          <>
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
                const val = e.target.value;
                if (/^[A-Za-z\s]*$/.test(val)) setCardName(val);
              }}
              onFocus={() => setFocused("name")}
              fullWidth
              sx={textFieldStyle}
              error={!!errors.cardName}
              helperText={errors.cardName}
            />

            <TextField
              label="Card Number"
              value={cardNumber}
              onChange={(e) =>
                setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))
              }
              onFocus={() => setFocused("number")}
              fullWidth
              sx={textFieldStyle}
              error={!!errors.cardNumber}
              helperText={errors.cardNumber}
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  onFocus={() => setFocused("expiry")}
                  fullWidth
                  sx={textFieldStyle}
                  error={!!errors.expiry}
                  helperText={errors.expiry}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="CVC"
                  value={cvc}
                  onChange={(e) =>
                    setCvc(e.target.value.replace(/\D/g, "").slice(0, 3))
                  }
                  onFocus={() => setFocused("cvc")}
                  fullWidth
                  sx={textFieldStyle}
                  error={!!errors.cvc}
                  helperText={errors.cvc}
                />
              </Grid>
            </Grid>
          </>
        )}

        {errors.general && (
          <Typography color="error" sx={{ mt: 2 }}>
            {errors.general}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{
            mt: 3,
            bgcolor: "white",
            color: "black",
            "&:hover": { bgcolor: "grey.300" },
          }}
        >
          {loading ? <CircularProgress size={24} /> : "Submit Payment"}
        </Button>
      </form>

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
