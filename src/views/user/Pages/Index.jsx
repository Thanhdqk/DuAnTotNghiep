import React from 'react'
import ListStore from './ListStore'
import Banner from './Banner'
import Category from './Category'
import CategoryNew from './CategoryNew'
import ListStoreNew from './ListStoreNew'
import TestScroll from './TestScroll'
import Post from './Post'
const Index = () => {
  return (
    <div className='container-fluid  mb-5' >
      <Banner></Banner>

      <CategoryNew></CategoryNew>

      
      
      <div className='row '>

        <div className='col-md-12 mt-1'>

          <h6 className='ms-3 text-danger mt-5'>SPECIAL STORE</h6>

        </div>

        <div className='col-md-6'>

          <h1 className='ms-3 text-dark mt-1 fw-bold'>Standout Dishes
            <br />
            From Our Menu
          </h1>

        </div>
        <div className='col-md-6 d-flex flex-column justify-content-center '>



        </div>

      </div>

      {/* // list product */}
      {/* <ListStore></ListStore> */}
      <TestScroll></TestScroll>

      <div className="col-md-12 text-center">
          <button className='gradient-button-2' >Xem tất cả sản phẩm</button>
      </div>

      <div className='row '>

        <div className='col-md-12 '>

          <h6 className='ms-3 text-danger mt-2'>SPECIAL STORE</h6>

        </div>

        <div className='col-md-6'>

          <h1 className='ms-3 text-dark mt-1 fw-bold'>Standout Dishes
            <br />
            From Our Menu
          </h1>

        </div>
        <div className='col-md-6 d-flex flex-column justify-content-center '>



        </div>

      </div>

      {/* // list product */}
      {/* <ListStore></ListStore> */}
      <TestScroll></TestScroll>
      <div className="col-md-12 text-center">
          <button className='gradient-button-2' >Xem tất cả sản phẩm</button>
      </div>

      <div className='row '>

        <div className='col-md-12 '>

          <h6 className='ms-3 text-danger mt-2'>SPECIAL STORE</h6>

        </div>

        <div className='col-md-6'>

          <h1 className='ms-3 text-dark mt-1 fw-bold'>Standout Dishes
            <br />
            From Our Menu
          </h1>

        </div>
        <div className='col-md-6 d-flex flex-column justify-content-center '>



        </div>

      </div>

      {/* // list product */}
      {/* <ListStore></ListStore> */}
      <TestScroll></TestScroll>
      <div className="col-md-12 text-center">
          <button className='gradient-button-2' >Xem tất cả sản phẩm</button>
      </div>

     

     {/* // post */}
    <Post></Post>





    </div>
  )
}

export default Index