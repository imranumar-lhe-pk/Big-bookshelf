"use client";
import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  IconButton,
  Radio,
} from "@mui/material";
import { FaRegBookmark } from "react-icons/fa";
import ProductActionIcons from "../LandingPage/ProductActionIcons";

export default function Products() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAd, setSelectedAd] = useState(null); // State for radio button selection

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookSnapshot = await getDocs(collection(db, "books"));

        const bookList = bookSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          
        }));

        setBooks([...bookList]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBookmarkClick = (event, book) => {
    console.log("Bookmarked:", book.title);
  };

  const handleAdSelection = (adId) => {
    setSelectedAd(adId);
  };

  return (
    <Box sx={{ p: 3 }}>
      {loading ? (
        <Typography variant="h6" textAlign="center">
          Loading Data...
        </Typography>
      ) : books.length === 0 ? (
        <Typography variant="h6" textAlign="center">
          No books or ads available
        </Typography>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {books.map((book) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              width={"90vw"}
              key={book.id}
            >
              <Card
                sx={{
                  height: "100%",
                  boxShadow: 3,
                  borderRadius: 2,
                  position: "relative",
                  transition:
                    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={
                    book.imageBase64
                      ? `${book.imageBase64}` // Directly use the Base64 image
                      : "https://via.placeholder.com/150"
                  }
                  alt={book.title}
                  sx={{
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
                    Rs:{book.price || "N/A"}
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
                    <ProductActionIcons productId={book.id} />
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
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
