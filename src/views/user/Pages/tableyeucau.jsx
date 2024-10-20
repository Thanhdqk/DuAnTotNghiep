import React, { useEffect } from 'react'
import Popup from '../../admin/Pages/Popup';

function Tableyeucau() {

    return (
        <div className='container'>
            <div className='h1'>Quản lý yêu cầu</div>
            <div className=''>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Mã đơn hàng</th>
                            <th scope="col">Món ăn</th>
                            <th scope="col">Ngày tạo</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Địa chỉ </th>
                            <th scope="col">Trạng thái  </th>
                            <th scope="col">Hành động </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <div className='d-flex justify-content-around'>
                                    <div>
                                        <button className='btn btn-secondary btndeny ' data-bs-toggle="modal" data-bs-target="#exampleModal" >Từ chối</button>
                                    </div>
                                    <div>
                                        <button className='btn btn-secondary btnaccept' data-bs-toggle="modal" data-bs-target="#exampleModal2">Chấp nhận</button>
                                    </div>
                                </div>

                                <div>
                                    <div className="modal fade" id="exampleModal">
                                        <div className="modal-dialog modal-dialog-centered" >
                                            <div className="modal-content">
                                                <div className="modal-header" style={{ borderBottom: 'none' }}>
                                                   <div className='h2'>Lý do từ chối </div>
                                                </div>
                                                <div className="modal-body">
                                                    <textarea class="form-control" id="message-text"></textarea>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                       
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="modal fade" id="exampleModal2" tabIndex={-1} >
                                        <div className="modal-dialog modal-dialog-centered" >
                                            <div className="modal-content">
                                                <div className="modal-header" style={{ borderBottom: 'none' }}>
                                                   <div className='h2'>Chấp nhận yêu cầu này ?</div>
                                                </div>
                                                <div className="modal-body">
                                                    <textarea class="form-control" id="message-text"></textarea>
                                                    </div>
                                                    <div className="modal-footer text-center    ">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                       
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Tableyeucau