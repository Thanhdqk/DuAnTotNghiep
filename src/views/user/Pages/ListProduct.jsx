import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { NavLink } from 'react-router-dom';
import { addItemToCart } from '../Reducer/cartReducer';
import { useDispatch } from 'react-redux';

const ListProduct = ({ products }) => {
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
                    slidesPerView: 5,
                },
            }}
        >
            {products.map((product) => {
                const totalStars = product.danhgia.reduce((sum, rating) => sum + rating.so_sao, 0);
                const averageStars = product.danhgia.length > 0 ? (totalStars / product.danhgia.length).toFixed(1) : 0;

                return (
                    <SwiperSlide key={product.san_phamId}>
                        <div className="d-flex justify-content-center">
                            <div className="card mx-5 mt-3" style={{ minWidth: '250px', minHeight: '310px', borderRadius: '20px', position: 'relative', overflow: 'hidden', boxShadow: 'none' }}>
                                {/* Nội dung sản phẩm */}
                                <NavLink to={`/product/detail/${product.san_phamId}`} className="nav1-link" >
                                    <img src={`/images/${product.hinhanh[0].ten_hinh}`} className='img-fluid mx-auto' style={{ maxWidth: 200, maxHeight: 200 }} alt="" />
                                    <div className='text-start ms-3 mt-1'>
                                        <h6>{product.ten_san_pham}</h6>
                                        {product.phantram_GG > 0 ? (
                                            <div className="d-flex">
                                                <p style={{ fontSize: 14, textDecoration: 'line-through' }}>{product.gia_goc} <span className='text-danger'>VND</span></p>
                                                <p className='ms-3 fw-bold' style={{ fontSize: 14 }}>{product.gia_km} <span className='text-danger'>VND</span></p>
                                            </div>
                                        ) : (
                                            <p style={{ fontSize: 14 }}>{product.gia_goc} <span className='text-danger fw-bold'>VND</span></p>
                                        )}
                                        <div className="d-flex">
                                            <p>{product.danhgia.length} <span className='text-primary' style={{fontSize:13}}>Đánh giá</span></p>
                                            <p className='text-end ms-auto me-2'>{averageStars} <span className="bi bi-star-fill text-warning" /></p>
                                        </div>
                                    </div>
                                </NavLink>
                                {/* Biểu tượng giỏ hàng */}
                                <div className='text-center d-flex flex-column justify-content-center borderRadiousRight'>
                                    <i className="fa fa-cart-plus text-white" onClick={(e) => {
                                        e.stopPropagation();
                                        const addCart = addItemToCart({
                                            ProductDetail: product,
                                            QuantityProduct: 1,
                                        });
                                        dispatch(addCart);
                                    }}></i>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
}

export default ListProduct;
