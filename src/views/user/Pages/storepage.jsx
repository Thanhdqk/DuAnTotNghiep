import React from "react";
import Shopbody from "./shopbody";
import { Rate } from 'antd';
import { Input } from 'antd';

const Storepage = () => {

    return (
        <div className="container">
            <div className='row'>
                <div className='col-12 firstpart-header'><div className='row  rounded position-relative' style={{ "backgroundImage": "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.6) 100%), url(img/mcdonaldbanner.jpg)", backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', minHeight: '300px', maxHeight: '500px' }}>
                    <div className='col-6'>
                        <div className='row h-100 align-items-end' >
                            <div className='col ' style={{ marginBottom: '5%', marginLeft: '2%' }}>
                                <h1 className=' h2  text-light'>Gà rán - Burger, Cơm, Món Quốc Tế</h1>
                                <h1 className='h3 text-light'>McDonald quận 7</h1>
                                <div className='d-flex '>
                                    <p className=' text-light border border-1 rounded me-2 p-1'>Giờ mở cửa 07:00-23:50</p>
                                    <p className=' text-light border border-1 rounded p-1'>  Vận chuyển trong 25-30 phút</p>

                                </div>
                                <div className='bg-warning position-absolute top-0 start-0 rounded text-center h5' style={{ width: '20%', height: '8%' }}> Mở cửa đến 23:50</div>
                            </div>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='row h-100'>
                            <div className='col col-sm-12 col-md-6'>
                                <div className='row align-items-end h-100' >
                                    <div className='col p-1 text-center' style={{ marginBottom: '5%', width: '50%' }}>
                                        <div className='d-block bg-light border rounded ms-5 ' style={{ width: '70%', height: '80%', marginBottom: '10%' }}>
                                            <h1 className='' style={{}}>5.0 </h1>
                                            <Rate disabled defaultValue={5} />
                                            <h1 className='h5'>300 reviews</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col d-none d-md-block  p-2'> <img className='img-fluid  rounded  ' src='img/ho.jpg' ></img> </div>
                        </div>
                    </div>

                </div>
                </div>
                <div className='col-12 '>  <div className='col-12 '>
                    <div className=" p-0 rounded   " style={{ minHeight: '68px', height: '68px', maxHeight: '120px', width: '100%' }}>
                        <div>
                            <nav id="navbar-example2" className="navbar bg-body-tertiary     select-tabs">

                                <ul className="nav nav-pills" style={{ height: '100%', width: '100%' }} >
                                    <div className="d-flex align-items-center justify-content-around  " style={{ height: '100%', width: '100%' }}>

                                        <li className="nav-item">
                                            <a className="btn btn-lg" type='button' href="#scrollspyHeading1">First</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="btn btn-lg" type='button' href="#scrollspyHeading2">Second</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="btn btn-lg" type='button' href="#scrollspyHeading3">Third</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="btn btn-lg" type='button' href="#scrollspyHeading4">Second</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="btn btn-lg" type='button' href="#scrollspyHeading5">Second</a>
                                        </li>
                                    </div>

                                </ul>
                            </nav>

                        </div>

                    </div>
                </div>
                </div>

            </div>
            <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" className="container scrollspy-example bg-body-tertiary p-3 rounded-2" tabIndex={0}>
                <div className='mt-3 d-flex flex-row-reverse'>
                    <Input style={{ width: '40%' }} placeholder="Tìm kiếm trong thực đơn" />
                </div>
                <h1 id="scrollspyHeading1">Seasonal</h1>
                <div className="row row-cols-3">

                    <div className="col">  <Shopbody /></div>
                    <div className="col">  <Shopbody /></div>
                    <div className="col">  <Shopbody /></div>
                    <div className="col">  <Shopbody /></div>
                    <div className="col">  <Shopbody /></div>
                    <div className="col">  <Shopbody /></div>

                </div>
                <h1 id="scrollspyHeading2">Seasonal</h1>
                <div className="row row-cols-3">
                    <div className="col">  <Shopbody /></div>
                    <div className="col">  <Shopbody /></div>

                </div>
                <h1 id="scrollspyHeading3">Seasonal</h1>
                <div className="row row-cols-3">
                    <div className="col">  <Shopbody /></div>
                    <div className="col">  <Shopbody /></div>

                </div>


            </div>
        </div>

    )
}
export default Storepage