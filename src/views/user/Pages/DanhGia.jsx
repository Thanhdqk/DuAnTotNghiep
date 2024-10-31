import { Button } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const DanhGia = ({ DanhGias,id }) => {
    const [quantityDanhGia, SetquantityDanhGia] = useState(3);
    const [DanhGia, SetDanhGia] = useState(DanhGias);
    const HandleChangeSAO = async(e) =>{
        const value = e.target.value;
        const res = await axios({url:`http://localhost:8080/FindDangGiaByIdSanPhamWithSoSao?id=${id}&sosao=${value}`,method:"GET"})
        console.log('sc',res.data)
        SetDanhGia(res.data)
    }
    const HandleChangeDAY = async(e) =>{
        const value = e.target.value;
       
        if(value == "new")
        {
            const res = await axios({url:`http://localhost:8080/FindDangGiaByIdSanPhamWithDay?id=${id}`,method:"GET"})
            console.log(res.data)
            SetDanhGia(res.data)
        }
        else{
            SetDanhGia(DanhGias);
        }
            
        
        
        
    }

    useEffect(() => {
        SetDanhGia(DanhGias);

    }, [DanhGias]);

   

  

   
    return (
        <div className='row '>
            <div className='col-md-12 mx-auto bg-body-secondary text-center' style={{ minHeight: 45, borderRadius: 5 }}>
                <h4 className='fw-bold mt-3'>Đánh giá sản phẩm</h4>
            </div>

            <div className="col-md-12 d-flex mt-3">

                {/* <select className="form-select w-25  " onChange={HandleChangeDAY} >
                    <option value="" disabled selected>Lọc theo ngày</option>
                    <option value={'new'}>Đánh giá mới nhất</option>
                    <option value={'new'}>Đánh giá mới nhất</option>

                </select> */}


                <select className="form-select w-25 " onChange={HandleChangeSAO}>
                <option value="" disabled selected>Lọc theo số sao</option>
  <option value="1">⭐ 1 sao</option>
  <option value="2">⭐⭐ 2 sao</option>
  <option value="3">⭐⭐⭐ 3 sao</option>
  <option value="4">⭐⭐⭐⭐ 4 sao</option>
  <option value="5">⭐⭐⭐⭐⭐ 5 sao</option>
</select>







            </div>



            {DanhGia.slice(0, quantityDanhGia).map((danhgia) => {

                return <div className="mb-1" key={danhgia.danh_giaID}>
                    <div className="  p-3 mt-3" >
                        <div className="d-flex align-items-center mb-1">
                            <div className="me-3">
                                <span className="badge bg-danger">T</span>
                            </div>
                            <div>
                                <strong>{danhgia.users.hovaten}</strong> <span className="text-muted">({danhgia.ngay_tao})</span> <span className="ms-3">{danhgia.so_sao}   <i className="bi bi-star-fill text-warning"></i></span>
                            </div>
                        </div>
                        <p className="mb-0">{danhgia.noi_dung} </p>
                        {danhgia?.hinh_anh !="" ? <img className='img-fluid' style={{minWidth:'100px',height:'150px'}} src={`/images/${danhgia.hinh_anh}`} alt="" /> :<p> </p>}
                        
                    </div>
                    {danhgia.phanhoidanhgia?.map((ph) => {
                        return <div className=" border p-3 rounded mt-2 mb-2" key={ph.phan_hoiID} >
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
                    })}

                </div>
            })}

            <div className="row">

                <div className="col-md-12 text-center">

                    {DanhGia.length > 0 ? <button className='gradient-button-2' onClick={() => {
                        SetquantityDanhGia(quantityDanhGia + 3);
                    }}>Xem thêm</button> : <h3 className='my-3 fw-bold'>Không có Đánh giá nào </h3>}

                </div>

            </div>












            <hr className='mt-3 ' />


        </div>
    )
}

export default DanhGia