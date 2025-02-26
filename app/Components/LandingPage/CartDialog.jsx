"use client";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  IconButton,
  Snackbar,
} from "@mui/material";
import React, { useState, useMemo } from "react";
import { useBookmark } from "../../Context/BookMarkContext"; // Adjust path
import { FaTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAuth } from "../../Context/AuthContext"; // Adjust path
import Signup from "../Signup/Signup";

function BookmarkDialog({ open, onClose }) {
  const { cartItems, removeCart, totalCartPrice, Checkout } = useBookmark();
  const { user } = useAuth();
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [pendingCheckoutItem, setPendingCheckoutItem] = useState(null);

  const handleCheckout = async (item) => {
    if (!user) {
      setPendingCheckoutItem(item);
      setShowSignup(true);
      return;
    }

    await new Promise((resolve) => {
      Checkout(item);
      resolve();
    });

    console.log("Items checked out:", item); // Debug log

    setSuccessMessage("Proceeding to checkout...");
    const itemsToCheckout = Array.isArray(item) ? item : [item];
    const itemIds = itemsToCheckout.map((i) => i.id).join(",");
    console.log("Redirecting to payment with checkoutIds:", itemIds); // Debug log
    router.push(`/payment?checkoutIds=${itemIds}`);
  };

  const handleRemoveItem = (itemId) => {
    removeCart(itemId);
  };

  const totalPrice = useMemo(() => totalCartPrice, [cartItems]);

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle className="text-2xl font-bold border-b-2">Cart</DialogTitle>
        <DialogContent>
          <Box sx={{ maxHeight: 400, overflowY: "auto", pr: 2 }}>
            {cartItems.length === 0 ? (
              <Typography m={2}>No Items available.</Typography>
            ) : (
              cartItems.map((item, index) => (
                <Card
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    mt: 2,
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={
                      item.imageBase64
                        ? `${item.imageBase64}`
                        : "https://via.placeholder.com/150"
                    }
                    alt={item.title}
                    sx={{
                      height: { xs: 80, sm: 100 },
                      width: { xs: 80, sm: 100 },
                      objectFit: "cover",
                      borderRadius: "16px",
                      p: 1,
                    }}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/150";
                      console.error("Image loading failed, fallback triggered.");
                    }}
                  />
                  <CardContent
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      p: 1,
                    }}
                  >
                    <Typography variant="h6" fontWeight={600}>
                      {item.title}
                    </Typography>
                    <Typography variant="subtitle1">{item.author}</Typography>
                    <Typography variant="subtitle1" fontWeight={600}>
                      Rs {item.price}
                    </Typography>
                  </CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
                    <Button
                      variant="contained"
                      onClick={() => handleCheckout(item)}
                      sx={{ mr: 1, bgcolor: "#2A2C2E", color: "white" }}
                    >
                      Buy Now
                    </Button>
                    <IconButton
                      sx={{ color: "#2A2C2E" }}
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <FaTrashAlt />
                    </IconButton>
                  </Box>
                </Card>
              ))
            )}
          </Box>
          {cartItems.length > 0 && (
            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Button
                variant="contained"
                onClick={() => handleCheckout(cartItems)}
                sx={{
                  mt: 1,
                  gap: 1,
                  bgcolor: "#2A2C2E",
                  color: "white",
                }}
              >
                Buy All
                <Typography variant="h6" fontSize={"15px"}>
                  Rs {totalPrice}
                </Typography>
              </Button>
            </Box>
          )}
        </DialogContent>
        <Snackbar
          open={!!successMessage}
          autoHideDuration={3000}
          onClose={() => setSuccessMessage("")}
          message={successMessage}
        />
      </Dialog>

      {showSignup && (
        <Dialog open={showSignup} onClose={() => setShowSignup(false)}>
          <DialogContent>
            <Signup
              onClose={() => {
                setShowSignup(false);
                if (user && pendingCheckoutItem) {
                  handleCheckout(pendingCheckoutItem); // Retry checkout with stored item
                }
                setPendingCheckoutItem(null);
              }}
              redirectToCheckout={true}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default BookmarkDialog;