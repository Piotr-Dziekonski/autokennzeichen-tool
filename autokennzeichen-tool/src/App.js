import { useState, useEffect, useRef } from 'react';
import { Navbar, Container, Nav, Table } from 'react-bootstrap';
import axios from 'axios';
import Row from './Row';
import './App.css';

function App() {
  const [tableContent, setTableContent] = useState([])
  const [inputFile, setInputFile] = useState(null);
  const inputRef = useRef(null);
  useEffect(() => {
    setInputFile(document.getElementById("input-file"));
  }, []);

  useEffect(() => {
    getDbContent();
  }, [])

  const getDbContent = () => {
    axios.get(`http://localhost:8081/`)
      .then(res => {
        let temp = []
        res.data.forEach((element, index) => {
          temp = [...temp, <Row content={element} key={index}></Row>];
        });
        setTableContent(temp)
      })
  }

  const handleUpload = () => {
    inputFile?.click();
  };

  const upload = async () => {
    try {
      inputRef.current?.files && setInputFile(inputRef.current.files[0])
      console.log(inputRef.current.files[0])
      const formData = new FormData();
      formData.append("uploadedFile", inputRef.current.files[0]);
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      axios.post('http://localhost:8081/importFromFile', formData, config).then((response) => {
        getDbContent()
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Autokennzeichen-Tool</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end" style={{ width: "100%" }}>
              <Nav.Link href="#import" className='navbar-link d-flex' onClick={handleUpload}>
                <form action="/upload" method="post" enctype="multipart/form-data">
                  <input id="input-file" name={"uploadedFile"} ref={inputRef} onChange={upload} className="d-none" type="file" />
                  Import
                </form>
              </Nav.Link>
              <Nav.Link href="#export" className='navbar-link d-flex' onClick={handleUpload}>
                <input id="input-file2" className="d-none" type="file" />
                Export
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Ortskürzel</th>
              <th>Ursprung</th>
              <th>Stadt/Land</th>
              <th>Bundesland</th>
            </tr>
          </thead>
          <tbody>
            {tableContent}
          </tbody>
        </Table>
      </Container>
    </>

  );
}

export default App;
