import React from 'react'
import { NavLink } from 'react-router-dom';

function Quanlyyeucau() {
    return (
        <div className='container mb-2'>
            <div className='h2'>Quản lý yêu cầu</div>
            <div className='row  row-cols-2'>
                <div className='col '>
                    <div className='d-flex justify-content-center'>
                        <div className="flip-card">
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <p className="title">Sản phẩm</p>

                                </div>
                                <div className="flip-card-back">
                                    <NavLink className="nav-link active position-relative me-4" to={'tableyeucau'}>
                                        <p className="title">Xem chi tiết</p>
                                    </NavLink>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className='d-flex justify-content-center'>
                        <div className="flip-card">
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <p className="title">Danh mục</p>

                                </div>
                                <div className="flip-card-back">
                                    <NavLink className="nav-link active position-relative me-4" to={'tableyeucau'}>
                                        <p className="title">Xem chi tiết</p>
                                    </NavLink>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col mt-3 '>
                    <div className='d-flex justify-content-center'>
                        <div className="flip-card">
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <p className="title">Thương hiệu</p>

                                </div>
                                <div className="flip-card-back">
                                    <NavLink className="nav-link active position-relative me-4" to={'tableyeucau'}>
                                        <p className="title">Xem chi tiết</p>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='col mt-3 '>
                    <div className='d-flex justify-content-center'>
                        <div className="flip-card">
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <p className="title">Banner</p>

                                </div>
                                <div className="flip-card-back">
                                    <NavLink className="nav-link active position-relative me-4" to={'tableyeucau'}>
                                        <p className="title">Xem chi tiết</p>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='col mt-3 '>
                    <div className='d-flex justify-content-center'>
                        <div className="flip-card">
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <p className="title">Popup</p>

                                </div>
                                <div className="flip-card-back">
                                    <NavLink className="nav-link active position-relative me-4" to={'tableyeucau'}>
                                        <p className="title">Xem chi tiết</p>
                                    </NavLink>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='col mt-3'>
                    <div className='d-flex justify-content-center'>
                        <div className="flip-card">
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <p className="title">Bài đăng</p>

                                </div>
                                <div className="flip-card-back">
                                    <NavLink className="nav-link active position-relative me-4" to={'tableyeucau'}>
                                        <p className="title">Xem chi tiết</p>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Quanlyyeucau