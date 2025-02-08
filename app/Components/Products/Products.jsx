"use client";
import { useState, useEffect } from "react";
import { db } from "../../firebase/config"; 
import { collection, getDocs, QuerySnapshot } from "firebase/firestore"; // Correct Firebase import
import { Box, Card, CardContent, CardMedia, Grid, Typography, IconButton } from "@mui/material";
import { FaRegBookmark } from "react-icons/fa";
import ProductActionIcons from "../LandingPage/ProductActionIcons";

export default function Products() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  // Fetch books from Firestore
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "books"));
        const bookList = QuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBooks(bookList);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Handle bookmark click action
  const handleBookmarkClick = (event, book) => {
    console.log("Bookmarked:", book.title);
  };

  return (
    <Box sx={{ p: 3 }}>
      {loading ? (
        <Typography variant="h6" textAlign="center">Loading Books...</Typography>
      ) : books.length === 0 ? (
        <Typography variant="h6" textAlign="center">No books available</Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {books.map((book) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
              <Card sx={{ height: "100%", boxShadow: 3, borderRadius: 2, position: "relative" }}>
                <CardMedia
                  component="img"
                  image={book.imageUrl || "https://via.placeholder.com/150"} // Fallback image
                  alt={book.title}
                  sx={{
                    height: 330,
                    objectFit: "cover",
                    borderRadius: "16px",
                    p: 2,
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
                    ${book.priceNew || book.price || "N/A"}{" "}
                    <span style={{ color: "#757575", textDecoration: book.priceOld ? "line-through" : "none" }}>
                      {book.priceOld && `$${book.priceOld}`}
                    </span>
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
                    <Box>
                      <ProductActionIcons productId={book.id} />
                    </Box>
                    <Box>
                      <IconButton
                        onClick={(event) => handleBookmarkClick(event, book)}
                        sx={{
                          fontSize: "20px",
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
