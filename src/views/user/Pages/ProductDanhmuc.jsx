import React from 'react'
import { NavLink } from 'react-router-dom'
import { addItemToCart } from '../Reducer/cartReducer';
import { useDispatch } from 'react-redux';

const ProductDanhmuc = ({ Products }) => {
    const dispatch = useDispatch()
    return (
        <div className='row '>

            {Products.map((product,index) => {
                    const totalStars = product.danhgia.reduce((sum, rating) => sum + rating.so_sao, 0);
                    const averageStars = product.danhgia.length > 0 ? (totalStars / product.danhgia.length).toFixed(1) : 0;
                    return (
                        <div className="col-sm-12 col-md-3 mt-3 d-flex justify-content-center" key={index}>
                            <div className="card mx-5 mt-3"style={{minWidth: '250px',minHeight: '310px', borderRadius: '20px', position: 'relative',  overflow: 'hidden',}}>
                                <NavLink    to={`/product/detail/${product.san_phamId}`}  style={{ textDecoration: 'none',color: 'inherit' }} >
                               <div className='d-flex justify-content-center align-content-center'>
                                    <img src={`/images/${product.hinhanh[0].ten_hinh}`}  className="img-fluid mx-auto" style={{ maxWidth: 200 }} alt=""/>
                                    </div>
                                    <div className='text-start ms-3 mt-1'>
                                        <h6>{product.ten_san_pham}</h6>
                                        {product.phantram_GG > 0 ? (
                                            <div className="d-flex">
                                                <p style={{ fontSize: 14, textDecoration: 'line-through' }}>
                                                    {product.gia_goc} <span className='text-danger'>VND</span>
                                                </p>
                                                <p className='ms-3 fw-bold' style={{ fontSize: 14 }}>
                                                    {product.gia_km} <span className='text-danger'>VND</span>
                                                </p>
                                            </div>
                                        ) : (
                                            <p className='fw-bold' style={{ fontSize: 14 }}>
                                                {product.gia_goc} <span className='text-danger'>VND</span>
                                            </p>
                                        )}
                                        <div className="d-flex">
                                        <p>{product.danhgia.length} <span className='text-primary' style={{fontSize:13}}>Đánh giá</span></p>
                                            <p className='text-end ms-auto me-2'>
                                                {averageStars} <span className="bi bi-star-fill text-warning" />
                                            </p>
                                        </div>
                                    </div>
                                </NavLink>
                                <div
                                    className='text-center d-flex flex-column justify-content-center borderRadiousRight'
                                    onClick={(e) => {
                                        e.stopPropagation(); 
                                        const addCart = addItemToCart({
                                            ProductDetail: product,
                                            QuantityProduct: 1,
                                          });
                                          dispatch(addCart);
                                    }}
                                >
                                    <i className="fa fa-cart-plus text-white"></i>
                                </div>
                            </div>
                        </div>
                    );
                    



            })}


        </div>
    )
}

export default ProductDanhmuc