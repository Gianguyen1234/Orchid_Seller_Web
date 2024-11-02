import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Typography,
  CircularProgress,
  Paper,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Rating,
  Stack,
  Divider,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { deepPurple } from '@mui/material/colors';
import { AccountCircle } from '@mui/icons-material';

const FeedbackForm = ({ orchidId, loggedInUserEmail }) => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [feedbackList, setFeedbackList] = useState([]);
  const [hasSubmittedFeedback, setHasSubmittedFeedback] = useState(false); // New state for tracking user feedback

  console.log('Logged In User Email:', loggedInUserEmail);

  const fetchFeedback = async () => {
    try {
      const response = await fetch('https://6724468e493fac3cf24db97b.mockapi.io/feedback');
      if (!response.ok) throw new Error('Failed to fetch feedback');
      const data = await response.json();
      // Filter feedback based on orchidId
      const filteredData = data.filter(feedback => feedback.orchidId === orchidId);
      const sortedData = filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
      setFeedbackList(sortedData);

      // Check if the logged-in user has already submitted feedback for this orchidId
      const userFeedback = sortedData.find(feedback => feedback.author === loggedInUserEmail);
      setHasSubmittedFeedback(!!userFeedback); // Set to true if user feedback exists
    } catch (error) {
      console.error('Error fetching feedback:', error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, [orchidId]); // Add orchidId as a dependency

  const formik = useFormik({
    initialValues: {
      rating: '',
      comment: '',
    },
    validationSchema: Yup.object({
      rating: Yup.number().required('Rating is required').min(1, 'Must be between 1 and 5'),
      comment: Yup.string().required('Comment is required').min(10, 'Comment must be at least 10 characters'),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      const feedbackData = {
        ...values,
        author: loggedInUserEmail,
        date: new Date().toISOString(),
        orchidId,  // Include orchidId here
      };

      try {
        const response = await fetch('https://6724468e493fac3cf24db97b.mockapi.io/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(feedbackData),
        });

        if (!response.ok) throw new Error('Failed to submit feedback');

        setFeedbackList((prev) => [feedbackData, ...prev]);
        resetForm();
        alert('Feedback submitted successfully');
        setHasSubmittedFeedback(true); // Set to true after successful submission
      } catch (error) {
        console.error('Error:', error);
        alert('Error submitting feedback');
      } finally {
        setLoading(false);
      }
    },
  });

  // Check if user is logged in
  const isLoggedIn = !!loggedInUserEmail;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%', maxWidth: 600, margin: 'auto' }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center', color: 'primary.main' }}>
            Submit Your Feedback
          </Typography>
          {isLoggedIn ? (
            <>
              {hasSubmittedFeedback ? (
                <Typography color="error" textAlign="center">You have already submitted feedback for this orchid.</Typography>
              ) : (
                <>
                  <FormControl fullWidth error={formik.touched.rating && Boolean(formik.errors.rating)}>
                    <InputLabel>Rating</InputLabel>
                    <Select
                      label="Rating"
                      name="rating"
                      value={formik.values.rating}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      {[1, 2, 3, 4, 5].map((value) => (
                        <MenuItem key={value} value={value}>{value}</MenuItem>
                      ))}
                    </Select>
                    {formik.touched.rating && formik.errors.rating && <Typography color="error">{formik.errors.rating}</Typography>}
                  </FormControl>
                  <TextField
                    label="Comment"
                    name="comment"
                    value={formik.values.comment}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    multiline
                    rows={4}
                    error={formik.touched.comment && Boolean(formik.errors.comment)}
                    helperText={formik.touched.comment && formik.errors.comment}
                  />
                  <Button type="submit" variant="contained" color="primary" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Submit Feedback'}
                  </Button>
                </>
              )}
            </>
          ) : (
            <Typography color="error" textAlign="center">You must be logged in to submit feedback.</Typography>
          )}
        </Box>
      </Paper>

      <Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>Latest Feedback</Typography>
        {fetching ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <CircularProgress />
          </Box>
        ) : feedbackList.length > 0 ? (
          feedbackList.map((feedback, index) => (
            <Card key={index} elevation={3} sx={{ marginBottom: 2 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: deepPurple[500] }}>
                    <AccountCircle />
                  </Avatar>
                }
                title={feedback.author}
                subheader={new Date(feedback.date).toLocaleString()}
              />
              <Divider />
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ marginBottom: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Rating:</Typography>
                  <Rating name="read-only" value={feedback.rating} readOnly />
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                  {feedback.comment}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>No feedback submitted yet.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default FeedbackForm;
