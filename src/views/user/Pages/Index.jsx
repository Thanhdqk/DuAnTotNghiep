import React, { useEffect } from 'react'
import ListStore from './ListStore'
import Banner from './Banner'
import Category from './Category'
import CategoryNew from './CategoryNew'
import ListStoreNew from './ListStoreNew'
import TestScroll from './TestScroll'
import Post from './Post'
import PopupAD from './PopupAD'
import { NavLink } from 'react-router-dom'
import { Call_API_Products } from '../Reducer/productReducer'
import { useDispatch, useSelector } from 'react-redux'
import ListProduct from './ListProduct'
import { setLoading } from '../Reducer/LoadingReducer'
const Index = () => {
   console.log('run')
   const dispatch = useDispatch();

  const ListProductThisWeek = useSelector(state => state.product.ListProductThisWeek);
  const ListProductTopSale = useSelector(state => state.product.ListProductTopSale);
  const ListProductDiscount = useSelector(state => state.product.ListProductDiscount);
  console.log(ListProductThisWeek)

  useEffect(()=>{
    const modal = new window.bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();
    const turnonloading = setLoading('block');
    dispatch(turnonloading)
    const CallAPIProduct = Call_API_Products();
    dispatch(CallAPIProduct);
    const turnoffloading = setLoading('none');
    dispatch(turnoffloading);
    // Cleanup: Đóng modal khi component unmount
    return () => {
      modal.hide();
    };
  },[])
  return (
    
    <div className='container-fluid  mb-5' >
     
      <Banner></Banner>

      <CategoryNew></CategoryNew>

      <PopupAD></PopupAD>
      
      
      <div className='row '>

        <div className='col-md-12 mt-1'>

          <h6 className='ms-3 text-danger mt-5'>ĐẶC BIỆT</h6>

        </div>

        <div className='col-md-6'>

          <h3 className='ms-3 text-dark mt-1 fw-bold'>Hàng mới nhập
            <br />
            Tuần này
          </h3>

        </div>
        <div className='col-md-6 d-flex flex-column justify-content-center '>



        </div>

      </div>

      {/* // list product */}
      {/* <ListStore></ListStore> */}
      <ListProduct products={ListProductThisWeek} ></ListProduct>

      <div className="col-md-12 text-center">
      <NavLink to={'allproduct/FindProductThisWeek'}   >   <button className='gradient-button-2' >Xem tất cả sản phẩm</button></NavLink>
      </div>

      <div className='row '>

        <div className='col-md-12 '>

          <h6 className='ms-3 text-danger mt-2'>ĐẶC BIỆT</h6>

        </div>

        <div className='col-md-6'>

          <h3 className='ms-3 text-dark mt-1 fw-bold'>Top các sản phẩm 
            <br />
            Bán chạy
          </h3>

        </div>
        <div className='col-md-6 d-flex flex-column justify-content-center '>



        </div>

      </div>

      {/* // list product */}
      {/* <ListStore></ListStore> */}
      <ListProduct products={ListProductDiscount} ></ListProduct>
      <div className="col-md-12 text-center">
        <NavLink to={'allproduct/FindProductThisWeek'}    >  <button className='gradient-button-2' >Xem tất cả sản phẩm</button></NavLink>
      </div>

      <div className='row '>

        <div className='col-md-12 '>

          <h6 className='ms-3 text-danger mt-2'>ĐẶC BIỆT</h6>

        </div>

        <div className='col-md-6'>

          <h3 className='ms-3 text-dark mt-1 fw-bold'>Hàng ngàn ưu đãi
            {/* <br />
            From Our Menu */}
          </h3>

        </div>
        <div className='col-md-6 d-flex flex-column justify-content-center '>



        </div>

      </div>

      {/* // list product */}
      {/* <ListStore></ListStore> */}
      <ListProduct products={ListProductDiscount} ></ListProduct>
      <div className="col-md-12 text-center">
          <NavLink to={'allproduct/FindProductDiscount'} className='gradient-button-2' >Xem tất cả sản phẩm</NavLink>
      </div>

     

     {/* // post */}
    <Post></Post>





    </div>
  )
}

export default Index