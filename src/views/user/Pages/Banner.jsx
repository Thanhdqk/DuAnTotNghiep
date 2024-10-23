import React, { useEffect, useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { ListAll } from '../Reducer/bannerReducer';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
const Banner = () => {
  console.log('run')
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ListBanner = useSelector(state => state.banner.ListBanner);
    const onAutoplayTimeLeft = (s, time, progress) => {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };

    const ListAllBanner = async()=>{
      const res = await axios({url:'http://localhost:8080/FindAllBanner',method:'GET'})
      const api = ListAll(res.data);
      dispatch(api);
    }

    useEffect(()=>{
      ListAllBanner()
    },[])
    return (
      <div className='row mx-3'>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          className="mySwiper"
        >
         {ListBanner.map((banner,index)=>{
        
          return  <SwiperSlide key={index}><img src={`/images/${banner.hinh_anh}`} onClick={()=>{navigate(`/product/danhmuc/${banner.danhmuc[0].danh_mucId}`) }} className=' img-fluid' alt="Slide 1" /></SwiperSlide>



          
         })}
          
          
          <div className="autoplay-progress" slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        </Swiper>
      </div>
    );
}

export default Banner