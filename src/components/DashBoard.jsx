import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Switch, Select, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard() {
  const [apiData, setApiData] = useState([]);
  const [open, setOpen] = useState(false);
  const baseURL = 'https://670ddcdb073307b4ee44b093.mockapi.io/OrchidResources';

  const fetchAPI = () => {
    fetch(`${baseURL}?sortBy=id&order=desc`)
      .then((resp) => resp.json())
      .then((data) => setApiData(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  // Extract unique categories from orchid data
  const categories = [...new Set(apiData.map((orchid) => orchid.category))];

  const handleDelete = (id) => {
    fetch(`${baseURL}/${id}`, { method: 'DELETE' })
      .then(() => {
        toast.success('Deleted successfully!');
        fetchAPI();
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
        fetchAPI();
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
      isNatural: false,
      isAttractive: false,
    },
    validationSchema: Yup.object({
      orchidName: Yup.string().required('Required').min(2, 'Must be 2 characters or more'),
      description: Yup.string().required('Required').min(10, 'Must be 10 characters or more'),
      image: Yup.string().required('Required').url('Must be a valid URL'),
      category: Yup.string().required('Select a category'),
    }),
    onSubmit: (values, { resetForm }) => {
      fetch(baseURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
        .then(() => {
          toast.success('Created successfully!');
          fetchAPI();
          resetForm();
          handleClose();
        })
        .catch((err) => console.error(err));
    },
  });

  return (
    <Container>
      <ToastContainer />
      <Typography variant="h4" gutterBottom>Orchid Dashboard</Typography>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Add Orchid</Button>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Natural</TableCell>
              <TableCell>Attractive</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apiData.map((orchid) => (
              <TableRow key={orchid.id}>
                <TableCell><img src={orchid.image} alt={orchid.orchidName} width="50" /></TableCell>
                <TableCell>{orchid.orchidName}</TableCell>
                <TableCell>{orchid.category}</TableCell>
                <TableCell>{orchid.isNatural ? 'Yes' : 'No'}</TableCell>
                <TableCell>{orchid.isAttractive ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => { setOpen(true); formik.setValues(orchid); }}>Edit</Button>
                  <Button color="error" onClick={() => handleDelete(orchid.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{formik.values.id ? 'Edit Orchid' : 'Add Orchid'}</DialogTitle>
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
            <Select
              fullWidth
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              error={formik.touched.category && Boolean(formik.errors.category)}
              displayEmpty
            >
              <MenuItem value="" disabled>Select Category</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              ))}
            </Select>
            <FormControlLabel
              control={<Switch checked={formik.values.isNatural} onChange={formik.handleChange} name="isNatural" />}
              label="Natural"
            />
            <FormControlLabel
              control={<Switch checked={formik.values.isAttractive} onChange={formik.handleChange} name="isAttractive" />}
              label="Attractive"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={formik.handleSubmit} color="primary" disabled={!formik.isValid || !formik.dirty}>
            {formik.values.id ? 'Save Changes' : 'Add Orchid'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
