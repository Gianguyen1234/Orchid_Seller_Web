import React from "react";
import { Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";
import Star from "../assets/star.png"; // Star image for the rating
import { Link } from "react-router-dom";

export default function OrchidCard({ orchid }) {
  return (
    <Card 
      sx={{
        maxWidth: 345,
        borderRadius: 3,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Link to={`detail/${orchid.id}`} style={{ textDecoration: 'none' }}>
        <CardMedia
          component="img"
          height="200"
          image={orchid.image}
          alt={orchid.orchidName}
          sx={{
            objectFit: 'cover',
            borderRadius: "12px 12px 0 0"
          }}
        />
        <CardContent sx={{ paddingBottom: 0 }}>
          <Typography variant="h5" component="div" fontWeight="bold" gutterBottom>
            {orchid.orchidName}
          </Typography>
          
          <Box display="flex" alignItems="center" mb={1}>
            <Typography variant="body2" color="text.secondary" mr={2} sx={{ fontWeight: 500 }}>
              {orchid.isNatural ? "🌿 Natural: Yes" : "❌ Natural: No"}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              {orchid.isAttractive ? "💎 Special: Yes" : "❌ Special: No"}
            </Typography>
          </Box>
          
          <Box display="flex" alignItems="center" mb={2}>
            <Typography variant="body1" fontWeight="bold" mr={1} sx={{ color: "orange" }}>
            {orchid.rating}
            </Typography>
            <img src={Star} alt="rating icon" style={{ width: 20, height: 20, marginLeft: 4 }} />
          </Box>

          <Typography variant="body2" color="text.secondary" noWrap>
            {orchid.description.slice(0, 50) + "..."}
          </Typography>
        </CardContent>
      </Link>
      <Box display="flex" justifyContent="center" pb={2} pt={1}>
        <Button 
          variant="contained" 
          color="primary"
          component={Link} 
          to={`detail/${orchid.id}`}
          sx={{
            background: "linear-gradient(45deg, #00a8cc, #0066cc)",
            borderRadius: "20px",
            padding: "8px 16px",
            textTransform: "capitalize",
            fontWeight: "bold",
            "&:hover": {
              background: "linear-gradient(45deg, #0066cc, #004999)"
            }
          }}
        >
          View Details
        </Button>
      </Box>
    </Card>
  );
}
