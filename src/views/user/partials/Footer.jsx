import React from 'react'

const Footer = () => {
  return (
    <footer className=' footer-bg-color p-5'>
<div className='row '>
      <div className='col-md-3 text-center  '>
        <img src="/images/logo-web.png" alt="" />

        <p className='mt-2'>Savor the artistry where
          <br></br> every dish is a culinary
          <br></br>
          masterpiece</p>
      </div>

      <div className='col-md-3 d-flex flex-column align-items-center'>
        <h6 className=''>Useful links</h6>
        <div>
        <p className='mt-3 '>About us</p>
        <p>Events</p>
        <p>Blogs</p>
        <p>FAQ</p>
        </div>
      </div>

      <div className='col-md-3 d-flex flex-column align-items-center'>
        <h6>Main Menu</h6>
        <p className='mt-3'>Delivery</p>
        <div>
        <p>Home</p>
        <p>Offer</p>
        <p>Menus</p>
        </div>

      </div>

      <div className='col-md-3 d-flex flex-column align-items-center'>
        <h6>Contact Us</h6>
        <div>
        <p className='mt-3'>SnackShop@gmail.com</p>
        <p>+64 958 248 966</p>
        <p>Social media</p>
        </div>
      </div>

      <div className='row mt-5'>

        <div className='col-md-5 d-flex'>

          <div className='ms-5'>

        <i className="bi bi-facebook fs-3 text-primary ms-5"></i>

        <i className="bi bi-instagram fs-3  ms-3"></i>

        <i className="bi bi-youtube fs-3 text-danger ms-3"></i>

        <i className="bi bi-whatsapp fs-3 text-green ms-3"></i>
       

          </div>

        </div>
        <div className='col-md-7'>

          <p className='fw-bold mt-2'>Copyright  @ loikogay | All rights reserved</p>


        </div>

      </div>
      </div>
    </footer>
  )
}

export default Footer