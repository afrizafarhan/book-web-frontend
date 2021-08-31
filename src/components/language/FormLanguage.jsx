import React, { useState } from 'react';
import {Modal, Button, Form} from 'react-bootstrap'
import TableComponent from '../datatable/TableComponent';
import FlashMessage from '../flash-message/FlashMessage';

const FormLanguage = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
        <>
            <Button className="mt-2 mb-2" variant="primary" onClick={() => props.modalShowFunc(handleShow)}>
                Add new language
            </Button>
            <FlashMessage 
                display={props.displayFlash}
                status={props.statusFlash}
                message={props.messageFlash}
                closeFunc={props.closeFlashFunc}
            />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Language</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formLanguage">
                        <Form.Label>Language Name</Form.Label>
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

export default FormLanguage