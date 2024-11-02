import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Box, Typography } from '@mui/material';

const FeedbackForm = ({ orchidId }) => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const feedbackData = {
      rating: parseInt(rating),
      comment: comment,
      author: 'user@example.com', // Replace with actual user info
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch(`https://670ddcdb073307b4ee44b093.mockapi.io/OrchidResources/${orchidId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      alert('Feedback submitted successfully');
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting feedback');
    } finally {
      setLoading(false);
      setRating('');
      setComment('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 400 }}>
      <Typography variant="h6">Submit Your Feedback</Typography>
      <FormControl fullWidth required>
        <InputLabel>Rating</InputLabel>
        <Select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          label="Rating"
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <MenuItem key={value} value={value}>{value}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        multiline
        rows={4}
        required
      />
      <Button type="submit" variant="contained" color="primary" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Feedback'}
      </Button>
    </Box>
  );
};

export default FeedbackForm;
