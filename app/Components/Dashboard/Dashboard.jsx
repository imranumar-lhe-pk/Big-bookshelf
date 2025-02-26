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
  CircularProgress,
} from "@mui/material";
import {
  Upload as UploadIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import Footer from "../LandingPage/Footer";
import NavBar from "../LandingPage/NavBar";
import {
  db,
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  query,
  where,
  auth,
} from "../../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import MyBooks from "./MyBooks";
import { useAuth } from "../../Context/AuthContext"; // Adjust path

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [books, setBooks] = useState([]);
  const [errors, setErrors] = useState({ general: "" });
  const [openMyBooks, setOpenMyBooks] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    price: "",
    image: null,
    pdf: null,
    pickupAddress: "",
    type: "",
    description: "",
    category: "",
    publisher: "",
    author: "",
  });
  const [editingBookId, setEditingBookId] = useState(null);

  useEffect(() => {
    if (!user) {
      setBooks([]);
      return;
    }

    const q = query(collection(db, "books"), where("uid", "==", user.uid));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const booksData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBooks(booksData);
      },
      (error) => {
        console.error("Error fetching user's books:", error);
        setBooks([]);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64String = reader.result;
        console.log(`Base64 ${field} (first 50 chars):`, base64String.substring(0, 50) + "..."); // Debug log
        setNewBook((prev) => ({
          ...prev,
          [field]: base64String,
        }));
      };
    }
  };

  const handleUploadBook = async () => {
    console.log("Current User ID:", user?.uid);
    if (!user) {
      setErrors({ general: "Please log in to upload a book." });
      return;
    }

    if (
      !newBook.title ||
      !newBook.price ||
      !newBook.type ||
      !newBook.description ||
      !newBook.category ||
      !newBook.publisher ||
      !newBook.author ||
      (newBook.type === "Soft Copy" && !newBook.pdf) ||
      (newBook.type === "Hard Copy" && !newBook.pickupAddress)
    ) {
      setErrors({
        general: "",
        title: !newBook.title ? "Title is required" : "",
        price: !newBook.price ? "Price is required" : "",
        type: !newBook.type ? "Type is required" : "",
        description: !newBook.description ? "Description is required" : "",
        category: !newBook.category ? "Category is required" : "",
        publisher: !newBook.publisher ? "Publisher is required" : "",
        author: !newBook.author ? "Author is required" : "",
        pdf: newBook.type === "Soft Copy" && !newBook.pdf ? "PDF is required for soft copy" : "",
        pickupAddress: newBook.type === "Hard Copy" && !newBook.pickupAddress ? "Pickup address is required for hard copy" : "",
      });
      return;
    }

    try {
      const bookData = {
        uid: user.uid,
        title: newBook.title,
        price: parseFloat(newBook.price),
        imageBase64: newBook.image,
        pdfBase64: newBook.type === "Soft Copy" ? newBook.pdf : null,
        pickupAddress: newBook.type === "Hard Copy" ? newBook.pickupAddress : null,
        type: newBook.type,
        description: newBook.description,
        category: newBook.category,
        publisher: newBook.publisher,
        author: newBook.author,
      };
      console.log("Uploading book with data:", {
        ...bookData,
        pdfBase64: bookData.pdfBase64 ? bookData.pdfBase64.substring(0, 50) + "..." : null,
      });
      const docRef = await addDoc(collection(db, "books"), bookData);
      console.log("Book added successfully with ID:", docRef.id);
      resetForm();
    } catch (error) {
      console.error("Detailed error uploading book:", error.code, error.message);
      setErrors({ general: `Failed to upload book: ${error.message}` });
    }
  };

  const handleEditBook = (book) => {
    setNewBook({
      id: book.id,
      title: book.title,
      price: book.price,
      image: book.imageBase64,
      pdf: book.pdfBase64 || null,
      pickupAddress: book.pickupAddress || "",
      type: book.type,
      description: book.description,
      category: book.category,
      publisher: book.publisher,
      author: book.author,
    });
    setEditingBookId(book.id);
  };

  const handleSaveEditedBook = async () => {
    try {
      if (!newBook.id) {
        console.error("Book ID is missing");
        return;
      }

      const bookDocRef = doc(db, "books", newBook.id);
      await updateDoc(bookDocRef, {
        uid: user.uid,
        title: newBook.title,
        price: parseFloat(newBook.price),
        imageBase64: newBook.image,
        pdfBase64: newBook.type === "Soft Copy" ? newBook.pdf : null,
        pickupAddress: newBook.type === "Hard Copy" ? newBook.pickupAddress : null,
        type: newBook.type,
        description: newBook.description,
        category: newBook.category,
        publisher: newBook.publisher,
        author: newBook.author,
      });

      resetForm();
      setEditingBookId(null);
    } catch (error) {
      console.error("Error updating book:", error);
      setErrors({ general: "Failed to update book: " + error.message });
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      const bookRef = doc(db, "books", id);
      await deleteDoc(bookRef);
    } catch (error) {
      console.error("Error deleting book: ", error);
      setErrors({ general: "Failed to delete book: " + error.message });
    }
  };

  const resetForm = () => {
    setNewBook({
      title: "",
      price: "",
      image: null,
      pdf: null,
      pickupAddress: "",
      type: "",
      description: "",
      category: "",
      publisher: "",
      author: "",
    });
    setErrors({ general: "" });
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          bgcolor: "#f4f5f7",
        }}
      >
        <CircularProgress size={60} sx={{ color: "#1976d2", mb: 2 }} />
        <Typography variant="h6" color="textSecondary">
          Loading Dashboard...
        </Typography>
      </Box>
    );
  }

  if (!user) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
        Please log in to view your dashboard.
      </Typography>
    );
  }

  return (
    <Grid
      container
      className="min-h-screen"
      spacing={4}
      sx={{ backgroundColor: "#f4f5f7", p: 3 }}
    >
      <NavBar />
      <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, ml: 4 }}>
          <Box display="flex" alignItems="center" gap={2} mb={4}>
            <Avatar sx={{ width: 56, height: 56, bgcolor: "primary.main" }}>
              {user.displayName
                ? user.displayName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
                : "U"}
            </Avatar>
            <Box>
              <Typography variant="h8" fontWeight="bold">
                Hey, {user.displayName || "User"}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Total Ads: {books.length}
              </Typography>
            </Box>
          </Box>

          <Card variant="outlined" sx={{ padding: 3, borderRadius: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              {editingBookId ? "Edit Book" : "Upload New Book"}
            </Typography>
            {errors.general && (
              <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                {errors.general}
              </Typography>
            )}
            <TextField
              label="Book Title"
              fullWidth
              value={newBook.title}
              onChange={(e) =>
                setNewBook({ ...newBook, title: e.target.value })
              }
              margin="normal"
              error={!!errors.title}
              helperText={errors.title}
            />
            <TextField
              label="Price"
              type="number"
              fullWidth
              value={newBook.price}
              onChange={(e) =>
                setNewBook({ ...newBook, price: e.target.value })
              }
              margin="normal"
              error={!!errors.price}
              helperText={errors.price}
            />
            <TextField
              label="Description"
              fullWidth
              value={newBook.description}
              onChange={(e) =>
                setNewBook({ ...newBook, description: e.target.value })
              }
              margin="normal"
              error={!!errors.description}
              helperText={errors.description}
            />
            <TextField
              label="Category"
              fullWidth
              value={newBook.category}
              onChange={(e) =>
                setNewBook({ ...newBook, category: e.target.value })
              }
              margin="normal"
              error={!!errors.category}
              helperText={errors.category}
            />
            <TextField
              label="Publisher Name"
              fullWidth
              value={newBook.publisher}
              onChange={(e) =>
                setNewBook({ ...newBook, publisher: e.target.value })
              }
              margin="normal"
              error={!!errors.publisher}
              helperText={errors.publisher}
            />
            <TextField
              label="Author Name"
              fullWidth
              value={newBook.author}
              onChange={(e) =>
                setNewBook({ ...newBook, author: e.target.value })
              }
              margin="normal"
              error={!!errors.author}
              helperText={errors.author}
            />
            <TextField
              label="Book Image (JPG or PNG)"
              type="file"
              InputLabelProps={{ shrink: true }}
              fullWidth
              inputProps={{ accept: "image/jpeg,image/png" }}
              onChange={(e) => handleFileChange(e, "image")}
              margin="normal"
            />
            <Typography variant="body1" gutterBottom>
              Book Type
            </Typography>
            <RadioGroup
              row
              value={newBook.type}
              onChange={(e) => setNewBook({ ...newBook, type: e.target.value })}
            >
              <FormControlLabel
                value="Soft Copy"
                control={<Radio />}
                label="Soft Copy"
              />
              <FormControlLabel
                value="Hard Copy"
                control={<Radio />}
                label="Hard Copy"
              />
            </RadioGroup>
            {newBook.type === "Soft Copy" && (
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
            {newBook.type === "Hard Copy" && (
              <TextField
                label="Pickup Address (Required for Hard Copy)"
                fullWidth
                value={newBook.pickupAddress}
                onChange={(e) =>
                  setNewBook({ ...newBook, pickupAddress: e.target.value })
                }
                margin="normal"
                error={!!errors.pickupAddress}
                helperText={errors.pickupAddress}
              />
            )}
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, backgroundColor: "#3f51b5" }}
              onClick={editingBookId ? handleSaveEditedBook : handleUploadBook}
            >
              <UploadIcon sx={{ marginRight: 1 }} />{" "}
              {editingBookId ? "Save Changes" : "Upload Book"}
            </Button>
          </Card>
        </Paper>
      </Grid>

      <Grid item xs={12} md={8}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography fontWeight={"Bold"} fontSize={"25px"}>
            Running Ads
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenMyBooks(true)}
          >
            My Books
          </Button>
        </Grid>
        <MyBooks open={openMyBooks} handleClose={() => setOpenMyBooks(false)} />

        <Grid container spacing={3}>
          {books.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book.id}>
              <Card variant="outlined" sx={{ padding: 3 }}>
                <img
                  src={book.imageBase64}
                  alt={book.title}
                  style={{ width: "100%", height: "auto", marginBottom: 10 }}
                />
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {book.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Author: {book.author}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Price: Rs {book.price}
                </Typography>
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditBook(book)}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteBook(book.id)}
                    sx={{ ml: 2 }}
                  >
                    <DeleteIcon />
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Footer />
      </Box>
    </Grid>
  );
}