import React from 'react'

function body() {
    return (
        <div className="container p-0">
            <div>
                <div className=" page-wrapper">
                    <div className="page-inner">
                        <div className="row">
                            <div className="el-wrapper">
                                <div className="box-up">
                                    <img className="img" src="images/meo2.jpg" alt />
                                    <div className="img-info">
                                        <div className="info-inner">
                                            <span className="p-name">I feel like Pablo</span>
                                            <span className="p-company">Yeezy</span>
                                        </div>
                                        {/* <div className="a-size">Available sizes : <span className="size">S , M , L , XL</span></div> */}
                                    </div>
                                </div>
                                <div className="box-down">
                                    <div className="h-bg">
                                        <div className="h-bg-inner" />
                                    </div>
                                    <a className="cart" href="#">
                                        <span className="price">$120</span>
                                        <span className="add-to-cart">
                                            <span className="txt">Add in cart</span>2
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
}

export default body