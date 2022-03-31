import { useState, useEffect, useRef } from 'react';
import { NavDropdown, Navbar, Container, Nav, Table } from 'react-bootstrap';
import ImportExportController from './ImportExportController';
import Row from './Row';
import './App.css';
import CustomNavbar from './CustomNavbar';

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
        <CustomNavbar>

        </CustomNavbar>
      
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
