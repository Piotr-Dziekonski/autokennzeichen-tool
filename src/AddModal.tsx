import { useState, useRef } from 'react'
import Modal from "react-bootstrap/Modal";
import { Button, Form } from 'react-bootstrap';
import ImportExportController from './ImportExportController';
import './AddModal.css';

type Props = {
    onHide: () => void,
    onAdd: () => void,
    show: boolean
}

export default function AddModal(props: Props) {

    const [ortskuerzel, setOrtskuerzel] = useState("");
    const [ursprung, setUrsprung] = useState("");
    const [landkreis, setLandkreis] = useState("");
    const [bundesland, setBundesland] = useState("");
    const errMsgRef = useRef<HTMLParagraphElement>(null);

    const handleSave = async () => {
        if(ortskuerzel === "" || ursprung === "" || landkreis === "" || bundesland === "") {
            errMsgRef.current?.classList.add("visible")
            return
        }
        errMsgRef.current?.classList.remove("hidden")
        props.onHide()
        await ImportExportController.addNewLicensePlate(ortskuerzel, ursprung, landkreis, bundesland)
        setOrtskuerzel("")
        setUrsprung("")
        setLandkreis("")
        setBundesland("")
        props.onAdd()
    }

    return (
        <Modal
            onHide={props.onHide}
            show={props.show}
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
                    onChange={(e) => setOrtskuerzel(e.target.value)}
                />
                <Form.Label htmlFor="ursprung">Ursprung:</Form.Label>
                <Form.Control
                    type="text"
                    id="ursprung"
                    onChange={(e) => setUrsprung(e.target.value)}
                />
                <Form.Label htmlFor="region">Stadt/Landkreis:</Form.Label>
                <Form.Control
                    type="text"
                    id="region"
                    onChange={(e) => setLandkreis(e.target.value)}
                />
                <Form.Label htmlFor="bundesland">Bundesland:</Form.Label>
                <Form.Control
                    type="text"
                    id="bundesland"
                    onChange={(e) => setBundesland(e.target.value)}
                />
                <p ref={errMsgRef} className='errMsgOnSave hidden'>Kein Feld darf leer sein!</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSave}>Speichern</Button>
            </Modal.Footer>
        </Modal>
    )
}
