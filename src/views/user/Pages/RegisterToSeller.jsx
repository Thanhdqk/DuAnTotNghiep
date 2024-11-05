import React from 'react'

const RegisterToSeller = () => {
    return (
        <div className='container-fluid'>

            <div className='row bg-green' style={{ minHeight: 200 }}>

                <div className="col-md-12 text-center">
                    <h5 className='text-light fw-bold  mt-4'>Dễ dàng đăng ký và theo dõi tình trạng hồ sơ chỉ trong 3 ngày. Tải về ngay trên Google Play và App store</h5>
                    <p className=' mt-1 text-dark '>Áp dụng cho Đối tác ở Thành phố Hồ Chí Minh, Hà Nội và một số thành phố khác*</p>

                    <button className='btn btn-warning mt-2 fw-bold text-light'>Tải về và đăng kí ngay</button>

                    <p className=' mt-2 text-dark '>* Bắc Giang, Bắc Ninh, Bến Tre, Cà Mau, Kiên Giang, Long An, Nghệ An, Quảng Bình, Thái Nguyên, Tiền Giang.</p>
                </div>

            </div>

            <div className='row' style={{
                backgroundImage: `url('/images/bg-register.jpg')`,
                minHeight: '100vh', // Đổi từ height sang minHeight
                backgroundSize: 'cover', // Cho phép background mở rộng theo card
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start', // Căn top cho card
                padding: '20px' // Thêm padding để tránh card sát với viền màn hình
            }}>
                <div className='col-md-12'>
                    <div className="card w-50 mt-5" style={{ marginLeft: 'auto' }}> {/* Thêm marginLeft: auto */}
                        <div className="card-body row">
                            <h5 className="card-title text-green fw-bold">Trở thành Nhà hàng Đối tác cùng GrabFood</h5>
                            <form action="" className='row'>
                                <div className="col-md-12">
                                    <input type="text" className='form-control mt-3' placeholder='Tên nhà hàng / quán ăn' />
                                </div>
                                <div className="col-md-6 mt-4">
                                    <input type="text" className='form-control w-100' placeholder='Người đại diện' />
                                </div>
                                <div className="col-md-6 mt-4">
                                    <select className="form-select">
                                        <option selected>Thành phố</option>
                                        <option value={1}>One</option>
                                        <option value={2}>Two</option>
                                        <option value={3}>Three</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mt-4">
                                    <select className="form-select">
                                        <option selected>Quận</option>
                                        <option value={1}>One</option>
                                        <option value={2}>Two</option>
                                        <option value={3}>Three</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mt-4">
                                    <input type="text" className='form-control w-100' placeholder='Số lượng chi nhánh' />
                                </div>
                                <div className="col-md-6 mt-4">
                                    <select className="form-select">
                                        <option selected>Số lượng đơn hàng</option>
                                        <option value={1}>One</option>
                                        <option value={2}>Two</option>
                                        <option value={3}>Three</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mt-4">
                                    <select className="form-select">
                                        <option selected>Món chính</option>
                                        <option value={1}>One</option>
                                        <option value={2}>Two</option>
                                        <option value={3}>Three</option>
                                    </select>
                                </div>
                                <div className="col-md-12 mt-3">
                                    <input type="text" className='form-control' placeholder='Địa chỉ kinh doanh' />
                                </div>
                                <div className="col-md-6 mt-3">
                                    <input type="text" className='form-control' placeholder='Số điện thoại' />
                                </div>
                                <div className="col-md-6 mt-3">
                                    <input type="text" className='form-control' placeholder='Email' />
                                </div>
                                <div className="col-md-12 mt-4">
                                    <select className="form-select">
                                        <option selected>Loại hình kinh doanh</option>
                                        <option value={1}>One</option>
                                        <option value={2}>Two</option>
                                        <option value={3}>Three</option>
                                    </select>
                                </div>
                                <div className="col-md-12">
                                    <button className='btn bg-green w-100 mt-4 fw-bold text-light'>SUBMIT</button>
                                    <p className='text-center mt-2' style={{ fontSize: 12 }}>Bằng cách gửi biểu mẫu này, tôi đồng ý với các điều khoản và điều kiện của <span className='text-primary'>Grab</span></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


            <div className='row mb-5' style={{ minHeight: 200 }}>

                <div className="col-md-12 text-center">
                    <h2 className='text-green mt-5'>PHÁT TRIỂN KINH DOANH CÙNG GRABFOOD</h2>

                    <p className='mt-3 mx-5'>Lưu ý, Grab sẽ thu (i) Gói Thương Nhân Mới là 1.2 triệu đồng, đã bao gồm thuế GTGT đối với mỗi Thương Nhân GrabFood tại khu vực TP. Hồ Chí Minh và TP. Hà Nội đăng ký mới, kể từ ngày 01/09/2023 (gọi tắt là “Gói Thương Nhân Mới”) và (ii) phí hoa hồng trên doanh số bán ra của Thương Nhân theo tỷ lệ quy định tại hợp đồng dịch vụ thương mại điện tử giữa Grab và Thương Nhân (gọi tắt là “Phí Dịch Vụ”).</p>



                </div>

                <div className='col-md-4'>

                    <div className="card">
                    <img src="/images/bg-register2.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title text-green"> Tiết kiệm chi chí nhân sự</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                           
                        </div>
                    </div>


                </div>
                <div className='col-md-4'>

                    <div className="card">
                    <img src="/images/bg-register2.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title text-green"> Dễ dàng quản lí</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                           
                        </div>
                    </div>


                </div>

                <div className='col-md-4'>

                    <div className="card">
                   <img src="/images/bg-register2.jpg" className="card-img-top" alt="..." />

                            <div className="card-body">
                                <h5 className="card-title text-green"> Công nghệ tân tiến</h5>
                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                               
                            </div>
                    </div>


                </div>



            </div>

        </div>
    )
}

export default RegisterToSeller