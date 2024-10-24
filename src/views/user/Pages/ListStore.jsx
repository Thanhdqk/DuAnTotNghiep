import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ListProduct from './ListProduct';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const ListStore = ({ Products }) => {

  const listProduct = useSelector(state => state.product.ListProductSearch);


  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '10px',
      marginTop: '20px'
    }}>


      {listProduct.map((product) => {
          const totalStars = product.danhgia.reduce((sum, rating) => sum + rating.so_sao, 0);
          const averageStars = product.danhgia.length > 0 ? (totalStars / product.danhgia.length).toFixed(1) : 0;
        return <NavLink to={`/product/detail/${product.san_phamId}`} className="card mx-5 mt-3" key={product.san_phamId} style={{ width: '250px', minHeight: '310px', borderRadius: '20px', position: 'relative', overflow: 'hidden', textDecoration: 'none' }}>


          <img src={`/images/${product.hinhanh[0].ten_hinh}`} className='img-fluid mx-auto' style={{ maxWidth: 200 }} alt="" />

          <div className='ms-3 mt-1'>
            <h6 >{product.ten_san_pham}</h6>
            {product.phantram_GG > 0 ? <div className="d-flex">
              <p style={{ fontSize: 14, textDecoration: 'line-through' }}>{product.gia_goc} <span className='text-danger'>VND</span></p>
              <p className='ms-3 fw-bold' style={{ fontSize: 14 }}>{product.gia_km} <span className='text-danger'>VND</span></p>

            </div> : <p style={{ fontSize: 14 }}>{product.gia_goc} <span className='text-danger'>VND</span></p>}



            <div className="d-flex">
              <p>2.4 <span className='text-danger'>Km</span></p>
              <p className='text-end ms-auto me-2'> {averageStars} <span className="bi bi-star-fill text-warning" />
              </p>
            </div>


          </div>

          <div className='text-center d-flex flex-column justify-content-center borderRadiousRight'  >

            <i class="bi bi-heart text-white"></i>

          </div>

        </NavLink>



      })}

      {listProduct.length > 0 ? null




        : Products.map((product) => {
          const totalStars = product.danhgia.reduce((sum, rating) => sum + rating.so_sao, 0);
          const averageStars = product.danhgia.length > 0 ? (totalStars / product.danhgia.length).toFixed(1) : 0;
          return <div className="card mx-5 mt-3" key={product.san_phamId} style={{ width: '250px', minHeight: '310px', borderRadius: '20px', position: 'relative', overflow: 'hidden' }}>


            <img src={`/images/${product.hinhanh[0].ten_hinh}`} className='img-fluid mx-auto' style={{ maxWidth: 200 }} alt="" />

            <div className='ms-3 mt-1'>
              <h6 >{product.ten_san_pham}</h6>
              {product.phantram_GG > 0 ? <div className="d-flex">
                <p style={{ fontSize: 14, textDecoration: 'line-through' }}>{product.gia_goc} <span className='text-danger'>VND</span></p>
                <p className='ms-3 fw-bold' style={{ fontSize: 14 }}>{product.gia_km} <span className='text-danger'>VND</span></p>

              </div> : <p className='fw-bold' style={{ fontSize: 14 }}>{product.gia_goc} <span className='text-danger'>VND</span></p>}



              <div className="d-flex">
                <p>2.4 <span className='text-danger'>Km</span></p>
                <p className='text-end ms-auto me-2'> {averageStars}  <span className="bi bi-star-fill text-warning" />
                </p>
              </div>


            </div>

            <div className='text-center d-flex flex-column justify-content-center borderRadiousRight'  >

              <i class="bi bi-heart text-white"></i>

            </div>

          </div>



        })}

























    </div>
  )
}

export default ListStore