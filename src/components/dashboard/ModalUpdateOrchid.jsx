import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
export default function ModalUpdateOrchid(props) {
    const { show, handleClose, orchid, idToUpdate, handleUpdate } = props;
    const [formData, setFormData] = useState(orchid);


    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({
    //         ...formData,
    //         [name]: value
    //     });
    // };
    const handleInputChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,  // Handle both checkbox and text inputs
        });
    };

    const handleSubmit = async () => {
        try {
            const res = await axios.put(`https://670ddcdb073307b4ee44b093.mockapi.io/OrchidResources/${idToUpdate}`, formData);
            if (res) {
                toast.success('Update sucessful');
                handleUpdate();
                handleClose();
                console.log(res);
            } else {
                console.error("Error");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        setFormData(orchid);
    }, [orchid]);

    return (
        <>       
            <Modal show={show} onHide={handleClose} backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title style={{color:'black'}}>Edit Orchid</Modal.Title>
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
           
        </>
    )
}
