"use client";
import { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Grid,
  Card,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { db, collection, query, where, onSnapshot } from "../../firebase/config";
import { useAuth } from "../../Context/AuthContext"; // Adjust path
import { MdDownload, MdOpenInNew } from "react-icons/md"; // Icons for read/download

export default function MyBooks({ open, handleClose }) {
  const [purchasedBooks, setPurchasedBooks] = useState([]);
  const [loading, setLoading] = useState(true); // General loading state for initial fetch
  const [loadingBookId, setLoadingBookId] = useState(null); // Track which book is loading for PDF
  const { user } = useAuth();

  useEffect(() => {
    if (open && user) {
      setLoading(true); // Start loading when modal opens
      const q = query(collection(db, "orders"), where("userId", "==", user.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const booksData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPurchasedBooks(booksData);
        console.log("Fetched purchased books:", booksData); // Debug log
        setLoading(false); // Stop loading once data is fetched
      }, (error) => {
        console.error("Error fetching orders:", error);
        setLoading(false); // Stop loading on error
      });

      return () => unsubscribe();
    } else {
      setLoading(false); // Reset loading if modal closes or no user
    }
  }, [open, user]);

  const handleRead = (url, bookId) => {
    console.log("Opening PDF with URL (first 50 chars):", url.substring(0, 50) + "..."); // Debug log
    if (!url) {
      console.error("No softCopyUrl provided");
      return;
    }

    setLoadingBookId(bookId); // Show loader for this book

    const base64Data = url.startsWith("data:application/pdf;base64,")
      ? url.split(",")[1]
      : url;

    try {
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });
      const blobUrl = URL.createObjectURL(blob);
      console.log("Generated Blob URL:", blobUrl); // Debug log

      const newTab = window.open(blobUrl, "_blank");
      if (!newTab) {
        console.error("Failed to open new tab. Pop-up blocked?");
      }

      setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
        setLoadingBookId(null); // Hide loader
      }, 1000);
    } catch (error) {
      console.error("Error converting or opening PDF:", error);
      setLoadingBookId(null); // Hide loader on error
    }
  };

  const handleDownload = (url, bookName) => {
    console.log("Downloading PDF with URL (first 50 chars):", url.substring(0, 50) + "..."); // Debug log
    if (!url) {
      console.error("No softCopyUrl provided for download");
      return;
    }

    const base64Data = url.startsWith("data:application/pdf;base64,")
      ? url.split(",")[1]
      : url;

    try {
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${bookName}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="my-books-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          maxHeight: "80vh",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          My Purchased Books
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress size={40} sx={{ color: "#1976d2" }} />
          </Box>
        ) : purchasedBooks.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            No books purchased yet.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {purchasedBooks.map((book) => (
              <Grid item xs={12} md={6} key={book.id}>
                <Card
                  variant="outlined"
                  sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    height: "100%", // Make sure all cards are the same height
                    flexDirection: "column", // Align content vertically
                  }}
                >
                  <Box sx={{ flex: "0 0 auto", mb: 2 }}>
                    <img
                      src={book.imageUrl}
                      alt={book.bookName}
                      style={{ width: "100px", height: "auto" }}
                    />
                  </Box>
                  <Box sx={{ flex: 1, textAlign: "center" }}>
                    <Typography variant="h6" fontWeight="bold">
                      {book.bookName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Price: Rs {book.price}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                       {book.type}
                    </Typography>
                  </Box>
                  {book.type === "Soft Copy" && (
                    <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                      <IconButton
                        color="primary"
                        onClick={() => handleRead(book.softCopyUrl, book.id)}
                        title="Read"
                        disabled={loadingBookId === book.id}
                      >
                        {loadingBookId === book.id ? (
                          <CircularProgress size={20} sx={{ color: "#1976d2" }} />
                        ) : (
                          <MdOpenInNew />
                        )}
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={() => handleDownload(book.softCopyUrl, book.bookName)}
                        title="Download"
                      >
                        <MdDownload />
                      </IconButton>
                    </Box>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Box mt={3} sx={{ textAlign: "right", width: "100%" }}>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
