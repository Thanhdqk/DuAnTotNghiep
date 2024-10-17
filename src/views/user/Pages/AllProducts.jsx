import React from 'react'
import ListStoreNew from './ListStoreNew'
import Banner from './Banner'
const AllProducts = () => {
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

                <ListStoreNew></ListStoreNew>

                </div>

            </div>


        </div>
    )
}

export default AllProducts