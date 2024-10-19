import React from 'react'

function Quanlydonhang() {
    return (
        <div className='container'>
            <div className='h1'>Quản lý đơn hàng </div>
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
                                        <button className='btn btn-secondary'><i class="bi bi-eye"></i></button>
                                    </div>
                                    <div>
                                        <button className='btn btn-secondary'>Cập nhật</button>
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

export default Quanlydonhang