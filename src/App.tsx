
import { useState, useEffect, useRef } from 'react';
import { Button, Form, Container, Table } from 'react-bootstrap';
import ImportExportController from './ImportExportController';
import Row from './Row';
import './App.css';
import CustomNavbar from './CustomNavbar';
import AddModal from './AddModal';
import SearchController from './SearchController';

function App() {
  const [tableContent, setTableContent] = useState<any[] | undefined>(undefined)
  const [modalShow, setModalShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("none");
  const [dbContent, setDbContent] = useState<any[] | undefined>(undefined);
  const filterRef = useRef<HTMLSelectElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if(dbContent === undefined){
      fetchDbContent()
      return
    } 
    const rows = createRows(dbContent)
    setTableContent(rows)
  }, [dbContent])

  const fetchDbContent = () => {
    ImportExportController.getDbContent().then((response: any) => {
      setDbContent(response.data)
    })
  }

  const createRows = (array: any[]) => {
    let temp: any[] = [];
    array.forEach((element, index) => {
      temp = [...temp, <Row content={element} key={index}></Row>];
    });
    return temp;
  }

  const handleClear = () => {
    setSearchValue("")
    setSelectedFilter('none')
    fetchDbContent();
  }

  const handleSearch = async () => {
    const filterOption = filterRef.current?.value
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
      <CustomNavbar getDbContent={fetchDbContent} />
      <Container>
        <div className='tableModifiers'>
          <div className='tableModifiersLeft'>
          <input ref={searchInputRef} type={'text'} placeholder={'Suchen...'} onChange={(e) => setSearchValue(e.target.value)} value={searchValue}></input>
          <Form.Select ref={filterRef} className='filter' aria-label="Default select example" value={selectedFilter} onChange={e => setSelectedFilter(e.target.value)}>
              <option value="none" disabled></option>
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
