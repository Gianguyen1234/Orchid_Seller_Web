import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
export default function ModalAddOrchid(props) {
    const { show, handleClose, handleUpdate } = props;


    const [formData, setFormData] = useState({
        orchidName: '',
        isNatural: false,
        description: '',
        category:'',
        isAttractive: false,
        image: '',
        
    });

    const handleInputChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value  // Handle checkbox toggle
        });
    };

    const handleSubmit = async () => {
        try {
            let res = await axios.post('https://670ddcdb073307b4ee44b093.mockapi.io/OrchidResources', formData);
            if (res) {
                toast.success("Create successful!");
                handleUpdate();
                handleClose();
            } else {
                toast.error("Error occurred.");
            }
        } catch (error) {
            toast.error("Error occurred.");
            console.error(error);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title style={{color:'black'}}>Add New Orchid</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label style={{color:'black'}}>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Name"
                                name="orchidName"
                                value={formData.orchidName}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label style={{color:'black'}}>Images</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Link"
                                name="image"
                                value={formData.image}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label style={{color:'black'}}>Categories</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="category"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                        <Form.Label style={{color:'black'}}>description</Form.Label>
                        <Form.Control as="textarea" rows={3}
                            name='description'
                            value={formData.description} onChange={handleInputChange}
                            />                       
                        </Form.Group>

                        <Form.Group className="mb-3">                         
                            <Form.Check 
                                type="switch"
                                id="custom-switch"
                                label="Natural"
                                name='isNatural'
                                value={formData.isNatural} onChange={handleInputChange}
                                style={{color:'black'}}
                            />                       
                        </Form.Group>

                        <Form.Group className="mb-3">
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Attractive"
                            name='isAttractive'
                            value={formData.isAttractive} onChange={handleInputChange}
                            style={{color:'black'}}
                            />                                 
                        </Form.Group>
                        
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}
