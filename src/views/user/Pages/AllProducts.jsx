import React, { useEffect, useState } from 'react'
import ListStoreNew from './ListStoreNew'
import Banner from './Banner'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ProductDanhmuc from './ProductDanhmuc'
import { isDisabled } from '@testing-library/user-event/dist/utils'
const AllProducts = () => {

    const params = useParams();
    const [Product, SetProduct] = useState([]);
    const API = async () => {

        try {
            const res = await axios({ url: `http://localhost:8080/${params.kind}`, method: 'GET' });
            SetProduct(res.data)
        } catch (error) {

        }
    }

    const handleChange = async (e) => {
        const value = e.target.value

        if (value == 'mostSelled') {
                const res = await axios({url:`http://localhost:8080/`,method:"GET"})
        }
        if (value == 'discount') {
            const res = await axios({url:`http://localhost:8080/`,method:"GET"})
        }

        if (value == 'short') {
            const res = await axios({url:`http://localhost:8080/`,method:"GET"})
        }
    }

    useEffect(() => {
        API()
    }, [params.kind])


    return (
        <div className='container-fluid'>
            <Banner></Banner>
            <div className="row mt-3">

                <div className="col-md-12">

                    <select className="form-select w-25 ms-4 mt-3" aria-label="Default select example" onChange={handleChange}>
                        <option selected>Tìm kiếm theo chủ đề</option>
                        <option value={'mostSelled'}>Bán nhiều nhất</option>
                        <option value={'discount'}>Giảm giá nhiều</option>

                        <option value={'short'}>Tên sản phẩm (A-Z)</option>
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