import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Partials/Header'
import Footer from '../Partials/Footer'

const HomeTemplateSeller = () => {
  return (
    <div className='container-fluid p-0'>
        
    <Header></Header>
    <div style={{minHeight:530}}>
    <Outlet></Outlet>
    </div>
    <Footer></Footer>

    </div>
  )
}

export default HomeTemplateSeller