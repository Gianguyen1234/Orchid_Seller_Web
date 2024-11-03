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
  TextField,
} from '@mui/material';
import Fire from '../assets/fire.png'; 
import OrchidCard from './OrchidCard';

export default function OrchidsPresentation({ orchidData }) {
  const [ratingFilter, setRatingFilter] = React.useState('5 Star');
  const [sortAttribute, setSortAttribute] = React.useState('');
  const [sortOrder, setSortOrder] = React.useState('asc');
  const [searchQuery, setSearchQuery] = React.useState(''); // State for search query
  const [selectedCategory, setSelectedCategory] = React.useState(''); // New state for category filter

  const handleRatingChange = (event, newRating) => {
    if (newRating !== null) setRatingFilter(newRating);
  };

  // Get unique categories from the orchid data for the filter
  const uniqueCategories = Array.from(new Set(orchidData.map(orchid => orchid.category)));

  const filteredOrchids = orchidData.filter(orchid => {
    console.log("Applying Filters:", ratingFilter, searchQuery, selectedCategory); // Check filters
    if (ratingFilter === '5 Star' && orchid.rating < 5) return false;
    if (ratingFilter === '4+ Star' && orchid.rating < 4) return false;
    if (ratingFilter === '3+ Star' && orchid.rating < 3) return false;
    if (searchQuery && !orchid.orchidName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (selectedCategory && orchid.category !== selectedCategory) return false; // Filter by category
    return true;
  });

  const sortedOrchids = [...filteredOrchids].sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1;

    // Sort by the selected attribute
    if (sortAttribute === 'natural') {
      return (Number(b.isNatural) - Number(a.isNatural)) * order; // Sort by isNatural
    } else if (sortAttribute === 'attractive') {
      return (Number(b.isAttractive) - Number(a.isAttractive)) * order; // Sort by isAttractive
    } else if (sortAttribute === 'rating') {
      return (b.rating - a.rating) * order; // Sort by rating
    } else if (sortAttribute === 'category') {
      // Sort by category, assuming category is a string
      if (a.category < b.category) return -1 * order;
      if (a.category > b.category) return 1 * order;
      return 0; // Categories are equal
    }
    // Default sort by id if no sort attribute is specified
    return (a.id - b.id) * order; 
  });

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

      {/* Search Bar */}
      <Box mb={4}>
        <TextField
          label="Search Orchids"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 2 }}
        />
      </Box>

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

        {/* Category Filter */}
        <FormControl variant="outlined" size="small">
          <Select
            id="category-filter"
            value={selectedCategory}
            displayEmpty
            onChange={(e) => setSelectedCategory(e.target.value)}
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="">
              <em>All Categories</em>
            </MenuItem>
            {uniqueCategories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
            <MenuItem value="attractive">Attractive</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="category">Category</MenuItem> {/* Added sort by category */}
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
        {sortedOrchids.map((orchid) => (
          <OrchidCard key={orchid.id} orchid={orchid} />
        ))}
      </Box>
    </Container>
  );
}
