import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { Button, Form } from 'react-bootstrap';
import ImportExportController from './ImportExportController';

export default function AddModal(props) {

    const [ortskuerzel, setOrtskuerzel] = useState("");
    const [ursprung, setUrsprung] = useState("");
    const [landkreis, setLandkreis] = useState("");
    const [bundesland, setBundesland] = useState("");

    const handleSave = () => {
        props.onHide()
        ImportExportController.addNewLicensePlate(ortskuerzel, ursprung, landkreis, bundesland)
    }

    return (
        <Modal {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>

            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Hinzufügen
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form.Label htmlFor="ortskuerzel">Ortskürzel:</Form.Label>
                <Form.Control
                    type="text"
                    id="ortskuerzel"
                    onChange={setOrtskuerzel}
                />
                <Form.Label htmlFor="ursprung">Ursprung:</Form.Label>
                <Form.Control
                    type="text"
                    id="ursprung"
                    onChange={setUrsprung}
                />
                <Form.Label htmlFor="region">Stadt/Landkreis:</Form.Label>
                <Form.Control
                    type="text"
                    id="region"
                    onChange={setLandkreis}
                />
                <Form.Label htmlFor="bundesland">Bundesland:</Form.Label>
                <Form.Control
                    type="text"
                    id="bundesland"
                    onChange={setBundesland}
                />

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSave}>Speichern</Button>
            </Modal.Footer>
        </Modal>
    )
}
