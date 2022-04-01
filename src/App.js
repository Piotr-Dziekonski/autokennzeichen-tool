
import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, NavDropdown, Navbar, Container, Nav, Table } from 'react-bootstrap';
import ImportExportController from './ImportExportController';
import Row from './Row';
import './App.css';
import CustomNavbar from './CustomNavbar';
import AddModal from './AddModal';
import SearchController from './SearchController';

function App() {
  const [tableContent, setTableContent] = useState([])
  const [modalShow, setModalShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const filterRef = useRef(null);
  const searchInputRef = useRef(null)

  useEffect(() => {
    getDbContent();
  }, [])

  const getDbContent = () => {
    ImportExportController.getDbContent().then(response => {
      const rows = createRows(response.data)
      setTableContent(rows)
    })
  }

  const createRows = (array) => {
    let temp = [];
    array.forEach((element, index) => {
      temp = [...temp, <Row content={element} key={index}></Row>];
    });
    return temp;
  }

  const handleClear = (e) => {
    searchInputRef.current.value = ""
    filterRef.current.value = "none"
    setSearchValue("")
    getDbContent();

  }

  const handleSearch = async (e) => {
    const filterOption = filterRef.current.value
    let result = null;
    if(filterOption === 'kuerzel'){
      result = await SearchController.searchOrtskuerzel(searchValue)
    } else if(filterOption === 'region'){
      result = await SearchController.searchLandkreis(searchValue)
    } else if(filterOption === 'ursprung'){
      result = await SearchController.searchUrsprung(searchValue)
    } else if(filterOption === 'bundesland'){
      result = await SearchController.searchBundesland(searchValue)
    }
    const rows = createRows(result.data)
    setTableContent(rows)

  }

  return (
    <>
      <CustomNavbar getDbContent={getDbContent}>

      </CustomNavbar>
      <Container>
        <div className='tableModifiers'>
          <div className='tableModifiersLeft'>
          <input ref={searchInputRef} type={'text'} placeholder={'Suchen...'} onChange={(e) => setSearchValue(e.target.value)}></input>
          <Form.Select ref={filterRef} className='filter' aria-label="Default select example">
              <option value="none" disabled selected="selected"></option>
              <option value="kuerzel">Ortskürzel</option>
              <option value="ursprung">Ursprung</option>
              <option value="region">Region</option>
              <option value="bundesland">Bundesland</option>
            </Form.Select>
            <Button variant="success" onClick={handleSearch}>Suche</Button>{' '}
            <Button variant="danger" onClick={handleClear}>Reset</Button>{' '}
          </div>
            <Button variant="primary" onClick={() => setModalShow(true)}>Hinzufügen</Button>{' '}
          
          <AddModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Ortskürzel</th>
              <th>Ursprung</th>
              <th>Stadt/Land</th>
              <th>Bundesland</th>
              <th>Link</th>
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
