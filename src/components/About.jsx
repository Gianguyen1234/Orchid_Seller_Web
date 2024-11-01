import React from 'react';
import { Box, Typography, Grid, Paper, Avatar, Button } from '@mui/material';
import Typewriter from 'react-typewriter-effect';

const teamMembers = [
  {
    name: 'John Doe',
    role: 'Founder & CEO',
    description: 'With over 10 years of experience in horticulture, John is passionate about orchids and sustainability.',
    avatar: 'https://via.placeholder.com/100',
  },
  {
    name: 'Jane Smith',
    role: 'Head of Marketing',
    description: 'Jane is an expert in digital marketing and leads our outreach efforts to spread the love for orchids.',
    avatar: 'https://via.placeholder.com/100',
  },
  {
    name: 'Emily Johnson',
    role: 'Customer Support',
    description: 'Emily ensures our customers have the best experience, providing guidance and support.',
    avatar: 'https://via.placeholder.com/100',
  },
];

function AboutPage() {
  return (
    <Box sx={{ padding: 4, backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: 2 }}>
      {/* Title Section */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2, color: '#333', textAlign: 'center' }}>
        About Us
      </Typography>
      
      {/* Typing Animation with Custom Color */}
      <Typography variant="h6" sx={{ marginBottom: 2, textAlign: 'center' }}>
        <Typewriter
          text="We provide a wide variety of premium orchids and plant care guides."
          typingSpeed={50}
          cursorColor="#90caf9"
          eraseSpeed={50}
          eraseDelay={2000}
          typingDelay={100}
          repeat={Infinity}
          textStyle={{ color: '#00796b', fontWeight: 'bold' }}  // Set text color and style here
        />
      </Typography>

      {/* Our History Card */}
      <Paper elevation={3} sx={{ marginTop: 4, padding: 3, backgroundColor: '#ffffff', borderRadius: '8px' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2, color: '#00796b' }}>
          Our History
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.6 }}>
          Founded in 2010, Orchids Seller started as a small family business dedicated to sharing the love of orchids with our community. Over the years, we have expanded our collection and now serve customers across the globe. Our commitment to quality and customer satisfaction remains at the heart of everything we do.
        </Typography>
      </Paper>

      {/* Our Values Card */}
      <Paper elevation={3} sx={{ marginTop: 4, padding: 3, backgroundColor: '#ffffff', borderRadius: '8px' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2, color: '#00796b' }}>
          Our Values
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.6 }}>
          We uphold the following values that guide our operations:
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          <strong>Quality:</strong> We ensure the highest quality in every orchid we sell.
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          <strong>Sustainability:</strong> We practice environmentally friendly methods in our operations.
        </Typography>
        <Typography variant="body1">
          <strong>Community:</strong> We believe in building a community of orchid lovers through engagement and education.
        </Typography>
      </Paper>

      {/* Team Section */}
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: 4, marginBottom: 2, color: '#444', textDecoration: 'underline' }}>
        Meet Our Team
      </Typography>
      <Grid container spacing={4}>
        {teamMembers.map((member) => (
          <Grid item xs={12} sm={6} md={4} key={member.name}>
            <Paper elevation={3} sx={{ padding: 2, textAlign: 'center', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)', boxShadow: 10, backgroundColor: '#e0f7fa' } }}>
              <Avatar alt={member.name} src={member.avatar} sx={{ width: 100, height: 100, margin: '0 auto', border: '2px solid #90caf9', boxShadow: 1 }} />
              <Typography variant="h6" sx={{ marginTop: 2, color: '#333', fontWeight: 'bold' }}>
                {member.name}
              </Typography>
              <Typography variant="subtitle1" sx={{ fontStyle: 'italic', color: '#555' }}>
                {member.role}
              </Typography>
              <Typography variant="body2" sx={{ marginTop: 1, color: '#666', lineHeight: 1.5 }}>
                {member.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Mission Statement Section */}
      <Box sx={{ marginTop: 4, backgroundColor: '#e0f7fa', borderRadius: '8px', padding: 2, boxShadow: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2, color: '#00796b' }}>
          Our Mission
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.6 }}>
          Our mission is to cultivate a community that appreciates the beauty of orchids and provide them with the resources to thrive. We strive to be your go-to source for everything related to orchids and plant care.
        </Typography>
        <Button variant="contained" sx={{ marginTop: 2, backgroundColor: '#00796b', '&:hover': { backgroundColor: '#004d40' } }} onClick={() => alert("Join our newsletter!")}>
          Join Our Newsletter
        </Button>
      </Box>
    </Box>
  );
}

export default AboutPage;
