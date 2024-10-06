import React from 'react'
import ListStore from './ListStore'
const Index = () => {
  return (
    <div className='container-fluid mt-3 mb-5' >
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
      <div className='row mt-4'>

        <div className='col-md-12 mt-5'>

          <h6 className='ms-5 text-danger mt-5'>SPECIAL STORE</h6>

        </div>

        <div className='col-md-6'>

          <h1 className='ms-5 text-dark mt-1 fw-bold'>Standout Dishes
            <br />
            From Our Menu
          </h1>

        </div>
        <div className='col-md-6 d-flex flex-column justify-content-center '>



        </div>

      </div>

      {/* // list product */}
      <ListStore></ListStore>

      <div className='row mt-4'>

        <div className='col-md-6 mt-2'>

          <h6 className='ms-5 text-danger mt-5'>OUR STORY & SERVICES</h6>
          <h1 className='ms-5 text-dark mt-1 fw-bold'>Our Culinary Journey
            <br />
            And Services
          </h1>

          <p className='ms-5 text-dark mt-1 fw-bold'>Rooted in passion, we curate unforgettable dining
            experiences and offer exceptional services, blending culinary artistry with warm hospitality.</p>


          <div className='ms-5'>

            <button className='text-white  ' style={{ backgroundColor: 'rgb(57,219,74)', border: 'none', borderRadius: '50px', padding: '10px 20px' }}>
              Order Now
            </button>

          </div>

        </div>

        <div className='col-md-6 mt-2 '>

          <div className='d-flex mt-4 ms-5'>

            <div className="card mx-4" style={{ width: '180px', height: '180px', borderRadius: '20px' }}>

            </div>

            <div className="card mx-4" style={{ width: '180px', height: '180px', borderRadius: '20px' }}>

            </div>

          </div>

          <div className='d-flex mt-3  ms-5'>

            <div className="card mx-4" style={{ width: '180px', height: '180px', borderRadius: '20px' }}>

            </div>

            <div className="card mx-4" style={{ width: '180px', height: '180px', borderRadius: '20px' }}>

            </div>

          </div>

        </div>


      </div>






    </div>
  )
}

export default Index