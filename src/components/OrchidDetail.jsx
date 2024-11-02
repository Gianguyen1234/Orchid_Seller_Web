import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Typography, Card, CardMedia, CardContent, Button, Divider, Grid } from "@mui/material";
import FeedbackForm from "./FeedbackForm"; // Import the new FeedbackForm component

const OrchidDetail = ({ loggedInUserEmail }) => {
  const { id } = useParams();
  const [orchid, setOrchid] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleFeedbackSubmit = async (feedback) => {
    try {
      const newFeedback = {
        rating: feedback.rating,
        comment: feedback.comment,
        author: loggedInUserEmail,
        date: new Date().toISOString(),
        orchidId: id // Include the orchid ID if necessary
      };
  
      const response = await fetch(`https://670ddcdb073307b4ee44b093.mockapi.io/OrchidResources/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFeedback)
      });
  
      if (!response.ok) throw new Error('Failed to submit feedback');
  
      const createdFeedback = await response.json();
      // Optionally update local state or handle success UI feedback
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!orchid) return <Typography variant="h6" color="error">Orchid not found.</Typography>;

  return (
    <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Card sx={{ maxWidth: 900, borderRadius: 3, boxShadow: 4, padding: 3, backgroundColor: '#fdfdfd' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              height="100%"
              image={orchid.image}
              alt={orchid.orchidName}
              sx={{ borderRadius: 2, objectFit: 'cover' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardContent>
              <Typography variant="h4" component="div" fontWeight="bold" gutterBottom>
                {orchid.orchidName}
              </Typography>
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

        {/* Feedback Form */}
        {/* <FeedbackForm 
          orchidId={id}
          loggedInUserEmail={loggedInUserEmail}
          onFeedbackSubmit={handleFeedbackSubmit}
        /> */}
        <FeedbackForm orchidId="1" />
      </Box>
    </Box>
  );
};

export default OrchidDetail;
