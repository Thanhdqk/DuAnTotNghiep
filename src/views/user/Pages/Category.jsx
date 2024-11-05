import React from 'react'

const Category = () => {
  return (
    <div>
        <div className="row">
      <div className='col-md-12 mt-5'>

<h6 className='text-center text-danger mt-2'>CUSTOMER FAVORITES</h6>

</div>
<div className='col-md-12'>

<h1 className='text-center text-dark mt-4 fw-bold'>Popular Catagories</h1>

</div>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '10px',
        marginTop: '20px'
      }}>
        <div className="card mx-4 text-center" style={{ width: '180px', height: '180px', borderRadius: '20px' }}>
          <div className='cycleBlueLight mx-auto mt-3'>
            <img src="/images/category1.png" className='img-fluid' alt="" />

          </div>

          <h5 className='mt-2'>Main Dish</h5>
          <p >(84 dishes)</p>





        </div>

        <div className="card mx-4 text-center" style={{ width: '180px', height: '180px', borderRadius: '20px' }}>
          <div className='cycleBlueLight mx-auto mt-3'>
            <img src="/images/category1.png" className='img-fluid' alt="" />

          </div>

          <h5 className='mt-2'>Main Dish</h5>
          <p >(84 dishes)</p>





        </div>

        <div className="card mx-4 text-center" style={{ width: '180px', height: '180px', borderRadius: '20px' }}>
          <div className='cycleBlueLight mx-auto mt-3'>
            <img src="/images/category1.png" className='img-fluid' alt="" />

          </div>

          <h5 className='mt-2'>Main Dish</h5>
          <p >(84 dishes)</p>





        </div>

        <div className="card mx-4 text-center" style={{ width: '180px', height: '180px', borderRadius: '20px' }}>
          <div className='cycleBlueLight mx-auto mt-3'>
            <img src="/images/category1.png" className='img-fluid' alt="" />

          </div>

          <h5 className='mt-2'>Main Dish</h5>
          <p >(84 dishes)</p>





        </div>


      </div>
    </div>
  )
}

export default Category