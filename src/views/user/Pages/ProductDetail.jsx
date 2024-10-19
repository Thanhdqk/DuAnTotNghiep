import React from 'react'
import SimilarProduct from './SimilarProduct'
const ProductDetail = () => {
    return (
        <div className='container mb-5'>
            <div className='row mb-5' >
                <hr className='text-green' />


                <div className="col-md-6  ">
                    <img className='img-fluid ' src="/images/product2.png" alt="" />

                    <div className='row mx-auto'>

                        <div className='imagesupport ms-2' >

                            <img className='img-fluid mt-4 ' style={{ maxHeight: 100, maxWidth: 100 }} src="/images/category1.png" alt="" />

                        </div>

                        <div className='imagesupport ms-2' >

                            <img className='img-fluid mt-4' style={{ maxHeight: 100, maxWidth: 100 }} src="/images/category1.png" alt="" />

                        </div>

                        <div className='imagesupport ms-2' >

                            <img className='img-fluid mt-4' style={{ maxHeight: 100, maxWidth: 100 }} src="/images/category1.png" alt="" />

                        </div>

                    </div>
                </div>
                <div className="col-md-6 ">

                    <h3 className='mt-5 fw-bold'>Dưa Hấu Giống Mỹ 2.7kg</h3>
                    <span  ><i class="bi bi-star-fill text-warning fs-5 me-1"></i>  4.9(10)  |  <a className='ms-3'> 10 Đánh giá</a> </span>

                    <h2 className="fw-bold mt-3">99.000 đ</h2>

                    <h6 className="fw-bold mt-2">Mô tả ngắn</h6>

                    <ul className='mt-3'>
                        <li style={{ marginBottom: '10px' }}> <b>Dưa Hấu Giống Mỹ</b> có vỏ màu xanh và sọc dưa đậm, ruột đỏ, hột đen. Quả có vỏ cứng, dày, ăn rất ngon, độ đường cao, hương vị thơm ngon, hấp dẫn.</li>
                        <li style={{ marginBottom: '10px' }}>Dưa Hấu Giống Mỹ có vỏ màu xanh và sọc dưa đậm, ruột đỏ, hột đen. Quả có vỏ cứng, dày, ăn rất ngon, độ đường cao, hương vị thơm ngon, hấp dẫn.</li>

                        <li>Có thể thưởng thức bằng cách ướp lạnh hoặc nước ép dưa hấu, sinh tố, kem, hoặc salad...</li>

                    </ul>
                    <hr />
                    <h6 className="fw-bold mt-2">Số lượng</h6>
                    <div className="btn-group mt-2" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-outline-primary btn-sm p-2 fw-bold">-</button>
                        <input className="form-control form-control-sm w-50" type="number" />
                        <button type="button" className="btn btn-outline-primary btn-sm p-2 fw-bold">+</button>


                    </div>

                    <div className='d-flex mt-5'>

                        <button className='btn btn-outline-dark text-danger '><i class="bi bi-heart-fill fs-3"></i></button>

                        <button className='btn btn-outline-dark text-danger ms-3'><i class="fa fa-cart-plus fs-3"></i></button>

                        <button className="gradient-button ms-4 fw-bold">
                            Thêm vào giỏ hàng
                        </button>
                    </div>





                </div>





            </div>

            <div className='row '>
                <div className='col-md-12 mx-auto bg-body-secondary text-center' style={{ minHeight: 45, borderRadius: 5 }}>
                    <h4 className='fw-bold mt-3'>Đánh giá sản phẩm</h4>
                </div>

                <div className="col-md-12 d-flex mt-3">

               <select className="form-select w-25 " aria-label="Default select example">
  <option selected>Open this select menu</option>
  <option value={1}>One</option>
  <option value={2}>Two</option> 
  <option value={3}>Three</option>
</select>





                </div>

                <div className="mb-1">

                    <div className="  p-3 mt-3">
                        <div className="d-flex align-items-center mb-1">
                            <div className="me-3">
                                <span className="badge bg-danger">T</span>
                            </div>
                            <div>
                                <strong>tú le</strong> <span className="text-muted">(13/05/2024)</span>
                            </div>
                        </div>
                        <p className="mb-0">tươi</p>
                    </div>

                    {/* Bình luận 2 */}
                    <div className=" border p-3 rounded">
                        <div className="d-flex align-items-center mb-1">
                            <div className="me-3">
                                <span className="badge bg-primary">L</span>
                            </div>
                            <div>
                                <strong>Lê th*****</strong> <span className="text-muted">(11/05/2024)</span>
                            </div>
                        </div>
                        <p className="mb-0">
                            LOTTE Mart chân thành cảm ơn Quý khách đã quan tâm, tin tưởng và sử dụng dịch vụ của LOTTE Mart. Rất mong nhận được sự ủng hộ của Quý khách trong thời gian tới a.
                        </p>

                    </div>
                </div>

                <div className="mb-1">

                    <div className="  p-3 mt-3">
                        <div className="d-flex align-items-center mb-1">
                            <div className="me-3">
                                <span className="badge bg-danger">T</span>
                            </div>
                            <div>
                                <strong>tú le</strong> <span className="text-muted">(13/05/2024)</span>
                            </div>
                        </div>
                        <p className="mb-0">tươi</p>
                    </div>

                    {/* Bình luận 2 */}
                    <div className=" border p-3 rounded">
                        <div className="d-flex align-items-center mb-1">
                            <div className="me-3">
                                <span className="badge bg-primary">L</span>
                            </div>
                            <div>
                                <strong>Lê th*****</strong> <span className="text-muted">(11/05/2024)</span>
                            </div>
                        </div>
                        <p className="mb-0">
                            LOTTE Mart chân thành cảm ơn Quý khách đã quan tâm, tin tưởng và sử dụng dịch vụ của LOTTE Mart. Rất mong nhận được sự ủng hộ của Quý khách trong thời gian tới a.
                        </p>

                    </div>
                </div>

                <div className="mb-1">

                    <div className="  p-3 mt-3">
                        <div className="d-flex align-items-center mb-1">
                            <div className="me-3">
                                <span className="badge bg-danger">T</span>
                            </div>
                            <div>
                                <strong>tú le</strong> <span className="text-muted">(13/05/2024)</span>
                            </div>
                        </div>
                        <p className="mb-0">tươi</p>
                    </div>

                    {/* Bình luận 2 */}
                    <div className=" border p-3 rounded">
                        <div className="d-flex align-items-center mb-1">
                            <div className="me-3">
                                <span className="badge bg-primary">L</span>
                            </div>
                            <div>
                                <strong>Lê th*****</strong> <span className="text-muted">(11/05/2024)</span>
                            </div>
                        </div>
                        <p className="mb-0">
                            LOTTE Mart chân thành cảm ơn Quý khách đã quan tâm, tin tưởng và sử dụng dịch vụ của LOTTE Mart. Rất mong nhận được sự ủng hộ của Quý khách trong thời gian tới a.
                        </p>

                    </div>
                </div>

                
            <hr className='mt-3 ' />
           

            </div>
            <div className="row">
            <div className="col-md-12">

<h4 className='mt-2 fw-bold'>Sản phẩm tương tự</h4>   



<SimilarProduct></SimilarProduct>



</div>
            </div>

        </div>
    )
}

export default ProductDetail