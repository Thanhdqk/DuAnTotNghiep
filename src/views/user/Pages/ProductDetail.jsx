import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import axios from 'axios';
import SimilarProduct from './SimilarProduct';
import { AddItem } from '../Reducer/cartReducer';
import { useDispatch } from 'react-redux';
import DanhGia from './DanhGia';

const ProductDetail = () => {

    const params = useParams();
    const [ProductDetail, SetProductDetail] = useState({});
    const [Danhgia, SetDanhGia] = useState([]);
    const [ProductsSimilar, SetProductsSimilar] = useState([])
    const [QuantityProduct, SetQuantityProduct] = useState(1);
    const dispatch = useDispatch();

    const handleAddCart = (e) => {
        alert("clicked")
    }

    const handleChange = (e) => {
        const value = Number(e.target.value);

        if (value >= 1) {
            SetQuantityProduct(value);
        }
    };
    const Change_Img = (event) => {

        const src = event.target.getAttribute('img-change');
        document.querySelector(".image1").src = `/images/${src}`
    }

    const API_Product_Detail = async () => {
        try {
            const res = await axios({ url: `http://localhost:8080/Product/Detail?id=${params.id}`, method: 'GET' })
            const resdanhgia = await axios({ url: `http://localhost:8080/FindDangGiaByIdSanPham?id=${params.id}`, method: 'GET' })
            const resProductSimlar = await axios({ url: `http://localhost:8080/Product/Similar?id=${params.id}`, method: 'GET' })
            SetProductDetail(res.data);
            SetDanhGia(resdanhgia.data)
            SetProductsSimilar(resProductSimlar.data)
        } catch (error) {

        }
    }

    useEffect(() => {

        API_Product_Detail()
        window.scrollTo(0, 0);

    }, [params.id])



    return (
        <div className='container mb-5'>
            <div className='row mb-5' >
                <hr className='text-green' />


                <div className="col-md-6  ">
                    {ProductDetail?.hinhanh?.length > 0 ? <img className='img-fluid image1' style={{ minHeight: 350, minWidth: 300 }} src={`/images/${ProductDetail.hinhanh[0].ten_hinh}`} alt="" /> : null}

                    <div className='row mx-auto'>

                        {ProductDetail?.hinhanh?.slice(1, 4).map((image, index) => {
                            return <div className='imagesupport ms-2' key={index} >

                                <img onClick={Change_Img} img-change={`${image.ten_hinh}`} className='img-fluid mt-1 ' style={{ maxHeight: 100, maxWidth: 100 }} src={`/images/${image.ten_hinh}`} alt="" />

                            </div>
                        })}

                    </div>
                </div>
                <div className="col-md-6 ">

                    <h3 className='mt-5 fw-bold'>{ProductDetail.ten_san_pham}</h3>
                    <span  ><i class="bi bi-star-fill text-warning fs-5 me-1"></i>  4.9(10)  |  <a className='ms-3'> 10 Đánh giá</a> </span>

                    <h2 className="fw-bold mt-3">{ProductDetail.gia_goc} đ</h2>

                    <h6 className="fw-bold mt-2">{ProductDetail.mo_ta}</h6>

                    {/* <ul className='mt-3'>
                        <li style={{ marginBottom: '10px' }}> <b>Dưa Hấu Giống Mỹ</b> có vỏ màu xanh và sọc dưa đậm, ruột đỏ, hột đen. Quả có vỏ cứng, dày, ăn rất ngon, độ đường cao, hương vị thơm ngon, hấp dẫn.</li>
                        <li style={{ marginBottom: '10px' }}>Dưa Hấu Giống Mỹ có vỏ màu xanh và sọc dưa đậm, ruột đỏ, hột đen. Quả có vỏ cứng, dày, ăn rất ngon, độ đường cao, hương vị thơm ngon, hấp dẫn.</li>

                        <li>Có thể thưởng thức bằng cách ướp lạnh hoặc nước ép dưa hấu, sinh tố, kem, hoặc salad...</li>

                    </ul> */}
                    <hr />
                    <h6 className="fw-bold mt-4">Số lượng</h6>
                    <div className="btn-group mt-2" role="group" aria-label="Basic example">
                        <button onClick={() => {
                            if (QuantityProduct == 1) { return }
                            SetQuantityProduct(QuantityProduct - 1)
                        }} type="button" className="btn btn-outline-primary btn-sm p-2 fw-bold">-</button>
                        <input onChange={handleChange} className="form-control form-control-sm w-50" max={300} type="number" value={QuantityProduct} />
                        <button onClick={() => { SetQuantityProduct(QuantityProduct + 1) }} type="button" className="btn btn-outline-primary btn-sm p-2 fw-bold">+</button>


                    </div>

                    <div className='d-flex mt-5'>

                        <button className='btn btn-outline-dark text-danger '><i class="bi bi-heart-fill fs-3"></i></button>

                        <button className='btn btn-outline-dark text-danger ms-3'><i class="fa fa-cart-plus fs-3"></i></button>

                        <button onClick={() => {

                            const addCart = AddItem({
                                ProductDetail: ProductDetail,
                                QuantityProduct: QuantityProduct,
                            });
                            dispatch(addCart)
                        }} className="gradient-button ms-4 fw-bold">
                            Thêm vào giỏ hàng
                        </button>
                    </div>





                </div>





            </div>

            <DanhGia DanhGias={Danhgia} ></DanhGia>
            <div className="row">
                <div className="col-md-12">

                    <h4 className='mt-2 fw-bold'>Sản phẩm tương tự</h4>



                    <SimilarProduct Products={ProductsSimilar}></SimilarProduct>



                </div>
            </div>

        </div>
    )
}

export default ProductDetail