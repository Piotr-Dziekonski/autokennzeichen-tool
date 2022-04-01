import React from 'react'
import './CustomNavbar.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState, useEffect, useRef } from 'react';
import ImportExportController from './ImportExportController';

export default function CustomNavbar(props) {

    const [inputFile, setInputFile] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => {
        setInputFile(document.getElementById("input-file"));
    }, []);

    
    const handleUpload = () => {
     inputFile?.click();   
    }

    const upload = async () => {
        ImportExportController
            .upload(inputRef, 'http://localhost:8081/importFromFile')
            .then(() => props.getDbContent(), reason => console.log(reason))
    };

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
        <div className='customNavbar'>
            <div className='customBrand'>
                Autokennzeichentool
            </div>
            <div className='customOptionBar'>
                <div className='customOption customOptionBarElement' >
                <a id="importOption" href="#import" className='navbar-link d-flex' onClick={handleUpload}>
                    <form action="/upload" method="post" encType="multipart/form-data">
                    <input id="input-file" name={"uploadedFile"} ref={inputRef} onChange={upload} className="d-none" type="file" />
                    Import
                    </form>
                </a>
                </div>
                <div className='customDropdown customOptionBarElement'>
                    <div className='customDropTitle'>Export<ArrowDropDownIcon /></div>
                    <div className='customDropList '>
                        <div className='customDropOption' onClick={() => handleExport("application/json", "json")}>
                            as Json
                        </div>
                        <div className='customDropOption' onClick={() => handleExport("application/xml", "xml")}>
                            as XML
                        </div>
                        <div className='customDropOption' onClick={() => handleExport("application/csv", "csv")}>
                            as CSV
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
