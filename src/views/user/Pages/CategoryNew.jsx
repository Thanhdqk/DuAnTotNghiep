import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API_FindALL_Category } from '../Reducer/categotyReducer';

const CategoryNew = () => {

  const ListCategory = useSelector(state => state.category.ListCategory);

  const Dispatch = useDispatch();


  const DispatchAPI = async () =>{

    const api = API_FindALL_Category();
    Dispatch(api);

  }

  useEffect(()=>{
    DispatchAPI();
  })

  return (
    <div className='row' style={{
        display: 'flex',
        justifyContent: 'center',
      
       
      }}>
        {ListCategory.map((object,index)=>{
          return <div className="card mx-4 text-center" key={object.id} style={{ width: '90px', height: '90px', borderRadius: '20px',margin:25}} >
          <div className='cycleBlueLight mx-auto mt-3'>
            <img src={`/images/${object.image}`}  className='img-fluid' alt="" />

          </div>  
        
        </div>
        })}

       

       

        

        

       
       

       

        


      </div>
  )
}

export default CategoryNew