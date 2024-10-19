import React from 'react'

function Hotrophanhoi() {
    return (
        <div className='container'>
        <div className='h1'>Hỗ trợ phản hồi </div>
            <div className=''>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Mã Feedback</th>
                            <th scope="col">Loại yêu cầu</th>
                            <th scope="col">Nội dung</th>
                            <th scope="col">Hình ảnh</th>
                            <th scope="col">Account ID</th>
                            <th scope="col">Acction</th>
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
                            <td><button className='btn btn-secondary'>Trả lời</button></td>
                        </tr>
                       
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Hotrophanhoi