import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Typography, Card, CardMedia, CardContent, Button, Divider, Grid, TextField } from "@mui/material";

const OrchidDetail = () => {
  const { id } = useParams();
  const [orchid, setOrchid] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newFeedback, setNewFeedback] = useState({ rating: '', comment: '', author: '' });

  const fetchOrchidDetail = async () => {
    try {
      const response = await fetch(`https://670ddcdb073307b4ee44b093.mockapi.io/OrchidResources/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setOrchid(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrchidDetail();
  }, [id]);

  const handleFeedbackChange = (e) => {
    setNewFeedback({ ...newFeedback, [e.target.name]: e.target.value });
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
  
    // Check if the user has already submitted feedback for this orchid
    const existingFeedback = orchid.feedback?.find(fb => fb.author === loggedInUserEmail);
    if (existingFeedback) {
      alert("You have already submitted feedback for this orchid.");
      return;
    }
  
    try {
      const response = await fetch(`https://670ddcdb073307b4ee44b093.mockapi.io/OrchidResources/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newFeedback, date: new Date().toISOString(), author: loggedInUserEmail })
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }
      const feedback = await response.json();
  
      // Update the orchid feedback locally to show the new feedback immediately
      setOrchid(prevOrchid => ({
        ...prevOrchid,
        feedback: [...(prevOrchid.feedback || []), feedback]
      }));
      setNewFeedback({ rating: '', comment: '', author: '' });
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!orchid) return <Typography variant="h6" color="error">Orchid not found.</Typography>;

  return (
    <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Card 
        sx={{
          maxWidth: 900,
          borderRadius: 3,
          boxShadow: 4,
          padding: 3,
          backgroundColor: '#fdfdfd'
        }}
      >
        <Grid container spacing={3}>
          {/* Image Section */}
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              height="100%"
              image={orchid.image}
              alt={orchid.orchidName}
              sx={{ borderRadius: 2, objectFit: 'cover' }}
            />
          </Grid>

          {/* Details Section */}
          <Grid item xs={12} md={6}>
            <CardContent>
              <Typography variant="h4" component="div" fontWeight="bold" gutterBottom>
                {orchid.orchidName}
              </Typography>

              {/* Display the price prominently */}
              <Typography variant="h5" color="primary" fontWeight="bold" sx={{ mb: 2 }}>
                Price: ${orchid.price}
              </Typography>

              <Typography variant="body1" color="text.secondary" mb={2}>
                {orchid.description}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
                Category: <span style={{ color: "#0066cc" }}>{orchid.category}</span>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
                {orchid.isNatural ? "🌿 Natural: Yes" : "❌ Natural: No"}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 2 }}>
                {orchid.isAttractive ? "💎 Special: Yes" : "❌ Special: No"}
              </Typography>
              <Button 
                variant="contained" 
                sx={{
                  background: "linear-gradient(45deg, #00a8cc, #0066cc)",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "20px",
                  padding: "8px 16px",
                  textTransform: "capitalize",
                  "&:hover": {
                    background: "linear-gradient(45deg, #0066cc, #004999)"
                  },
                  mt: 2,
                  width: "100%"
                }}
                component={Link}
                to="/"
              >
                Back to List
              </Button>
            </CardContent>
          </Grid>
        </Grid>
      </Card>

      {/* Feedback Section */}
      <Box sx={{ marginTop: 4, width: '100%', maxWidth: 900 }}>
        <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
          Feedback
        </Typography>
        {orchid.feedback && orchid.feedback.length === 0 ? (
          <Typography variant="body2" color="text.secondary">No feedback available.</Typography>
        ) : (
          orchid.feedback.map((feedback, index) => (
            <Card key={index} sx={{ marginBottom: 2, padding: 2, boxShadow: 2, borderRadius: 2 }}>
              <Typography variant="body1" fontWeight="bold" mb={1}>
                {feedback.comment}
              </Typography>
              <Typography variant="body2" color="text.secondary">Rating: {feedback.rating}</Typography>
              <Typography variant="body2" color="text.secondary">Author: {feedback.author}</Typography>
              <Typography variant="body2" color="text.secondary">
                Date: {new Date(feedback.date).toLocaleDateString()}
              </Typography>
            </Card>
          ))
        )}

        {/* Add Feedback Form */}
        <Box component="form" onSubmit={handleFeedbackSubmit} sx={{ marginTop: 4 }}>
          <Typography variant="h6" gutterBottom>Add Your Feedback</Typography>
          <TextField
            name="rating"
            label="Rating (1-5)"
            variant="outlined"
            value={newFeedback.rating}
            onChange={handleFeedbackChange}
            required
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            name="comment"
            label="Comment"
            variant="outlined"
            value={newFeedback.comment}
            onChange={handleFeedbackChange}
            required
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            name="author"
            label="Author"
            variant="outlined"
            value={newFeedback.author}
            onChange={handleFeedbackChange}
            required
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary">Submit Feedback</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default OrchidDetail;
