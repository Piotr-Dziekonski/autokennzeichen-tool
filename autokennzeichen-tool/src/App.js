import logo from './logo.svg';
import { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown, Table } from 'react-bootstrap';
import axios from 'axios';
import './App.css';
import Row from './Row';

function App() {

  const [tableContent, setTableContent] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:8081/`)
      .then(res => {
        let temp = []
        res.data.forEach((element, index) => {
          temp = [...temp, <Row content={element} key={index}></Row>];
        });
        setTableContent(temp)
      })
  }, [])

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Autokennzeichen-Tool</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
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
