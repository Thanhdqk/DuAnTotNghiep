import React from 'react'

const OldBanner = () => {
  return (
    <div className='row'>
    <div className='col-md-6 d-flex flex-column justify-content-center align-items-center' style={{ minHeight: 400 }}>
      <h1 className='fw-bold text-center'>Dive into Delights
        <br />
        Of Delectable <span className='h1 fw-bold text-green' >Food</span>
      </h1>


      <p className='text-center mt-4'>Where Each Plate Weaves a Story of Culinary
        <br />
        specially curated for food lovers.</p>



      <div className='d-flex mt-3'>

        <button className='text-white ' style={{ backgroundColor: 'rgb(57,219,74)', border: 'none', borderRadius: '50px', padding: '10px 20px' }}>
          Order Now
        </button>

        <button className='text-dark ms-2' style={{ backgroundColor: 'white', border: '1px solid black', borderRadius: '50px', padding: '10px 20px' }}>
          Watch Now
        </button>

      </div>


    </div>


    <div className='col-md-6 d-flex flex-column justify-content-center align-items-center' style={{ minHeight: 400, position: 'relative' }}>
      {/* Hình tròn màu xanh lá */}
      <div className='cyclegreen'></div>

      {/* Hình ảnh */}
      <img src="/images/banner.png" className='img-fluid' alt="" />
    </div>
  </div>
  )
}

export default OldBanner