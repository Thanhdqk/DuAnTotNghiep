import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation,Autoplay } from 'swiper/modules';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
const PopupAD = () => {
  const [pop,setpop] = useState([]);
  const api = async() =>{
    const res = await  axios({ url: 'http://localhost:8080/FindAllPopUpSpare?id=PopUp_1', method: 'GET' });
    setpop(res.data);
  }
  useEffect(()=>{
    api()
  },[])
  
  return (
    <>
    {/* Modal */}
    <div className="modal fade"  id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div  className="modal-dialog modal-dialog-centered" >
        <div className="modal-content">
          <div className="modal-header" style={{borderBottom:'none'}}>
           
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body" style={{minHeight:'200px'}}>
          <div className="d-flex justify-content-center">


          <Swiper
    style={{ height: 400 }}
    spaceBetween={10} // Tạo khoảng cách giữa các slide
   
    autoplay={{
        delay: 3000, // Slide sẽ tự động chuyển sau 3 giây
        disableOnInteraction: false, // Tiếp tục tự động sau khi người dùng tương tác
    }}
    modules={[Navigation, Autoplay]} // Kích hoạt Autoplay và Navigation
    className="mySwiper1"
    slidesPerView={1} // Chỉ hiển thị 1 slide
>
{pop.map((ad)=>{
  return <SwiperSlide className='' key={ad.popupID}>
  
  {ad.sanpham.map((sp) => (
        <NavLink style={{textDecoration:'none'}} to={`/product/detail/${sp.san_phamId}`} key={sp.san_phamId}>
          <img className='img-fluid mx-auto' src={`/images/${sp.hinhanh[0].ten_hinh}`} alt="" style={{ maxWidth: '65%', height: '70%' }} />
          <h4 className='mt-2'>{sp.ten_san_pham}</h4>
          <h4 className='text-danger fw-bold mb-0 text-start ms-3'>Giảm giá {sp.phantram_GG}%</h4>
          <div className='d-flex mt-1'>
            <p className='ms-3' style={{ fontSize: 16, textDecoration: 'line-through' }}>
              {sp.gia_goc} <span className='text-danger'>VND</span>
            </p>
            <p className='ms-3 fw-bold' style={{ fontSize: 16 }}>
              {sp.gia_km} <span className='text-danger'>VND</span>
            </p>
          </div>
        </NavLink>
      ))}
</SwiperSlide>
})}


    
</Swiper>
           
            

           

          </div>
          
   
        
          </div>
          
        </div>
      </div>
    </div>
  </>

  )  
}

export default PopupAD