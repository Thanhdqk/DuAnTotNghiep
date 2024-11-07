import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API_FindALL_Category } from '../Reducer/categotyReducer';
import { NavLink } from 'react-router-dom';

const CategoryNew = ({ids}) => {

  const ListCategory = useSelector(state => state.category.ListCategory);

  const Dispatch = useDispatch();


  const DispatchAPI = async () =>{

    const api = API_FindALL_Category();
    Dispatch(api);

  }

  useEffect(()=>{
    DispatchAPI();
  },[])

  return (
    <div className='row' style={{
        display: 'flex',
        justifyContent: 'center',
      
       
      }}>
        {ListCategory.map((object,index)=>{
          return <NavLink to={`/product/danhmuc/${object.danh_mucId}`} className="card mx-4 text-center" key={object.danh_mucId} style={object.danh_mucId == ids ?{ width: '90px', height: '90px', borderRadius: '20px',margin:25,border:'1px solid red'  } : { width: '90px', height: '90px', borderRadius: '20px',margin:25,  }} >
          <div className='cycleBlueLight mx-auto mt-3'>
            <img src={`/images/${object.hinh_anh}`}  className='img-fluid' alt="" />

          </div>  
        
        </NavLink>
        })}

       

       

        

        

       
       

       

        


      </div>
  )
}

export default CategoryNew