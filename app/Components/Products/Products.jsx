"use client";
import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  IconButton,
  Skeleton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { FaRegBookmark } from "react-icons/fa";
import ProductActionIcons from "../LandingPage/ProductActionIcons";
import { useBookmark } from "../../Context/BookMarkContext";
import { useAuth } from "../../Context/AuthContext";
import { motion } from "framer-motion";

export default function Products() {
  const bookmarkContext = useBookmark(); // Get full context object
  const { addBookmark, addCart, setAllBooks } = bookmarkContext; // Destructure explicitly
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "books"),
      (snapshot) => {
        const bookList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBooks(bookList);
        setAllBooks(bookList); // Should work now
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [setAllBooks]);

  const handleBookmarkClick = (product) => {
    addBookmark(product);
  };

  const handlePurchase = (book) => {
    if (!user) {
      setOpenLoginModal(true);
    } else {
      addCart(book);
      console.log(`Added ${book.title} to cart for purchase`);
    }
  };

  return (
    <Box sx={{ p: 3, minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      {loading ? (
        <Grid container spacing={4} justifyContent="center">
          {[...Array(8)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card sx={{ width: "100%", height: "100%", boxShadow: 3, borderRadius: 2 }}>
                <Skeleton variant="rectangular" width="80vw" height={330} sx={{ borderRadius: "16px", p: 2 }} animation="wave" />
                <CardContent sx={{ p: 2 }}>
                  <Skeleton variant="text" width="90%" height={30} animation="wave" />
                  <Skeleton variant="text" width="70%" height={20} animation="wave" />
                  <Skeleton variant="text" width="50%" height={20} animation="wave" />
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
                    <Skeleton variant="circular" width={40} height={40} animation="wave" />
                    <Skeleton variant="circular" width={40} height={40} animation="wave" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : books.length === 0 ? (
        <Typography variant="h6" textAlign="center">
          No books available
        </Typography>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {books.map((book) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
              <Card
                sx={{
                  width: "22vw",
                  height: "100%",
                  boxShadow: 3,
                  borderRadius: 2,
                  position: "relative",
                  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={book.imageBase64 || "https://via.placeholder.com/150"}
                  alt={book.title}
                  sx={{
                    width: "100%",
                    height: 330,
                    objectFit: "fill",
                    borderRadius: "16px",
                    p: 2,
                  }}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150";
                    console.error("Image loading failed, fallback triggered.");
                  }}
                />
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="h6" fontWeight="bold" noWrap>
                    {book.title || "Untitled"}
                  </Typography>
                  <Typography variant="subtitle2" mt={1}>
                    {book.author || "Unknown Author"}
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Rs: {book.price || "N/A"}
                  </Typography>
                  {book.type && (
                    <Typography variant="body2" mt={1} color="primary">
                      {book.type}
                    </Typography>
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 2,
                    }}
                  >
                      <ProductActionIcons product={book} />
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <IconButton
                        onClick={() => handleBookmarkClick(book)}
                        sx={{
                          fontSize: "20px",
                          color: "white",
                          backgroundColor: "#2A2C2E",
                          "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
                        }}
                      >
                        <FaRegBookmark />
                      </IconButton>
                    </Box>
                   
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

     
    </Box>
  );
}