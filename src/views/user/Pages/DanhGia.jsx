import { Button } from 'antd'
import React, { useState } from 'react'

const DanhGia = ({DanhGias}) => {
    const [quantityDanhGia,SetquantityDanhGia] = useState(3);
  return (
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

   

        {DanhGias.slice(0,quantityDanhGia).map((danhgia)=>{
           
           return    <div className="mb-1"> 
            <div className="  p-3 mt-3" key={danhgia.danh_giaID}>
                        <div className="d-flex align-items-center mb-1">
                            <div className="me-3">
                                <span className="badge bg-danger">T</span>
                            </div>
                            <div>
                                <strong>{danhgia.users.hovaten}</strong> <span className="text-muted">({danhgia.ngay_tao})</span> <span className="ms-3">{danhgia.so_sao}   <i className="bi bi-star-fill text-warning"></i></span> 
                            </div>
                        </div>
                        <p className="mb-0">{danhgia.noi_dung} </p>
                    </div>
             {danhgia.phanhoidanhgia?.map((ph)=>{
                return <div className=" border p-3 rounded mt-3 mb-2" key={ph.phan_hoiID} >
                <div className="d-flex align-items-center mb-1">
                    <div className="me-3">
                        <span className="badge bg-primary">L</span>
                    </div>
                    <div>
                        <strong>{ph.users.hovaten}</strong> <span className="text-muted">({ph.ngay_tao})</span> 
                    </div>
                </div>
                <p className="mb-0">
                {ph.noi_dung} 
                </p>
    
            </div>
             }) } 
             
        </div>
        })}

       <div className="row">

        <div className="col-md-12 text-center">

        {DanhGias.length >0 ? <button className='gradient-button-2' onClick={()=>{
            SetquantityDanhGia(quantityDanhGia+3);
        }}>Xem thêm</button> : <h3 className='my-3 fw-bold'>Không có Đánh giá nào </h3>  }
       
        </div>

       </div>

        
        
    

    

    

        


    <hr className='mt-3 ' />


</div>
  )
}

export default DanhGia