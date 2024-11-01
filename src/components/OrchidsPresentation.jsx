import React from 'react';
import {
  Box,
  Typography,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  Select,
  MenuItem,
  Container,
} from '@mui/material';
import Fire from '../assets/fire.png'; // Import the fire image
import OrchidCard from './OrchidCard';

export default function OrchidsPresentation({ orchidData }) {
  const [ratingFilter, setRatingFilter] = React.useState('5 Star');
  const [sortAttribute, setSortAttribute] = React.useState('');
  const [sortOrder, setSortOrder] = React.useState('asc');

  const handleRatingChange = (event, newRating) => {
    if (newRating !== null) setRatingFilter(newRating);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box textAlign="center" mb={4} display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h4" component="h2" fontWeight="bold" color="primary" gutterBottom>
          Hot Sales
        </Typography>
        <Box
          component="img"
          src={Fire}
          alt="Fire emoji"
          sx={{ width: 32, height: 32, ml: 1 }}
        />
      </Box>
      <Typography variant="subtitle1" color="text.secondary" textAlign="center" mb={4}>
        Discover our top-rated orchids on sale
      </Typography>

      {/* Filters and Sort */}
      <Stack direction="row" spacing={3} alignItems="center" justifyContent="center" mb={4}>
        {/* Rating Filter */}
        <ToggleButtonGroup
          color="primary"
          value={ratingFilter}
          exclusive
          onChange={handleRatingChange}
          aria-label="Rating Filter"
        >
          {['5 Star', '4+ Star', '3+ Star'].map((rating) => (
            <ToggleButton key={rating} value={rating} aria-label={rating} sx={{ borderRadius: 2 }}>
              {rating}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        {/* Sort By Attribute */}
        <FormControl variant="outlined" size="small">
          <Select
            id="sort-attribute"
            value={sortAttribute}
            displayEmpty
            onChange={(e) => setSortAttribute(e.target.value)}
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="">
              <em>Sort By</em>
            </MenuItem>
            <MenuItem value="natural">Natural</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
          </Select>
        </FormControl>

        {/* Sort Order */}
        <FormControl variant="outlined" size="small">
          <Select
            id="sort-order"
            value={sortOrder}
            displayEmpty
            onChange={(e) => setSortOrder(e.target.value)}
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* Orchid Cards */}
      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={4}>
        {orchidData.map((orchid) => (
          <OrchidCard key={orchid.id} orchid={orchid} />
        ))}
      </Box>
    </Container>
  );
}
