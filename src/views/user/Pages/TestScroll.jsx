import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { NavLink } from 'react-router-dom';

const TestScroll = () => {
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
                    slidesPerView: 5,
                },
            }}
        >
            <SwiperSlide className=''>
            <NavLink to="/product/detail/1" style={{textDecoration:'none'}}>
                <div className="d-flex justify-content-center" >

                    <div className="card mx-5 mt-3 " style={{ minWidth: '250px', minHeight: '310px', borderRadius: '20px', position: 'relative', overflow: 'hidden', boxShadow: 'none' }}>


                        <img src="/images/react.png" className='img-fluid mx-auto' style={{ maxWidth: 200 }} alt="" />

                        <div className='text-start ms-3 mt-1'>
                            <h5 >Fattoush salad</h5>
                            <p>escription of the item</p>

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
            
            <SwiperSlide>
                <div className=" d-flex justify-content-center">

                    <div className="card mx-5 mt-3 " style={{ minWidth: '250px', minHeight: '310px', borderRadius: '20px', position: 'relative', overflow: 'hidden', boxShadow: 'none' }}>


                        <img src="/images/react.png" className='img-fluid mx-auto' style={{ maxWidth: 200 }} alt="" />

                        <div className='text-start ms-3 mt-1'>
                            <h5 >Fattoush salad</h5>
                            <p>escription of the item</p>

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
            </SwiperSlide>
            <SwiperSlide>
                <div className=" d-flex justify-content-center">

                    <div className="card mx-5 mt-3 " style={{ minWidth: '250px', minHeight: '310px', borderRadius: '20px', position: 'relative', overflow: 'hidden', boxShadow: 'none' }}>


                        <img src="/images/react.png" className='img-fluid mx-auto' style={{ maxWidth: 200 }} alt="" />

                        <div className= 'text-start ms-3 mt-1'>
                            <h5 >Fattoush salad</h5>
                            <p>escription of the item</p>

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
            </SwiperSlide>
            <SwiperSlide>
                <div className=" d-flex justify-content-center">

                    <div className="card mx-5 mt-3 " style={{ minWidth: '250px', minHeight: '310px', borderRadius: '20px', position: 'relative', overflow: 'hidden', boxShadow: 'none' }}>


                        <img src="/images/react.png" className='img-fluid mx-auto' style={{ maxWidth: 200 }} alt="" />

                        <div className='text-start ms-3 mt-1'>
                            <h5 >Fattoush salad</h5>
                            <p>escription of the item</p>

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
            </SwiperSlide>
            <SwiperSlide>
                <div className=" d-flex justify-content-center">

                    <div className="card mx-5 mt-3 " style={{ minWidth: '250px', minHeight: '310px', borderRadius: '20px', position: 'relative', overflow: 'hidden', boxShadow: 'none' }}>


                        <img src="/images/react.png" className='img-fluid mx-auto' style={{ maxWidth: 200 }} alt="" />

                        <div className='text-start ms-3 mt-1'>
                            <h5 >Fattoush salad</h5>
                            <p>escription of the item</p>

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
            </SwiperSlide>
            <SwiperSlide>
                <div className=" d-flex justify-content-center">

                    <div className="card mx-5 mt-3 " style={{ minWidth: '250px', minHeight: '310px', borderRadius: '20px', position: 'relative', overflow: 'hidden', boxShadow: 'none' }}>


                        <img src="/images/react.png" className='img-fluid mx-auto' style={{ maxWidth: 200 }} alt="" />

                        <div className='text-start ms-3 mt-1'>
                            <h5 >Fattoush salad</h5>
                            <p>escription of the item</p>

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
            </SwiperSlide>
            <SwiperSlide>
                <div className=" d-flex justify-content-center">

                    <div className="card mx-5 mt-3 " style={{ minWidth: '250px', minHeight: '310px', borderRadius: '20px', position: 'relative', overflow: 'hidden', boxShadow: 'none' }}>


                        <img src="/images/react.png" className='img-fluid mx-auto' style={{ maxWidth: 200 }} alt="" />

                        <div className='text-start ms-3 mt-1'>
                            <h5 >Fattoush salad</h5>
                            <p>escription of the item</p>

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
            </SwiperSlide>
            <SwiperSlide>
                <div className=" d-flex justify-content-center">

                    <div className="card mx-5 mt-3 " style={{ minWidth: '250px', minHeight: '310px', borderRadius: '20px', position: 'relative', overflow: 'hidden', boxShadow: 'none' }}>


                        <img src="/images/react.png" className='img-fluid mx-auto' style={{ maxWidth: 200 }} alt="" />

                        <div className='text-start ms-3 mt-1'>
                            <h5 >Fattoush salad</h5>
                            <p>escription of the item</p>

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
            </SwiperSlide>
            <SwiperSlide>
                <div className=" d-flex justify-content-center">

                    <div className="card mx-5 mt-3 " style={{ minWidth: '250px', minHeight: '310px', borderRadius: '20px', position: 'relative', overflow: 'hidden', boxShadow: 'none' }}>


                        <img src="/images/react.png" className='img-fluid mx-auto' style={{ maxWidth: 200 }} alt="" />

                        <div className='text-start ms-3 mt-1'>
                            <h5 >Fattoush salad</h5>
                            <p>escription of the item</p>

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
            </SwiperSlide>
        </Swiper>
    );
};

export default TestScroll;
