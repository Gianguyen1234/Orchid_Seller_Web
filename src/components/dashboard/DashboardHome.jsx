import React, { useEffect, useState } from 'react'
import { UserAuth } from '../services/AuthContext'
import { Button } from '@mui/material';
import { Image, Pagination, Table } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import ModalAddOrchid from './ModalAddOrchid';
import ModalUpdateOrchid from './ModalUpdateOrchid';
import ModalDeleteOrchid from './ModalDeleteOrchid';


export default function DashboardHome() {
    const { user } = UserAuth();
    const [orchid, setOrchids] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [editOrchid, setEditOrchid] = useState({});
    const [idToUpdate, setIdToUpdate] = useState(null);
    const [idToDelete, setIdToDelete] = useState(null);

    
    const getAllOrchids = async () => {
        const res = await axios.get('https://670ddcdb073307b4ee44b093.mockapi.io/OrchidResources');
        if (res && res.data) {
            setOrchids(res.data);
        }
    };

    useEffect(() => {
        getAllOrchids();
    }, []);

    const maxPage = Math.ceil(orchid.length / itemsPerPage);

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= maxPage) {
            setCurrentPage(pageNumber);
        }
    };
    if (!user) {
        return <Navigate to="/login" />;
    }

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const handleShowEdit = (data) => {
        setEditOrchid(data);
        setIdToUpdate(data.id);
        setShowEdit(true);
    };

    const handleCloseEdit = () => {
        setShowEdit(false);
        setIdToUpdate(null);
    };

    const handleShowDelete = (data) => {
        setEditOrchid(data);
        setIdToDelete(data.id);
        setShowDelete(true);
    };

    const handleUpdate = () => {
        getAllOrchids();
        handleCloseAdd();
        handleCloseEdit();
    };


    const handleDelete = () => {
        getAllOrchids();
        handleCloseAdd();
        handleCloseEdit();
        handleCloseDelete();
    };

    const handleCloseDelete = () => {
        setShowDelete(false);
        setIdToDelete(null);
    };


  return (
    <div style={{ marginTop: '30px' }}>
            <Button variant="outlined" color='primary' onClick={handleShowAdd} size='large' className='mb-3'>
                Add New
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Natural</th>
                        <th>Category</th>
                        <th>Attractive</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orchid.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((data, index) => (
                        <tr key={index}>
                            <td>{data.id}</td>
                            <td><Image src={data.image} style={{ width: 60}} thumbnail/></td>
                            <td>{data.orchidName}</td>
                            <td>{data.isNatural ? <i className="bi bi-emoji-heart-eyes"></i> : <i className="bi bi-emoji-heart-eyes-fill"></i>}</td>
                            <td>{data.category}</td>
                            <td>{data.isAttractive ? <i className="bi bi-balloon-heart"></i> : <i className="bi bi-balloon-heart-fill"></i>}</td>
                            <td>
                                <Button variant="outlined" onClick={() => handleShowEdit(data)} className='edit-button'>Edit  <span style={{ paddingLeft: '5px' }} class="bi bi-pencil-square"></span></Button>
                                <Button variant="outlined" color='error' onClick={() => handleShowDelete(data)} style={{ marginLeft: '20px' }} className='delete-button '>Delete<span style={{ paddingLeft: '5px' }} class="bi bi-trash3-fill"></span></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Pagination>
                <Pagination.Prev
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                />
                {Array.from({ length: maxPage }, (_, i) => (
                    <Pagination.Item
                        key={i}
                        onClick={() => paginate(i + 1)}
                        active={currentPage === i + 1}
                    >
                        {i + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === maxPage}
                />
            </Pagination>

            <ModalAddOrchid
                show={showAdd}
                handleClose={handleCloseAdd}
                handleUpdate={handleUpdate}             
            />

           <ModalUpdateOrchid
                show={showEdit}
                handleClose={handleCloseEdit}
                idToUpdate={idToUpdate}
                orchid={editOrchid}
                handleUpdate={handleUpdate}
            />
            <ModalDeleteOrchid
                show={showDelete}
                handleClose={handleCloseDelete}
                idToDelete={idToDelete}
                handleDelete={handleDelete}
            />
        </div>
  )
}
