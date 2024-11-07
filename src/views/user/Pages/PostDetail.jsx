import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const PostDetail = () => {
  const params = useParams();
  const [data,SetData] = useState({})
  const api = async()   =>{
    const res = await axios({url:`http://localhost:8080/FindPostByid?id=${params.id}`,method:'GET'})
    SetData(res.data)
  }
  useEffect(()=>{
    api()
    console.log('cc',params.id)
  },[])
  return (
    <div className='container'>

      <div className="col-md-12 my-2 text-center"  style={{borderRadius:'10px',backgroundColor: "rgba(0, 0, 0, 0.7)",width:'100%',height:'50px'}}>

      <h3 className='pt-2 fw-bold text-light'>{data.tieu_de}</h3>


      </div>

      <div className="row mt-5">

      <div className="col-md-6">
      <p className='text-muted ms-2 fw-bold'>{data.noi_dung}</p>
      </div>

      <div className="col-md-6 d-flex justify-content-center">

      <img src={`/images/${data.hinh_anh}`} className='img-fluid' style={{borderRadius:'10px'}} alt="" />

        </div>

      </div>

    </div>
  )
}

export default PostDetail