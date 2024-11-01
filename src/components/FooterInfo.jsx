// FooterInfo.js
import React from 'react';
import { Box, Typography, Grid, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, Email } from '@mui/icons-material';

function FooterInfo() {
  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(145deg, #141e30, #243b55)',
        color: '#ffffff',
        py: 4,
        px: { xs: 2, md: 8 },
        mt: 0,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',     
      }}
    >
      <Grid container spacing={4} justifyContent="space-between">
        {/* About Us */}
        <Grid item xs={12} sm={4} md={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            Orchids Seller
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
            We provide a wide variety of premium orchids and plant care guides to help you make your environment vibrant and fresh.
          </Typography>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} sm={4} md={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            Quick Links
          </Typography>
          <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
            {['Home', 'Our Story', 'Contact Us', 'Register'].map((text) => (
              <li key={text}>
                <Link
                  href={`/${text.replace(' ', '').toLowerCase()}`}
                  color="inherit"
                  underline="hover"
                  sx={{
                    display: 'inline-block',
                    transition: 'color 0.3s',
                    '&:hover': {
                      color: '#90caf9',
                    },
                  }}
                >
                  {text}
                </Link>
              </li>
            ))}
          </Box>
        </Grid>

        {/* Contact Info */}
        <Grid item xs={12} sm={4} md={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            Contact Us
          </Typography>
          <Typography variant="body2">123 Orchid Lane, Green City, Country</Typography>
          <Typography variant="body2">Phone: +123 456 7890</Typography>
          <Typography variant="body2">Email: info@orchidsseller.com</Typography>
        </Grid>
      </Grid>

      {/* Social Media Icons */}
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Follow us on:
        </Typography>
        {[{ icon: <Facebook />, href: 'https://facebook.com' },
          { icon: <Twitter />, href: 'https://twitter.com' },
          { icon: <Instagram />, href: 'https://instagram.com' },
          { icon: <LinkedIn />, href: 'https://linkedin.com' },
          { icon: <Email />, href: 'mailto:info@orchidsseller.com' }].map(({ icon, href }, index) => (
          <IconButton
            key={index}
            href={href}
            target="_blank"
            sx={{
              color: '#ffffff',
              transition: 'transform 0.3s, color 0.3s',
              '&:hover': {
                color: '#90caf9',
                transform: 'scale(1.2)',
              },
            }}
          >
            {icon}
          </IconButton>
        ))}
      </Box>

      {/* Copyright */}
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="caption" display="block" sx={{ color: '#cccccc' }}>
          &copy; {new Date().getFullYear()} Orchids Seller. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default FooterInfo;
