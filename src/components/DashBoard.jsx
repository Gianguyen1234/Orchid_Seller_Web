import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
  FormControlLabel, Switch, Select, MenuItem, Pagination, Box, IconButton
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Edit, Delete } from '@mui/icons-material';

export default function Dashboard() {
  const [apiData, setApiData] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [newCategory, setNewCategory] = useState(''); // State for new category
  const itemsPerPage = 5;
  const baseURL = 'https://670ddcdb073307b4ee44b093.mockapi.io/OrchidResources';

  const fetchAPI = (page = 1) => {
    fetch(`${baseURL}?page=${page}&limit=${itemsPerPage}&sortBy=id&order=desc`)
      .then((resp) => resp.json())
      .then((data) => {
        setApiData(data);
        setTotalPages(Math.ceil(50 / itemsPerPage)); 
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchAPI(currentPage);
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleDelete = (id) => {
    fetch(`${baseURL}/${id}`, { method: 'DELETE' })
      .then(() => {
        toast.success('Deleted successfully!');
        fetchAPI(currentPage);
      })
      .catch((err) => console.error(err));
  };

  const handleEdit = (id) => {
    const editedData = formik.values;
    fetch(`${baseURL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedData),
    })
      .then(() => {
        toast.success('Edited successfully!');
        fetchAPI(currentPage);
        handleClose();
      })
      .catch((err) => console.error(err));
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      orchidName: '',
      description: '',
      image: '',
      category: '',
      price: '',
      isNatural: false,
      isAttractive: false,
    },
    validationSchema: Yup.object({
      orchidName: Yup.string().required('Required').min(2, 'Must be 2 characters or more'),
      description: Yup.string().required('Required').min(10, 'Must be 10 characters or more'),
      image: Yup.string().required('Required').url('Must be a valid URL'),
      category: Yup.string().required('Select a category'),
      price: Yup.number().required('Required').min(1, 'Must be greater than zero'),
    }),
    onSubmit: (values, { resetForm }) => {
      fetch(baseURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
        .then(() => {
          toast.success('Created successfully!');
          fetchAPI(currentPage);
          resetForm();
          handleClose();
        })
        .catch((err) => console.error(err));
    },
  });

  const categories = [...new Set(apiData.map((orchid) => orchid.category))];

  const addNewCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      categories.push(newCategory); // Add new category to the categories array
      setNewCategory(''); // Clear input field
    } else {
      toast.error('Category already exists or input is empty');
    }
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <ToastContainer />
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        Orchid Dashboard
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)} sx={{ mb: 3 }}>
        Add Orchid
      </Button>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: 'primary.light' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Image</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Natural</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Attractive</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apiData.map((orchid) => (
              <TableRow key={orchid.id} hover>
                <TableCell>
                  <img src={orchid.image} alt={orchid.orchidName} width="50" style={{ borderRadius: '8px' }} />
                </TableCell>
                <TableCell>{orchid.orchidName}</TableCell>
                <TableCell>{orchid.price}</TableCell>
                <TableCell>{orchid.category}</TableCell>
                <TableCell>{orchid.isNatural ? 'Yes' : 'No'}</TableCell>
                <TableCell>{orchid.isAttractive ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => { setOpen(true); formik.setValues(orchid); }}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(orchid.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
          {formik.values.id ? 'Edit Orchid' : 'Add Orchid'}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              label="Orchid Name"
              name="orchidName"
              value={formik.values.orchidName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.orchidName && Boolean(formik.errors.orchidName)}
              helperText={formik.touched.orchidName && formik.errors.orchidName}
              margin="dense"
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              margin="dense"
            />
            <TextField
              fullWidth
              label="Image URL"
              name="image"
              value={formik.values.image}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.image && Boolean(formik.errors.image)}
              helperText={formik.touched.image && formik.errors.image}
              margin="dense"
            />
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
              margin="dense"
            />
            <Select
              fullWidth
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              error={formik.touched.category && Boolean(formik.errors.category)}
              displayEmpty
              sx={{ mt: 2 }}
            >
              <MenuItem value="" disabled>Select a category</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              ))}
            </Select>

            <TextField
              fullWidth
              label="Add New Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              margin="dense"
            />
            <Button onClick={addNewCategory} variant="outlined" color="primary" sx={{ mt: 1, mb: 2 }}>
              Add Category
            </Button>

            <FormControlLabel
              control={<Switch name="isNatural" color="primary" checked={formik.values.isNatural} onChange={formik.handleChange} />}
              label="Natural"
            />
            <FormControlLabel
              control={<Switch name="isAttractive" color="primary" checked={formik.values.isAttractive} onChange={formik.handleChange} />}
              label="Attractive"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={formik.handleSubmit} color="primary">
            {formik.values.id ? 'Save Changes' : 'Add Orchid'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
