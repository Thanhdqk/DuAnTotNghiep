import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { addItemToCart } from '../Reducer/cartReducer';
import { useDispatch } from 'react-redux';
import { Pagination } from 'antd';
const ProductDanhmuc = ({ Products }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(8); 

    const currentProducts = Products.slice(
        (currentPage - 1) * pageSize, currentPage * pageSize
      );


      const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
      };

    const dispatch = useDispatch()
    return (
        <div className='row '>
            {currentProducts.map((product, index) => {
                const totalStars = product.danhgia.reduce((sum, rating) => sum + rating.so_sao, 0);
                const averageStars = product.danhgia.length > 0 ? (totalStars / product.danhgia.length).toFixed(1) : 0;
                
                return (
                    <div className="col-sm-12 col-md-3 mt-3 d-flex justify-content-center" key={index}>
                        <div
                            className="card mx-5 mt-3"
                            style={{
                                minWidth: '250px',
                                minHeight: '310px',
                                borderRadius: '20px',
                                position: 'relative',
                                overflow: 'hidden',
                                opacity: product.so_luong === 0 ? 0.5 : 1,
                            }}
                        >
                            
                            {product.so_luong === 0 && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        color: 'red',
                                        fontWeight: 'bold',
                                        fontSize: '18px',
                                        zIndex: 2,
                                    }}
                                >
                                    Hết hàng
                                </div>
                            )}

                          
                            {product.so_luong > 0 ? (
                                <NavLink
                                    to={`/product/detail/${product.san_phamId}`}
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    <div className='d-flex justify-content-center align-content-center'>
                                        <img
                                            src={`/images/${product.hinhanh[0].ten_hinh}`}
                                            className="img-fluid mx-auto"
                                            style={{ maxWidth: 200 }}
                                            alt=""
                                        />
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
                                            <p>{product.danhgia.length} <span className='text-primary' style={{ fontSize: 13 }}>Đánh giá</span></p>
                                            <p className='text-end ms-auto me-2'>
                                                {averageStars} <span className="bi bi-star-fill text-warning" />
                                            </p>
                                        </div>
                                    </div>
                                </NavLink>
                            ) : (
                               
                                <>
                                    <div className='d-flex justify-content-center align-content-center'>
                                        <img
                                            src={`/images/${product.hinhanh[0].ten_hinh}`}
                                            className="img-fluid mx-auto"
                                            style={{ maxWidth: 200 }}
                                            alt=""
                                        />
                                    </div>
                                    <div className='text-start ms-3 mt-1'>
                                        <h6>{product.ten_san_pham}</h6>
                                        <p className='fw-bold' style={{ fontSize: 14 }}>
                                            {product.gia_goc} <span className='text-danger'>VND</span>
                                        </p>
                                        <div className="d-flex">
                                            <p>{product.danhgia.length} <span className='text-primary' style={{ fontSize: 13 }}>Đánh giá</span></p>
                                            <p className='text-end ms-auto me-2'>
                                                {averageStars} <span className="bi bi-star-fill text-warning" />
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )}

                           
                            <div
                                className={`text-center d-flex flex-column justify-content-center borderRadiousRight ${product.so_luong === 0 ? 'disabled' : ''}`}
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
                            >
                                <i className="fa fa-cart-plus text-white"></i>
                            </div>
                        </div>
                    </div>
                );
            })}

            <div className="col-md-12 d-flex justify-content-center align-items-center mt-1 mb-4">
            <Pagination 
        current={currentPage}
        pageSize={pageSize}
        total={Products.length}
        onChange={handlePageChange}
        showSizeChanger
        pageSizeOptions={['8', '16', '24']}
        style={{ textAlign: 'center', marginTop: '20px' }}
      />
      
            </div>
        </div>
    );
}

export default ProductDanhmuc;
