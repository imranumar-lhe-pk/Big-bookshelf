import React, { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';

function ReviewButton() {
  const [showForm, setShowForm] = useState(false);
  const [review, setReview] = useState('');
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const handleButton = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the submitted review here
    const reviewData = {
      name,
      avatarUrl,
      review,
    };
    console.log('Review submitted:', reviewData);

    // Clear the form fields and hide it after submission
    setReview('');
    setName('');
    setAvatarUrl('');
    setShowForm(false);
  };

  return (
    <Box display={'flex'} flexDirection="column" mr={6} mt={5}>
      <Box display="flex" justifyContent="space-between">
        <Typography fontSize={'18px'}>READERS REVIEW</Typography>
        {!showForm && (
          <Button
            onClick={handleButton}
            sx={{ border: '1px solid #2A2C2E', color: '#2A2C2E' }}
          >
            ADD REVIEW
          </Button>
        )}
      </Box>

      {showForm && (
        <Box component="form" onSubmit={handleSubmit} mt={2}>
          <TextField
            fullWidth
            label="Your Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Avatar URL"
            variant="outlined"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Your Review"
            variant="outlined"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            sx={{ border: '1px solid #2A2C2E', color: '#2A2C2E' }}
          >
            Submit Review
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default ReviewButton;
