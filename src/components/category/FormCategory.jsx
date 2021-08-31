import React, { useState } from 'react';
import {Modal, Button, Form} from 'react-bootstrap'
import TableComponent from '../datatable/TableComponent';

const FormCategory = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
        <>
            <Button className="mt-2" variant="primary" onClick={() => props.modalShowFunc(handleShow)}>
                Launch demo modal
            </Button>
        
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formCategory">
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control type="text" name="name" value={props.dataForForm.name} onChange={props.changeFunc}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => props.submitFunc(handleClose)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <TableComponent 
                data={props.data} 
                removeFunc={(val) => props.deleteFunc(val)} 
                update={(val) => props.updateFunc(val, handleShow)}
            />

        </>
    )
}

export default FormCategory