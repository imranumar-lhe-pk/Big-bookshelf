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
  Badge,
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
} from "../../firebase/config";

import { doc, updateDoc } from "firebase/firestore";
import MyBooks from './MyBooks'

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [errors, setErrors] = useState({});
  const [openMyBooks, setOpenMyBooks] = useState(false); // State for modal
  const [newBook, setNewBook] = useState({
    title: "",
    price: "",
    image: null,
    pdf: null,
    type: "",
    description: "",
    category: "",
    publisher: "",
    author: "",
  });

  const [editingBookId, setEditingBookId] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "books"), (snapshot) => {
      const booksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(booksData);
    });
    return () => unsubscribe();
  }, []);

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setNewBook((prev) => ({
          ...prev,
          [field]: reader.result,
        }));
      };
    }
  };

  const handleUploadBook = async () => {
    if (
      !newBook.title ||
      !newBook.price ||
      !newBook.type ||
      !newBook.description ||
      !newBook.category ||
      !newBook.publisher ||
      !newBook.author
    ) {
      setErrors({
        title: !newBook.title ? "Title is required" : "",
        price: !newBook.price ? "Price is required" : "",
        type: !newBook.type ? "Type is required" : "",
        description: !newBook.description ? "Description is required" : "",
        category: !newBook.category ? "Category is required" : "",
        publisher: !newBook.publisher ? "Publisher is required" : "",
        author: !newBook.author ? "Author is required" : "",
      });
      return;
    }

    try {
      await addDoc(collection(db, "books"), {
        title: newBook.title,
        price: parseFloat(newBook.price),
        imageBase64: newBook.image,
        pdfBase64: newBook.pdf,
        type: newBook.type,
        description: newBook.description,
        category: newBook.category,
        publisher: newBook.publisher,
        author: newBook.author,
      });

      setNewBook({
        title: "",
        price: "",
        image: null,
        pdf: null,
        type: "",
        description: "",
        category: "",
        publisher: "",
        author: "",
      });
    } catch (error) {
      console.error("Error uploading book: ", error);
    }
  };

  const handleEditBook = (book) => {
    setNewBook({
      id: book.id,
      title: book.title,
      price: book.price,
      image: book.imageBase64,
      pdf: book.pdfBase64,
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
        title: newBook.title,
        price: parseFloat(newBook.price),
        imageBase64: newBook.image,
        pdfBase64: newBook.pdf,
        type: newBook.type,
        description: newBook.description,
        category: newBook.category,
        publisher: newBook.publisher,
        author: newBook.author,
      });

      setNewBook({
        id: newBook.id,
        title: "",
        price: "",
        image: null,
        pdf: null,
        type: "",
        description: "",
        category: "",
        publisher: "",
        author: "",
      });

      setEditingBookId(null);
    } catch (error) {
      console.error("Error updating book: ", error);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      const bookRef = doc(db, "books", id);
      await deleteDoc(bookRef);
    } catch (error) {
      console.error("Error deleting book: ", error);
    }
  };

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
            <Avatar
              sx={{ width: 56, height: 56 }}
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
            />
            <Box>
              <Typography variant="h6" fontWeight="bold">
                Hey, Imran
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
                setNewBook({ ...newBook, author: e.target.value }) }
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

            {newBook.type === "soft" && (
              <TextField
                label="Upload PDF (Required for Soft Copy)"
                type="file"
                InputLabelProps={{ shrink: true }}
                fullWidth
                inputProps={{ accept: "application/pdf" }}
                onChange={(e) => handleFileChange(e, "pdf")}
                margin="normal"
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
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography fontWeight={"Bold"} fontSize={"25px"}>Running Ads</Typography>
        <Button variant="contained" color="primary" onClick={() => setOpenMyBooks(true)}>
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
                  Price: Rs{book.price}
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
