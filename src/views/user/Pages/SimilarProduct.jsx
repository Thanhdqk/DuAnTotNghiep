import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { NavLink } from 'react-router-dom';
import { addItemToCart } from '../Reducer/cartReducer';
import { useDispatch } from 'react-redux';
const SimilarProduct = ({ Products }) => {
    const dispatch = useDispatch();
    return (
        <Swiper
            style={{ height: 390 }}
            spaceBetween={10}
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
            {Products.map((product) => {
                const totalStars = product.danhgia.reduce((sum, rating) => sum + rating.so_sao, 0);
                const averageStars = product.danhgia.length > 0 ? (totalStars / product.danhgia.length).toFixed(1) : 0;

                return (
                    <SwiperSlide key={product.san_phamId}>
                        <div className="d-flex justify-content-center">
                            <div
                                className={`card mx-5 mt-3 ${product.so_luong === 0 ? 'out-of-stock' : ''}`}
                                style={{
                                    minWidth: '250px',
                                    minHeight: '310px',
                                    borderRadius: '20px',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    boxShadow: 'none',
                                   
                                }}
                            >

{product.so_luong === 0 && (
                <>
                   
                    <div
                        style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(255, 255, 255, 0.5)', 
                            zIndex: 1,
                        }}
                    ></div>
                  
                    <div
                        className="fw-bold"
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: 'red',
                            fontWeight: 'bold',
                            fontSize: '18px',
                            zIndex: 2, 
                            opacity: 1, 
                        }}
                    >
                        Hết hàng
                    </div>
                </>
            )}

                                {/* Chỉ tạo NavLink nếu sản phẩm còn hàng */}
                                {product.so_luong > 0 ? (
                                    <NavLink to={`/product/detail/${product.san_phamId}`} className="nav1-link">
                                        <img
                                            src={`/images/${product.hinhanh[0].ten_hinh}`}
                                            className="img-fluid mx-auto"
                                            style={{ maxWidth: 200, maxHeight: 200 }}
                                            alt=""
                                        />
                                        <div className="text-start ms-3 mt-1">
                                            <h6>{product.ten_san_pham}</h6>
                                            {product.phantram_GG > 0 ? (
                                                <div className="d-flex">
                                                    <p style={{ fontSize: 14, textDecoration: 'line-through' }}>
                                                        {product.gia_goc} <span className="text-danger">VND</span>
                                                    </p>
                                                    <p className="ms-3 fw-bold" style={{ fontSize: 14 }}>
                                                        {product.gia_km} <span className="text-danger">VND</span>
                                                    </p>
                                                </div>
                                            ) : (
                                                <p style={{ fontSize: 14 }}>
                                                    {product.gia_goc} <span className="text-danger fw-bold">VND</span>
                                                </p>
                                            )}
                                            <div className="d-flex">
                                                <p>
                                                    {product.danhgia.length}{' '}
                                                    <span className="text-primary" style={{ fontSize: 13 }}>
                                                        Đánh giá
                                                    </span>
                                                </p>
                                                <p className="text-end ms-auto me-2">
                                                    {averageStars}{' '}
                                                    <span className="bi bi-star-fill text-warning" />
                                                </p>
                                            </div>
                                        </div>
                                    </NavLink>
                                ) : (

                                    <>
                                        <img
                                            src={`/images/${product.hinhanh[0].ten_hinh}`}
                                            className="img-fluid mx-auto"
                                            style={{ maxWidth: 200, maxHeight: 200 }}
                                            alt=""
                                        />
                                        <div className="text-start ms-3 mt-1">
                                            <h6>{product.ten_san_pham}</h6>
                                            <p style={{ fontSize: 14 }}>
                                                {product.gia_goc} <span className="text-danger fw-bold">VND</span>
                                            </p>
                                            <div className="d-flex">
                                                <p>
                                                    {product.danhgia.length}{' '}
                                                    <span className="text-primary" style={{ fontSize: 13 }}>
                                                        Đánh giá
                                                    </span>
                                                </p>
                                                <p className="text-end ms-auto me-2">
                                                    {averageStars}{' '}
                                                    <span className="bi bi-star-fill text-warning" />
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}


                                <div className="text-center d-flex flex-column justify-content-center borderRadiousRight">
                                    <i
                                        className={`fa fa-cart-plus text-white ${product.so_luong === 0 ? 'disabled' : ''
                                            }`}
                                        onClick={(e) => {
                                            if (product.so_luong > 0) {
                                                e.stopPropagation();
                                                const addCart = addItemToCart({
                                                    ProductDetail: product,
                                                    QuantityProduct: 1,
                                                });
                                                dispatch(addCart);
                                            }
                                        }}
                                    ></i>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>


                );
            })}
        </Swiper>
    );
};


export default SimilarProduct