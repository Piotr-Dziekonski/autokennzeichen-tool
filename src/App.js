import { useState, useEffect, useRef } from 'react';
import { NavDropdown, Navbar, Container, Nav, Table } from 'react-bootstrap';
import ImportExportController from './ImportExportController';
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
    ImportExportController.getDbContent().then(response => {
      let temp = []
      response.data.forEach((element, index) => {
        temp = [...temp, <Row content={element} key={index}></Row>];
      });
      setTableContent(temp)
    })
  }

  const handleUpload = () => {
    inputFile?.click();
  };

  const upload = async () => {
    ImportExportController
      .upload(inputRef, 'http://localhost:8081/importFromFile')
      .then(() => getDbContent(), reason => console.log(reason))
  }

  const handleExport = async (expectedResponseType, extension) => {
    ImportExportController.handleExport(expectedResponseType).then((blob) => {
      prepareDownload(blob, extension)
    })
  }

  const prepareDownload = (blob, extension) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = "export." + extension;
    link.href = url;
    link.click();
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
                <form action="/upload" method="post" encType="multipart/form-data">
                  <input id="input-file" name={"uploadedFile"} ref={inputRef} onChange={upload} className="d-none" type="file" />
                  Import
                </form>
              </Nav.Link>
              <NavDropdown title="Export" id="basic-nav-dropdown" renderMenuOnMount={true}>
                <NavDropdown.Item id="exportJson" onClick={() => handleExport("application/json", "json")}>als Json</NavDropdown.Item>
                <NavDropdown.Item id="exportXml" onClick={() => handleExport("application/xml", "xml")}>als XML</NavDropdown.Item>
                <NavDropdown.Item id="exportCsv" onClick={() => handleExport("application/csv", "csv")}>als CSV</NavDropdown.Item>
              </NavDropdown>
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
