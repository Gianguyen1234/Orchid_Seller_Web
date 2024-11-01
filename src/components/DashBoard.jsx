import React from 'react'
import { useState, useEffect } from 'react';
import { Button, Col, Container, Row, Table,Image, Modal, Form } from "react-bootstrap"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import {useFormik} from 'formik'
import * as Yup from 'yup'

export default function DashBoard() {
  const [api, setAPI] = useState([])
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(api);
  //EDIT
  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
          ...formData,
          [name]: value
      });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const baseURL = 'https://670ddcdb073307b4ee44b093.mockapi.io/OrchidResources'

const categories = [
  {id: 'Dendrobium', name:'Dendrobium'},
  {id: 'Cattleya', name:'Cattleya'},
  {id:'Brassavola', name:'Brassavola'}
]

 const fetchAPI = ()=>{
   fetch(baseURL + '?sortBy=id&order=desc')
  .then(resp => resp.json())
  .then(data => setAPI(data))
  .catch(err => console.error(err))
 }
 useEffect(() => {
   fetchAPI()
 }, []);
  //DELETE --
  const handleDelete = (id) =>{
    fetch(baseURL + '/' + id,{method: 'DELETE'})
    .then(()=> {
      toast.success('Delete successfully!')
      fetchAPI()
    }
    )
    .catch(err => console.error(err))
  }
  //EDIT?
  const handleEdit = (id) =>{
    fetch(baseURL + '/' + id,{method: 'PUT'})
    .then(()=> {
      
      toast.success('Edit successfully!')
      fetchAPI()
    }
    )
    .catch(err => console.error(err))
  }
  const formik = useFormik({
    initialValues:{
      orchidName:'',
      description:'',
      image:'',
      category:'',
      isNatural: false,
      isAttractive: false
    },
    onSubmit: values =>{
      //alert(JSON.stringify(values))
      fetch(baseURL,{method:'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
          },
          credentials: 'same-origin'
      
      })
      .then(()=>{
        handleClose()
        toast.success('Create successfully')
        fetchAPI()
      })
    },
     validationSchema : Yup.object({
      orchidName: Yup.string().required("Required.").min(2, "Must be 2 characters or more"),
      description: Yup.string().required("Required.").min(10, "Must be 10 characters or more"),
      image: Yup.string().required("Required.").min(2, "Must be 2 characters or more"),

    })
   })

  return (
    <>
      <Container>
        <ToastContainer/>
      <Row className='py-3'>
{/* ADD */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{color:'black'}}>Modal Add Orchid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label style={{color:'black'}}>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name of orchid"
                name='orchidName'
                value={formik.values.name} onChange={formik.handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{color:'black'}}>Image</Form.Label>
              <Form.Control
                type="text"
              name='image'
              value={formik.values.image} onChange={formik.handleChange}

              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label style={{color:'black'}}>description</Form.Label>
              <Form.Control as="textarea" rows={3}
              name='description'
              value={formik.values.description} onChange={formik.handleChange}
              />
            </Form.Group>

            <Form.Group>
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              label="Natural"
              name='isNatural'
              value={formik.values.isNatural} onChange={formik.handleChange}
              style={{color:'black'}}
            />
            </Form.Group>
            <Form.Group>
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              label="Attractive"
              name='isAttractive'
              value={formik.values.isAttractive} onChange={formik.handleChange}
              style={{color:'black'}}
            />          
            </Form.Group>

            <Form.Group>
            <Form.Select aria-label="Default select example" name='category'
             value={formik.values.category} onChange={formik.handleChange}

            >
              {categories.map((c)=>(
                <option value={c.id}>{c.name}</option>
              ))}       
            </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
{/* EDIT */}
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{color:'black'}}>Modal Edit Orchid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEdit}>
            <Form.Group className="mb-3">
              <Form.Label style={{color:'black'}}>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name of orchid"
                name='orchidName'
                value={api.orchidName} onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{color:'black'}}>Image</Form.Label>
              <Form.Control
                type="text"
              name='image'
              value={api.image} onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label style={{color:'black'}}>description</Form.Label>
              <Form.Control as="textarea" rows={3}
              name='description'
              value={api.description} onChange={handleInputChange}

              />
            </Form.Group>

            <Form.Group>
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              label="Natural"
              name='isNatural'
              value={formik.values.isNatural} onChange={formik.handleChange}
              style={{color:'black'}}
            />
            </Form.Group>
            <Form.Group>
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              label="Attractive"
              name='isAttractive'
              value={formik.values.isAttractive} onChange={formik.handleChange}
              style={{color:'black'}}
            />          
            </Form.Group>

            <Form.Group>
            <Form.Select aria-label="Default select example" name='category'
             value={formik.values.category} onChange={formik.handleChange}

            >
              {categories.map((c)=>(
                <option value={c.id}>{c.name}</option>
              ))}       
            </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}

          <Col>        
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>img</th>
          <th>Name</th>
          <th>Natural</th>
          <th>Category</th>
          <th>Attractive</th>
          <th colSpan={2}>Actions | <i onClick={handleShow} className="bi bi-plus-circle"></i> </th>
        </tr>
      </thead>
      <tbody>
        {api.map((a)=>(
          <tr key={a.id}>
          <td><Image src={a.image} style={{ width: 60}} thumbnail/></td>
          <td>{a.orchidName}</td>
          <td>{a.isNatural ? <i className="bi bi-emoji-heart-eyes"></i> : <i className="bi bi-emoji-heart-eyes-fill"></i>}</td>
          <td>{a.category}</td>
          <td>{a.isAttractive ? <i className="bi bi-balloon-heart"></i> : <i className="bi bi-balloon-heart-fill"></i>}</td>
          <td>EDIT | <i className="bi bi-pencil" 
          onClick={() => handleEdit(a.id)}></i></td> 
          <td>DELETE | <i className="bi bi-trash3-fill" 
          onClick={()=>{ if(confirm('Do u wanna delete?')) handleDelete(a.id)}}></i></td>    
        </tr>
        ))}
      </tbody>
    </Table>
          </Col>
        </Row>
      </Container>
    </>
  )
}
