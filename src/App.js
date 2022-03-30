import { useState, useEffect, useRef } from 'react';
import { NavDropdown, Navbar, Container, Nav, Table } from 'react-bootstrap';
import axios from 'axios';
import Row from './Row';
import './App.css';
import download from 'downloadjs';

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
          'content-type': 'multipart/form-data',
        }
      }
      axios.post('http://localhost:8081/importFromFile', formData, config).then((response) => {
        getDbContent()
      })
    } catch (e) {
      console.log(e)
    }
  }
  const handleExport = async (e) => {

    switch (e.target.id) {
      case "exportJson":
        await axios.get('http://localhost:8081/exportJson', {
          responseType: 'json'
        }, { timeout: 200 }).then((response) => {
          console.log(response.data)
          const fileData = JSON.stringify(response.data, null, 2);
          prepareDownload(fileData, "json")      
        })
        break;
      case "exportXml":
        await axios.get('http://localhost:8081/exportXml', { timeout: 1000 }).then((response) => {
          prepareDownload(response.data, "xml")      
        })
        break;
    
      default:
        break;
    }


  }

  const prepareDownload = (fileData, extension) => {
    const blob = new Blob([fileData], {type: "text/plain"});
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
              <NavDropdown.Item id="exportJson" onClick={handleExport}>als Json</NavDropdown.Item>
              <NavDropdown.Item id="exportXml" onClick={handleExport}>als XML</NavDropdown.Item>
              <NavDropdown.Item id="exportCsv">als CSV</NavDropdown.Item>
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
