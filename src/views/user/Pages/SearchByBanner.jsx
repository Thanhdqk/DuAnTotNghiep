import React, { useEffect, useState } from 'react'
import ProductDanhmuc from './ProductDanhmuc'
import Banner from './Banner'
import CategoryNew from './CategoryNew'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const SearchByBanner = () => {
    const [Product,SetProdcuct] = useState([]);

    const params = useParams();

    const API =  async () =>{
       try {
        const ids =await axios({url:`http://localhost:8080/DanhMuc/FINDVIP/${params.id}`,method:'GET'})
       
        const Data = ids.data
        const res =await axios({url:`http://localhost:8080/Product/findAllBySan_phamIdIn`,params:  {
            ids: Data.join(",")  // Dữ liệu sẽ được nối lại thành chuỗi, ví dụ: "Category_1,Category_9"
          },method:'GET'})
        SetProdcuct(res.data);
       } catch (error) {
        
       }
    }

    useEffect(()=>{
      window.scrollTo(0, 0);
        API()
    },[params.id])
    return (
        <div className='container-fluid'>
        <Banner></Banner>
        
        <div className="row mt-3">
    
        
            <div className="col-md-12">
    
           <ProductDanhmuc Products={Product}></ProductDanhmuc>
    
            </div>
    
        </div>
    
    
    </div>
      )
}

export default SearchByBanner