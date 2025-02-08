"use client";

import { useState, useEffect } from "react";
import {
  Avatar,
  Card,
  Button,
  TextField,
  Typography,
  Radio,
  FormControlLabel,
  RadioGroup,
  Paper,
  Grid,
  Box,
} from "@mui/material";
import { Upload as UploadIcon } from "@mui/icons-material";
import Footer from "../LandingPage/Footer";
import NavBar from "../LandingPage/NavBar";
import { db, collection, addDoc, onSnapshot } from "../../firebase/config"; // Import Firestore methods
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Firebase Storage methods
import { storage } from "../../firebase/config"; // Ensure you have the Firebase storage configuration

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [errors, setErrors] = useState({});
  const [newBook, setNewBook] = useState({
    title: "",
    price: "",
    image: null,
    pdf: null,
    type: "",
  });

  useEffect(() => {
    // Listen for changes in Firestore collection and update books state
    const unsubscribe = onSnapshot(collection(db, "books"), (snapshot) => {
      const booksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(booksData);
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    setNewBook((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  const handleUploadBook = async () => {
    // Form validation
    if (!newBook.title || !newBook.price || !newBook.type) {
      setErrors({
        ...errors,
        title: !newBook.title ? "Title is required" : "",
        price: !newBook.price ? "Price is required" : "",
        type: !newBook.type ? "Type is required" : "",
      });
      return;
    }

    try {
      // Upload image
      let imageUrl = "";
      // if (newBook.image) {
      //   const imageRef = ref(storage, `books/${newBook.image.name}`);
      //   await uploadBytes(imageRef, newBook.image);
      //   imageUrl = await getDownloadURL(imageRef);
      // }

      // Upload PDF if soft type
      let pdfUrl = "";
      // if (newBook.type === "soft" && newBook.pdf) {
      //   const pdfRef = ref(storage, `books/${newBook.pdf.name}`);
      //   await uploadBytes(pdfRef, newBook.pdf);
      //   pdfUrl = await getDownloadURL(pdfRef);
      // }

      // Save book data to Firestore
      await addDoc(collection(db, "books"), {
        title: newBook.title,
        price: newBook.price,
        imageUrl,
        pdfUrl,
        type: newBook.type,
      });

      // Reset form after successful upload
      setNewBook({
        title: "",
        price: "",
        image: null,
        pdf: null,
        type: "",
      });
    } catch (error) {
      console.error("Error uploading book: ", error);
    }
  };

  return (
    <Grid container className="min-h-screen" spacing={4} sx={{ backgroundColor: "#f4f5f7", p: 3 }}>
      <NavBar />

      {/* Left Sidebar */}
      <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, ml: 4 }}>
          <Box display="flex" alignItems="center" gap={2} mb={4}>
            <Avatar sx={{ width: 56, height: 56 }} src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde" />
            <Box>
              <Typography variant="h6" fontWeight="bold">
                Hey, John Doe
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Total Ads: {books.length}
              </Typography>
            </Box>
          </Box>

          {/* Upload Form */}
          <Card variant="outlined" sx={{ padding: 3, borderRadius: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Upload New Book
            </Typography>

            <TextField
              label="Book Title"
              fullWidth
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              margin="normal"
              error={!!errors.title}
              helperText={errors.title}
            />

            <TextField
              label="Price"
              type="number"
              fullWidth
              value={newBook.price}
              onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
              margin="normal"
              error={!!errors.price}
              helperText={errors.price}
            />

            <TextField
              label="Book Image (JPG or PNG)"
              type="file"
              InputLabelProps={{ shrink: true }}
              fullWidth
              inputProps={{ accept: "image/jpeg,image/png" }}
              onChange={(e) => handleFileChange(e, "image")}
              margin="normal"
              error={!!errors.image}
              helperText={errors.image}
            />

            <Typography variant="body1" gutterBottom>
              Book Type
            </Typography>
            <RadioGroup
              row
              value={newBook.type}
              onChange={(e) => setNewBook({ ...newBook, type: e.target.value })}
            >
              <FormControlLabel value="soft" control={<Radio />} label="Soft Copy" />
              <FormControlLabel value="hard" control={<Radio />} label="Hard Copy" />
            </RadioGroup>
            {errors.type && <Typography color="error">{errors.type}</Typography>}

            {newBook.type === "soft" && (
              <TextField
                label="Upload PDF (Required for Soft Copy)"
                type="file"
                InputLabelProps={{ shrink: true }}
                fullWidth
                inputProps={{ accept: "application/pdf" }}
                onChange={(e) => handleFileChange(e, "pdf")}
                margin="normal"
                error={!!errors.pdf}
                helperText={errors.pdf}
              />
            )}

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, backgroundColor: "#3f51b5" }}
              onClick={handleUploadBook}
            >
              <UploadIcon sx={{ marginRight: 1 }} /> Upload Book
            </Button>
          </Card>
        </Paper>
      </Grid>

      {/* Main Content - Book Listings */}
      <Grid item xs={12} md={8}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Running Ads
        </Typography>
        <Grid container spacing={3}>
          {books.map((book) => (
            <Grid item xs={12} sm={6} key={book.id}>
              <Paper elevation={2} sx={{ padding: 3 }}>
                <Typography variant="h6">{book.title}</Typography>
                <Typography variant="body1">${book.price}</Typography>
                {book.imageUrl && (
                  <Box
                    component="img"
                    src={book.imageUrl}
                    alt="Book Image"
                    sx={{ maxWidth: "30%", height: "auto", my: 2 }}
                  />
                )}
                {book.type === "soft" && book.pdfUrl && (
                  <Typography variant="body2" color="textSecondary">
                    PDF Available
                  </Typography>
                )}
                <Button variant="contained" sx={{ mt: 2 }}>
                  View Details
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Footer />
    </Grid>
  );
}
