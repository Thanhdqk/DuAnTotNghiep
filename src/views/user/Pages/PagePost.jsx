import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetALLPost } from '../Reducer/postReducer';
import { NavLink } from 'react-router-dom';

const PagePost = () => {
  const dispatch = useDispatch();
    const listPOST = useSelector(state => state.post.listPost);
    const List2POST = async()=>{
        const res = await axios({url:'http://localhost:8080/FindAllBaiDang',method:'GET'})
        const api = GetALLPost(res.data);
        dispatch(api);
      }

      useEffect(()=>{

        List2POST()


      },[])
  return (
    <div className='container'>

      <div className="row mt-3 mb-4">
      
      </div>

{listPOST?.map((post,index)=>{
        return <NavLink to={`/bai-dang/detail/${post.bai_dangID}`} style={{textDecoration:'none'}} className="row mt-5" key={index}>

        <div className="col-md-6 d-flex justify-content-center">

            <img src={`/images/${post.hinh_anh}`} className='img-fluid' style={{borderRadius:'10px'}} alt="" />

        </div>

        <div className="col-md-6">

            <h4 className='ms-2 fw-bold text-dark'>{post.tieu_de}</h4>

            <p className='text-muted ms-2 fw-bold'>{post.tieu_de_phu}</p>
            
        </div>

    </NavLink>
    })}

    </div>
  )
}

export default PagePost