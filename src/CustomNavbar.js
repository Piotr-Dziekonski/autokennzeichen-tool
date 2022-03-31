import React from 'react'
import './CustomNavbar.css'

export default function CustomNavbar() {



  return (
    <div className='customNavbar'>
        <div className='customBrand'></div>
        <div className='customOptionBar'>
            <div className='customDropdown'>
                <div className='customDropTitle'>Export</div>
                <div className='customDropList'>
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
