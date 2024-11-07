import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import ListProduct from './ListProduct';
const ListDanhHieu = () => {

  const [ThuongHieu,SetThuongHieu]= useState([]);
  const [SanPhamByThuongHieu,SetSanPhamByThuongHieu] = useState([]);
  const [ga,SetFirst] = useState("")
  const API_ThuongHieu =  async () =>{
    const res = await axios({url:"http://localhost:8080/ThuongHieu/FINDALL",method:'GET'})
    SetThuongHieu(res.data)
    const id = res.data[0].thuong_hieuID;
    
    const ressp = await axios({url:`http://localhost:8080/Product/findSanPhamByThuonghieuId?id=${id}`,method:"GET"})
    SetSanPhamByThuongHieu(ressp.data)
    SetFirst(res.data[0].thuong_hieuID);
   
 
  }

  useEffect(()=>{
    
    API_ThuongHieu()
  },[])
  return (
    <div className='row ' style={{
      display: 'flex',
      justifyContent: 'center',
    
     
    }}>

  
    {ThuongHieu.map((thuonghieu)=>{
      return <div  className="card mx-4 text-center "  onClick={async ()=>{
        const ressp = await axios({url:`http://localhost:8080/Product/findSanPhamByThuonghieuId?id=${thuonghieu.thuong_hieuID}`,method:"GET"})
        SetSanPhamByThuongHieu(ressp.data)
        SetFirst(thuonghieu.thuong_hieuID)
      }} key={thuonghieu.thuong_hieuID}   style={{
        width: '90px',
        height: '90px',
        borderRadius: '20px',
        margin: 30,
        border: ga === thuonghieu.thuong_hieuID ? '1px solid red' : 'none' // Điều kiện cho thuộc tính border
      }}  >
      <div className='mx-auto mt-3'> 
        <img src={`/images/${thuonghieu.hinh_anh}`}  className='img-fluid' alt="" />

      </div>  
    
    </div>
    })}
     


     <ListProduct products={SanPhamByThuongHieu} ></ListProduct> 

    </div>
  )
}

export default ListDanhHieu