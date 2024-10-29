import React from 'react'
import { NavLink } from 'react-router-dom'

const ProductDanhmuc = ({ Products }) => {
    return (
        <div className='row '>

            {Products.map((product) => {
                    const totalStars = product.danhgia.reduce((sum, rating) => sum + rating.so_sao, 0);
                    const averageStars = product.danhgia.length > 0 ? (totalStars / product.danhgia.length).toFixed(1) : 0;
                return <NavLink to={`/product/detail/${product.san_phamId}`} className="col-sm-12  col-md-3 mt-3 d-flex justify-content-center" key={product.san_phamId} style={{textDecoration:'none'}}>

                    <div className="card mx-5 mt-3 " style={{ minWidth: '250px', minHeight: '310px', borderRadius: '20px', position: 'relative', overflow: 'hidden' }}>


                        <img src={`/images/${product.hinhanh[0].ten_hinh}`} className='img-fluid mx-auto' style={{ maxWidth: 200 }} alt="" />

                        <div className='text-start ms-3 mt-1'>
                            <h6 >{product.ten_san_pham}</h6>
                            {product.phantram_GG > 0 ? <div className="d-flex">
                                <p style={{ fontSize: 14, textDecoration: 'line-through' }}>{product.gia_goc} <span className='text-danger'>VND</span></p>
                                <p className='ms-3 fw-bold' style={{ fontSize: 14 }}>{product.gia_km} <span className='text-danger'>VND</span></p>

                            </div> : <p className='fw-bold' style={{ fontSize: 14 }}>{product.gia_goc} <span className='text-danger'>VND</span></p>}

                            

                            <div className="d-flex">
                                <p>2.4 <span className='text-danger'>Km</span></p>
                                <p className='text-end ms-auto me-2'> {averageStars} <span className="bi bi-star-fill text-warning" />
                                </p>
                            </div>


                        </div>

                        <div className='text-center d-flex flex-column justify-content-center borderRadiousRight'  >

                            <i className="fa fa-cart-plus text-white"></i>

                        </div>



                    </div>

                </NavLink>



            })}


        </div>
    )
}

export default ProductDanhmuc