import React, { useEffect, useState } from 'react'
import ProductDanhmuc from './ProductDanhmuc'
import Banner from './Banner'
import CategoryNew from './CategoryNew'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const SearchByDanhmuc = () => {

    const [Product,SetProdcuct] = useState([]);

    const params = useParams();

    const API =  async () =>{
       try {
        const res =await axios({url:`http://localhost:8080/Product/FindByCategory?id=${params.id}`,method:'GET'})
        SetProdcuct(res.data);
       } catch (error) {
        
       }
    }

    useEffect(()=>{
        API()
    },[params.id])

  return (
    <div className='container-fluid'>
    <Banner></Banner>
    <CategoryNew></CategoryNew>
    <div className="row mt-3">

    
        <div className="col-md-12">

       <ProductDanhmuc Products={Product}></ProductDanhmuc>

        </div>

    </div>


</div>
  )
}

export default SearchByDanhmuc