import React from "react";
import { Box, TextField, Button, Typography, Container, Grid, IconButton } from "@mui/material";
import { Send as SendIcon, Phone as PhoneIcon, Email as EmailIcon, LocationOn as LocationOnIcon } from "@mui/icons-material";

function ContactPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 5,
        background: "linear-gradient(to right, #f0f4f8, #d9e2ec)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="md">
        {/* Page Heading */}
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
          Contact Us
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary" gutterBottom>
          We're here to help. Reach out with any questions or feedback.
        </Typography>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                p: 3,
                borderRadius: 2,
                boxShadow: 3,
                bgcolor: "white",
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                required
                sx={{
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#3f51b5",
                  },
                }}
              />
              <TextField
                label="Email Address"
                type="email"
                variant="outlined"
                fullWidth
                required
                sx={{
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#3f51b5",
                  },
                }}
              />
              <TextField
                label="Subject"
                variant="outlined"
                fullWidth
                required
                sx={{
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#3f51b5",
                  },
                }}
              />
              <TextField
                label="Message"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                required
                sx={{
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#3f51b5",
                  },
                }}
              />

              <Button
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
                sx={{ mt: 2, alignSelf: "flex-start", borderRadius: 2 }}
              >
                Send Message
              </Button>
            </Box>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                p: 3,
                borderRadius: 2,
                boxShadow: 3,
                bgcolor: "white",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
                Contact Information
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <PhoneIcon color="primary" sx={{ mr: 2 }} />
                <Typography variant="body1" color="textSecondary">
                  +1 (234) 567-890
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <EmailIcon color="primary" sx={{ mr: 2 }} />
                <Typography variant="body1" color="textSecondary">
                  contact@example.com
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LocationOnIcon color="primary" sx={{ mr: 2 }} />
                <Typography variant="body1" color="textSecondary">
                  1234 Example St, City, Country
                </Typography>
              </Box>

              {/* Social Media Links */}
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1, color: "#333" }}>
                  Follow Us
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <IconButton href="https://facebook.com" color="primary" target="_blank">
                    <i className="fab fa-facebook-f"></i>
                  </IconButton>
                  <IconButton href="https://twitter.com" color="primary" target="_blank">
                    <i className="fab fa-twitter"></i>
                  </IconButton>
                  <IconButton href="https://instagram.com" color="primary" target="_blank">
                    <i className="fab fa-instagram"></i>
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ContactPage;
