import React, { useEffect, useState } from 'react'
import ListStoreNew from './ListStoreNew'
import Banner from './Banner'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ProductDanhmuc from './ProductDanhmuc'
const AllProducts = () => {

    const params = useParams();
    const [Product,SetProduct] = useState([]);
    const API = async()=>{
      
       try {
        const res = await axios({url:`http://localhost:8080/${params.kind}`,method:'GET'});
        SetProduct(res.data)
       } catch (error) {
        
       }
    }

    useEffect(()=>{
        API()
    },[params.kind])


    return (
        <div className='container-fluid'>
            <Banner></Banner>
            <div className="row mt-3">

                <div className="col-md-12">

                    <select className="form-select w-25 ms-4 mt-3" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value={1}>One</option>
                        <option value={2}>Two</option>
                        <option value={3}>Three</option>
                    </select>


                </div>
                <div className="col-md-12">

              <ProductDanhmuc Products={Product}></ProductDanhmuc>

                </div>

            </div>


        </div>
    )
}

export default AllProducts