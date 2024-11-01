import axios from 'axios';
import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
export default function ModalDeleteOrchid(props) {
  const { show, handleClose, idToDelete, handleDelete } = props;

  const handleDeleteNews = async () => {
    try {
        const res = await axios.delete(`https://670ddcdb073307b4ee44b093.mockapi.io/OrchidResources/${idToDelete}`);
        if (res)
            handleDelete();
        toast.success('Delete sucessful !');
        handleClose();
    } catch (error) {
        console.error("Error:", error);
    }
};
  return (
     <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{color:'black'}}>Delete Orchid</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{color:'black'}}>
                    Are you sure to delete this item?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteNews}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* <ToastContainer
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
            /> */}
        </>
  )
}
