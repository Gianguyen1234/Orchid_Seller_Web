import React, { useState, useEffect } from 'react';
import { UserAuth } from './services/AuthContext';
import { toast } from 'react-toastify';
import {
  Button,
  TextField,
  Avatar,
  Box,
  Typography,
  Paper,
} from '@mui/material';

export default function EditProfile() {
  const { user, updateUserProfile, updateUserEmail } = UserAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setEmail(user.email || '');
      setPhotoURL(user.photoURL || '');
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    try {
      await updateUserProfile(displayName, photoURL);
      await updateUserEmail(email);
      toast.success("Profile updated successfully", { position: "top-center" });
    } catch (error) {
      console.log(error.message);
      toast.error("Error updating profile: " + error.message, { position: "bottom-center" });
    }
  };

  return (
    <Paper elevation={10} sx={{ p: 4, width: 600, height:700, margin: 'auto', borderRadius: 3, mt:4, mb:4,}}>
      <Typography variant="h5" component="h2" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
        Edit Profile
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar
          src={photoURL} // Display the image from the URL
          alt={displayName}
          sx={{
            width: 120,
            height: 120,
            mb: 2,
            border: '2px solid #3f51b5', // Add a border
          }}
        />
        <TextField
          label="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          label="Profile Picture URL" // Accept URL for profile picture
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          required
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateProfile}
          sx={{ mt: 2, bgcolor: '#3f51b5', '&:hover': { bgcolor: '#303f9f' } }} // Change button color
        >
          Save Changes
        </Button>
      </Box>
    </Paper>
  );
}
