import React from 'react';
import { Avatar, Card, CardContent, Typography, Rating, Button, Grid, Box } from '@mui/material';

// Array of review data
const reviews = [
  {
    id: 1,
    name: 'Geoffrey Mott',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    reviewText: 'Muscle by Alan Trotter is a fresh piece of noir fiction. Our main characters are the two crooks Box and _____. They are on the hunt for odd jobs that most of us, hopefully, would not be willing to fulfill. It felt reminiscent of both A Clockwork Orange and The Time Machine. I guess that can seem like a strange combination, but Alan Trotter made it work...',
    date: '10 October 2022',
    rating: 4,
  },
  {
    id: 2,
    name: 'Sophia Johnson',
    avatarUrl: 'https://i.pravatar.cc/150?img=2',
    reviewText: 'The book was an exciting journey into the depths of human psyche. The author paints a vivid picture of the emotions and struggles that people face in difficult situations.',
    date: '12 November 2022',
    rating: 5,
  },
  {
    id: 3,
    name: 'John Doe',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    reviewText: 'A bit slow at the start, but it really picks up in the middle. The characters were well-written and believable. Definitely worth a read if you enjoy character-driven stories.',
    date: '23 September 2022',
    rating: 3,
  },
  {
    id: 4,
    name: 'Emily Clark',
    avatarUrl: 'https://i.pravatar.cc/150?img=4',
    reviewText: 'A refreshing take on an old genre. The world-building was impressive and I couldn’t put the book down once the story started rolling. Looking forward to reading more from this author.',
    date: '28 August 2022',
    rating: 4,
  },
];

// ReviewCard component to render each review dynamically
const ReviewCard = ({ reviewerName, avatarUrl, reviewText, date, rating }) => {
  return (
    <Card sx={{ maxWidth: 500, marginBottom: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Avatar src={avatarUrl} alt={reviewerName} sx={{ marginRight: 2 }} />
            <Box>
              <Typography variant="h6">{reviewerName}</Typography>
              <Typography variant="caption" color="textSecondary">
                {date}
              </Typography>
            </Box>
          </Box>
          <Rating name="read-only" value={rating} readOnly size="small" />
        </Box>
        <Typography variant="body2" color="textSecondary" component="p">
          {reviewText}
        </Typography>
        <Button size="small">Read More</Button>
      </CardContent>
    </Card>
  );
};

// ReviewsSection component to render the grid of reviews
const ReviewsSection = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={2}>
        {/* Map through the reviews array and render a ReviewCard for each review */}
        {reviews.map((review) => (
          <Grid item xs={12} sm={6} key={review.id}>
            <ReviewCard
              reviewerName={review.name}
              avatarUrl={review.avatarUrl}
              reviewText={review.reviewText}
              date={review.date}
              rating={review.rating}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ReviewsSection;
