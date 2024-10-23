import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { NavLink } from 'react-router-dom';
const SimilarProduct = ({Products}) => {
    return (
        <Swiper
            style={{ height: 370 }}
            spaceBetween={10} // Tạo khoảng cách giữa các slide
            navigation={true}
            modules={[Navigation]}
            className="mySwiper1"
            breakpoints={{
                640: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                },
                1024: {
                    slidesPerView: 4,
                },
            }}
        >
            {Products?.map((product)=>{

return <SwiperSlide key={product.san_phamId} className=''>
<NavLink to={`/product/detail/${product.san_phamId}`} style={{textDecoration:'none'}} >
    <div className="d-flex justify-content-center" >

        <div className="card mx-5 mt-3 " style={{ minWidth: '250px', minHeight: '310px', borderRadius: '20px', position: 'relative', overflow: 'hidden', boxShadow: 'none' }}>


            <img src={`/images/${product.hinhanh[0].ten_hinh}`} className='img-fluid mx-auto' style={{ maxWidth: 200 }} alt="" />

            <div className='text-start ms-3 mt-1'>
                <h6 >{product.ten_san_pham}</h6>
                {product.phantram_GG >0 ? null :  <p style={{fontSize:14}}>{product.gia_goc} <span className='text-danger'>VND</span></p>}
               
                <div className="d-flex">
                <p style={{fontSize:14, textDecoration: 'line-through' }}>{product.gia_goc} <span className='text-danger'>VND</span></p>
                <p className='ms-3 fw-bold' style={{fontSize:14}}>{product.gia_km} <span className='text-danger'>VND</span></p>
                  
                </div>

                <div className="d-flex">
                    <p>2.4 <span className='text-danger'>Km</span></p>
                    <p className='text-end ms-auto me-2'> 4 <span className="bi bi-star-fill text-warning" />
                    </p>
                </div>


            </div>

            <div className='text-center d-flex flex-column justify-content-center borderRadiousRight'  >

                <i class="bi bi-heart text-white"></i>

            </div>



        </div>

    </div>
    </NavLink>
</SwiperSlide>


})}

        </Swiper>
    );
};


export default SimilarProduct