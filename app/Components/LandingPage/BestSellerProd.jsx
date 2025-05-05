"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  IconButton,
  Box,
  Skeleton,
} from "@mui/material";
import { FaRegBookmark } from "react-icons/fa";
import ProductActionIcons from "./ProductActionIcons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {  useBookmark } from "../../Context/BookMarkContext";

const BestSellerProd = () => {
  const router = useRouter();
  const { addBookmark,setAllBooks } = useBookmark();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const skeletonStyles = {
    borderRadius: "16px",
    bgcolor: "grey.300",
    p: 2,
    height: 330,
  };

  const cardStyles = {
    height: "100%",
    boxShadow: 3,
    borderRadius: 2,
    position: "relative",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: 6,
    },
  };

  const handleBookmarkClick = (event, product) => {
    event.stopPropagation();
    addBookmark(product);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookSnapshot = await getDocs(collection(db, "books"));
        const bookList = bookSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBooks(bookList);
        setAllBooks(bookList);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setAllBooks]);

  const renderSkeletons = () => (
    Array.from(new Array(8)).map((_, index) => (
      <Grid item xs={12} sm={6} md={3} lg={3} key={index}>
        <Card sx={{ ...cardStyles, width: { sm: "40vw", md: "20vw" } }}>
          <Skeleton variant="rectangular" sx={skeletonStyles} />
          <CardContent>
            <Skeleton variant="text" height={30} sx={{ bgcolor: "grey.300" }} />
            <Skeleton variant="text" height={20} sx={{ bgcolor: "grey.300" }} />
            <Skeleton variant="text" height={20} sx={{ bgcolor: "grey.300" }} />
          </CardContent>
        </Card>
      </Grid>
    ))
  );

  const renderBooks = () => (
    books.slice(0, 8).map((book, index) => (
      <Grid item xs={12} sm={6} md={3} lg={3} key={book.id}>
        <Card sx={{ ...cardStyles, width: { sm: "40vw", md: "20vw" } }}>
          <CardMedia
            component="img"
            image={book.imageBase64 || "https://via.placeholder.com/150"}
            alt={book.book}
            loading="lazy"
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
          <CardContent>
            <Typography variant="h6" fontWeight="bold">{book.title}</Typography>
            <Typography variant="subtitle2" mt={1}>{book.author}</Typography>
            <Typography variant="body2" mt={1}>Rs.{book.price}</Typography>
            <Box mt={1}>
              <ProductActionIcons product={book} />
            </Box>
            <Box>
              <IconButton
                onClick={(event) => handleBookmarkClick(event, book)}
                sx={{
                  position: "absolute",
                  bottom: 23,
                  right: 5,
                  fontSize: { md: "23px", xs: "20px" },
                  color: "white",
                  backgroundColor: "#2A2C2E",
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
                }}
              >
                <FaRegBookmark />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ))
  );

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <Grid container spacing={2}>
            {loading ? renderSkeletons() : renderBooks()}
            {!loading && books.length > 7 && (
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <Link href="/books">
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#F4CE47",
                      transition: "ease-in-out 0.3s",
                      transform: "translateY(0)",
                      "&:hover": {
                        bgcolor: "#e3b600",
                        transform: "translateY(-5px) scale(1.05)",
                      },
                      height: "100%",
                      width: "100%",
                      borderRight: "16px solid transparent",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "black",
                      fontWeight: "bold",
                      p: 2,
                      fontSize: "1.5rem",
                    }}
                  >
                    SEE ALL
                  </Button>
                </Link>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BestSellerProd;
