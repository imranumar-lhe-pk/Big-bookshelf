'use client'
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
} from "@mui/material";
import React, { useEffect } from "react";
import { useBookmark } from "../../Context/BookMarkContext";
import { FaTrashAlt } from "react-icons/fa"; // Bin icon for removal
import { useRouter } from "next/navigation";

function BookmarkDialog({ open, onClose }) {
  const { bookmarkedItems, removeBookmark, totalPrice, Checkout, addCart } =
    useBookmark();
  const router = useRouter();

  const handleCheckout = (item) => {
    Checkout(item);
    router.push("/payment");
  };

  // Add a single item from bookmarks to the cart
  const handleAddToCart = (item) => {
    addCart(item); // Add the item to the cart
    removeBookmark(item.id); // Optionally remove the item from bookmarks
  };

  // Add all bookmarked items to the cart
  const handleAddAllToCart = () => {
    bookmarkedItems.forEach((item) => addCart(item)); // Add all items to the cart
    bookmarkedItems.forEach((item) => removeBookmark(item.id)); // Optionally clear all bookmarks
  };

  useEffect(() => {
    localStorage.setItem("Bookmark", JSON.stringify(bookmarkedItems));
  }, [bookmarkedItems]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle className="text-2xl font-bold border-b-2">
        Bookmarks
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            maxHeight: 400,
            overflowY: "auto",
            pr: 2,
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#555",
            },
          }}
        >
          {bookmarkedItems.length === 0 ? (
            <Typography m={2}>No bookmarks available.</Typography>
          ) : (
            bookmarkedItems.map((item, index) => (
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
                      ? `${item.imageBase64}` // Directly use the Base64 image
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
                    Rs{item.price}
                  </Typography>
                </CardContent>
                <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
                  <Button
                    onClick={() => {
                      handleAddToCart(item);
                    }}
                    sx={{
                      mr: 1,
                      bgcolor: "#2A2C2E",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                      },
                    }}
                  >
                    Add to Bag
                  </Button>
                  <IconButton
                    sx={{ color: "#2A2C2E" }}
                    onClick={() => removeBookmark(item.id)} // Remove bookmark by ID
                  >
                    <FaTrashAlt />
                  </IconButton>
                </Box>
              </Card>
            ))
          )}
        </Box>
        {bookmarkedItems.length > 0 && (
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Button
              onClick={handleAddAllToCart}
              sx={{
                mt: 1,
                gap: 1,
                bgcolor: "#2A2C2E",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                },
              }}
            >
              Add All In Bag
              <Typography variant="h6" fontSize={"15px"}>
                {" "}
                Rs {totalPrice}
              </Typography>{" "}
              {/* Show total amount */}
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default BookmarkDialog;
