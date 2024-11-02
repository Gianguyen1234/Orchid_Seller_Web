import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Typography, Card, CardMedia, CardContent, Button, Divider, Grid , Paper} from "@mui/material";
import FeedbackForm from "./FeedbackForm";
import { UserAuth } from './services/AuthContext';

const OrchidDetail = () => {
  const { user } = UserAuth();
  const { id } = useParams();
  const [orchid, setOrchid] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loggedInUserEmail = user ? user.email : '';


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
        orchidId: id
      };
  
      const response = await fetch(`https://6724468e493fac3cf24db97b.mockapi.io/feedback`, {
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
      <Card sx={{ maxWidth: 1200, borderRadius: 3, boxShadow: 4, padding: 3, backgroundColor: '#fdfdfd' }}>
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
      <Box sx={{ width: '100%', maxWidth: 900, mt: 4 }}>
  <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
    <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
      Feedback
    </Typography>
    <FeedbackForm 
      orchidId={id} 
      loggedInUserEmail={loggedInUserEmail}
      onFeedbackSubmit={handleFeedbackSubmit} 
    />
  </Paper>
</Box>

    </Box>
  );
};

export default OrchidDetail;
