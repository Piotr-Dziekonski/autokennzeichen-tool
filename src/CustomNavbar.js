import React from 'react'
import './CustomNavbar.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function CustomNavbar() {



  return (
    <div className='customNavbar'>
        <div className='customBrand'>
            Autokennzeichentool
        </div>
        <div className='customOptionBar'>
            <div className='customOption customOptionBarElement'>
                Import
            </div>
            <div className='customDropdown customOptionBarElement'>
                <div className='customDropTitle'>Export<ArrowDropDownIcon/></div>
                <div className='customDropList '>
                    <div className='customDropOption'>
                        as Json
                    </div>
                    <div className='customDropOption'>
                        as XML
                    </div>
                    <div className='customDropOption'>
                        as CSV
                    </div>
                </div> 
            </div>
        </div>
    </div>
  )
}
