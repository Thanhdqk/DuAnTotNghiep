import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ListProduct from './ListProduct';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { addItemToCart } from '../Reducer/cartReducer';

const ListStore = ({ Products, checked }) => {

  const listProduct = useSelector(state => state.product.ListProductSearch);
  const TextSearch = useSelector(state => state.textSearch.Text);
  const danhmuc = useSelector(state => state.textSearch.Danhmuc);
  const sosao = useSelector(state => state.textSearch.sosao);
  const [firstSearch, SetfirstSearch] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    if (TextSearch) {
      SetfirstSearch(false)
    }
    if (danhmuc) {
      SetfirstSearch(false)
    }
    if (sosao) {
      SetfirstSearch(false)
    }
    if(checked)
    {
      SetfirstSearch(false)
    }
  }, [TextSearch,sosao,danhmuc,checked])

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '10px',
      marginTop: '20px'
    }}>

    {firstSearch ? Products.map((product) => {
        const totalStars = product.danhgia.reduce((sum, rating) => sum + rating.so_sao, 0);
        const averageStars = product.danhgia.length > 0 ? (totalStars / product.danhgia.length).toFixed(1) : 0;
        return <div
          className="card-container card mx-5 mt-3" key={product.san_phamId}
          style={{
            width: '250px',
            minHeight: '310px',
            borderRadius: '20px',
            position: 'relative',
            overflow: 'hidden',
            textDecoration: 'none',
          }}
        >
          <NavLink
            to={`/product/detail/${product.san_phamId}`}
            className="card-content"
            style={{
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src={`/images/${product.hinhanh[0].ten_hinh}`}
                className="img-fluid"
                style={{
                  maxWidth: 200,
                }}
                alt=""
              />
            </div>

            <div className="ms-3 mt-1">
              <h6>{product.ten_san_pham}</h6>
              {product.phantram_GG > 0 ? (
                <div className="d-flex">
                  <p
                    style={{
                      fontSize: 14,
                      textDecoration: 'line-through',
                    }}
                  >
                    {product.gia_goc} <span className="text-danger">VND</span>
                  </p>
                  <p
                    className="ms-3 fw-bold"
                    style={{
                      fontSize: 14,
                    }}
                  >
                    {product.gia_km} <span className="text-danger">VND</span>
                  </p>
                </div>
              ) : (
                <p className="fw-bold" style={{ fontSize: 14 }}>
                  {product.gia_goc} <span className="text-danger">VND</span>
                </p>
              )}
              <div className="d-flex">
              <p>{product.danhgia.length} <span className='text-primary' style={{fontSize:13}}>Đánh giá</span></p>
                <p className="text-end ms-auto me-2">
                  {averageStars} <span className="bi bi-star-fill text-warning" />
                </p>
              </div>
            </div>
          </NavLink>

          <div className="text-center d-flex flex-column justify-content-center borderRadiousRight">
            <i
              onClick={(e) => {
                e.stopPropagation();
                const addCart = addItemToCart({
                  ProductDetail: product,
                  QuantityProduct: 1,
                });
                dispatch(addCart);
              }}
              className="fa fa-cart-plus text-white"
            ></i>
          </div>
        </div>
      }): listProduct.length > 0 ? listProduct.map((product) => {
        const totalStars = product.danhgia.reduce((sum, rating) => sum + rating.so_sao, 0);
        const averageStars = product.danhgia.length > 0 ? (totalStars / product.danhgia.length).toFixed(1) : 0;
        return (
          <div
            className="card-container card mx-5 mt-3"
            style={{
              width: '250px',
              minHeight: '310px',
              borderRadius: '20px',
              position: 'relative',
              overflow: 'hidden',
              textDecoration: 'none',
            }}
          >
            <NavLink
              to={`/product/detail/${product.san_phamId}`}
              className="card-content"
              style={{
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img
                  src={`/images/${product.hinhanh[0].ten_hinh}`}
                  className="img-fluid"
                  style={{
                    maxWidth: 200,
                  }}
                  alt=""
                />
              </div>

              <div className="ms-3 mt-1">
                <h6>{product.ten_san_pham}</h6>
                {product.phantram_GG > 0 ? (
                  <div className="d-flex">
                    <p
                      style={{
                        fontSize: 14,
                        textDecoration: 'line-through',
                      }}
                    >
                      {product.gia_goc} <span className="text-danger">VND</span>
                    </p>
                    <p
                      className="ms-3 fw-bold"
                      style={{
                        fontSize: 14,
                      }}
                    >
                      {product.gia_km} <span className="text-danger">VND</span>
                    </p>
                  </div>
                ) : (
                  <p className="fw-bold" style={{ fontSize: 14 }}>
                    {product.gia_goc} <span className="text-danger">VND</span>
                  </p>
                )}
                <div className="d-flex">
                <p>{product.danhgia.length} <span className='text-primary' style={{fontSize:13}}>Đánh giá</span></p>
                  <p className="text-end ms-auto me-2">
                    {averageStars} <span className="bi bi-star-fill text-warning" />
                  </p>
                </div>
              </div>
            </NavLink>

            <div className="text-center d-flex flex-column justify-content-center borderRadiousRight">
              <i
                onClick={(e) => {
                  e.stopPropagation();
                  const addCart = addItemToCart({
                    ProductDetail: product,
                    QuantityProduct: 1,
                  });
                  dispatch(addCart);
                }}
                className="fa fa-cart-plus text-white"
              ></i>
            </div>
          </div>
        );
      }): <div className='row mt-5'>

              <div className="col-md-12 text-center mt-5">

                <h4 className='fw-bold'>Rất tiếc !</h4>
              <h6>Không tìm thấy kết quả</h6>

              <img className='img-fluid' src="/images/img-search.svg" alt="" />

              </div>

        </div>}

     

     



























    </div>
  )
}

export default ListStore