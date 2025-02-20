"use client";

import { useState, useEffect } from "react";
import { Modal, Box, Typography, Grid, Card, Button } from "@mui/material";
import { db, collection, onSnapshot } from "../../firebase/config";

export default function MyBooks({ open, handleClose }) {
  const [purchasedBooks, setPurchasedBooks] = useState([]);

  useEffect(() => {
    if (open) {
      const unsubscribe = onSnapshot(collection(db, "purchasedBooks"), (snapshot) => {
        const booksData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPurchasedBooks(booksData);
      });

      return () => unsubscribe();
    }
  }, [open]);

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
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          My Purchased Books
        </Typography>

        {purchasedBooks.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            No books purchased yet.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {purchasedBooks.map((book) => (
              <Grid item xs={12} sm={6} key={book.id}>
                <Card variant="outlined" sx={{ p: 2 }}>
                  <img src={book.imageBase64} alt={book.title} style={{ width: "100%", height: "auto" }} />
                  <Typography variant="h6" fontWeight="bold">
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Author: {book.author}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Price: Rs {book.price}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Box mt={3} sx={{ textAlign: "right" }}>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
