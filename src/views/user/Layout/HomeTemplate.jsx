import React from 'react'
import Header from '../partials/Header'
import Footer from '../partials/Footer'
import { Outlet } from 'react-router-dom'
import NewHeader from '../partials/NewHeader'
const HomeTemplate = () => {
  return (
    <div className='container-fluid p-0'>
      <NewHeader></NewHeader>
      
      <div style={{minHeight:630}}>

      <Outlet></Outlet>

      </div>
      <Footer ></Footer> 
    </div>
  )
}

export default HomeTemplate