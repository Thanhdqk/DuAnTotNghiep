import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation,Autoplay } from 'swiper/modules';
const PopupAD = () => {
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
    style={{ height: 370 }}
    spaceBetween={10} // Tạo khoảng cách giữa các slide
   
    autoplay={{
        delay: 3000, // Slide sẽ tự động chuyển sau 3 giây
        disableOnInteraction: false, // Tiếp tục tự động sau khi người dùng tương tác
    }}
    modules={[Navigation, Autoplay]} // Kích hoạt Autoplay và Navigation
    className="mySwiper1"
    slidesPerView={1} // Chỉ hiển thị 1 slide
>
    <SwiperSlide className=''>
        <img className='img-fluid' src="/images/product2.png" alt="" />
    </SwiperSlide>
    <SwiperSlide className=''>
        <img className='img-fluid' src="/images/product2.png" alt="" />
    </SwiperSlide>
    <SwiperSlide className=''>
        <img className='img-fluid' src="/images/product2.png" alt="" />
    </SwiperSlide>
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