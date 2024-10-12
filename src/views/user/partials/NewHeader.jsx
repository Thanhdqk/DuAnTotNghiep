import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const NewHeader = () => {
    const [showPopup, setShowPopup] = useState(false);
    

    // Xử lý khi click bên ngoài để đóng popup
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.search-container') || !event.target.closest('.popup')) {
                setShowPopup(false);
            }
        };

        const handleScroll = () => {
            setShowPopup(false);
        };

        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleInputClick = () => {
        setShowPopup(true);
    };

    return (
        <>
            <header className="bg-white border-bottom">
                <div className="container-fluid py-1">
                    <div className="row align-items-center">
                        {/* Logo và Dropdown */}
                        <div className="col-3 col-md-3 d-flex align-items-center mt-2">
                            <img src="https://via.placeholder.com/100x40?text=LOTTE+MART" alt="Lotte Mart Logo" className="me-3 img-fluid" />
                        </div>

                        {/* Tìm kiếm */}
                        <div className="col-4 col-md-6 mt-2 mt-md-0 d-flex justify-content-center mt-2">
                            <input type="text" className="form-control me-2" placeholder="Tìm kiếm" onClick={handleInputClick} />
                            <button className="btn btn-outline-secondary" type="submit">
                                <i className="bi bi-search"></i>
                            </button>
                        </div>

                        {/* Icon giỏ hàng và thông báo */}
                        <div className="col-5 col-md-3 d-flex justify-content-end align-items-center mt-2">
                            <NavLink className="nav-link active position-relative me-4" to={''}>
                                <i className='fa fa-cart-plus fs-5 mt-1'></i>
                                <span className="position-absolute top-3 start-100 translate-middle badge rounded-pill bg-danger"
                                      style={{ fontSize: '0.6em', padding: '0.2em 0.4em', minWidth: '1.5em', height: '1.5em' }}>
                                    10
                                </span>
                            </NavLink>
                            <NavLink className="me-4 d-flex align-items-center" to="#">
                                <i className="bi bi-person-circle text-dark fs-4"></i>
                            </NavLink>
                            <NavLink className="me-4 d-flex align-items-center" to="#">
                                <i className="fa fa-bell fs-4 text-dark"></i>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </header>

            <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-nav">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/" activeClassName="active">
                                    Danh Mục
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/search" activeClassName="active">
                                   Tìm kiếm
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/uu-dai-hot" activeClassName="active">
                                    Ưu Đãi Hot
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/khuyen-mai" activeClassName="active">
                                    Khuyến Mãi
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/ban-chay" activeClassName="active">
                                    Bán Chạy
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/hang-moi" activeClassName="active">
                                    Hàng Mới
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/su-kien-noi-bat" activeClassName="active">
                                    Sự Kiện Nổi Bật
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/dat-hang-nhanh" activeClassName="active">
                                    Đặt Hàng Nhanh
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                {showPopup && (
                    <div className="popup row" style={{
                        position: 'absolute',
                        top: '20%',
                        left: '30%',
                        zIndex: 5,
                        borderRadius: '20px',
                        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.5)',
                        backgroundColor: 'white',
                        width: '600px',
                        padding: '20px',
                    }}>
                        <div className="popup-content">
                            <div className="history row mx-auto">
                                <div className="col-md-6 " style={{borderRight:'1px solid black'}}>
                                    <h5 style={{fontWeight:'bold', marginBottom: '1rem', color: '#333' }}>Lịch sử</h5>
                                    <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                                        <li style={{ marginBottom: '0.5rem', color: '#555' }}>Gà</li>
                                    </ul>
                                </div>
                                <div className="col-md-6">
                                    <div className="keywords ms-1">
                                        <h5 style={{fontWeight:'bold', marginBottom: '1rem', color: '#333' }}>Từ khóa phổ biến</h5>
                                        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                                            <li style={{ marginBottom: '0.5rem', color: '#555' }}>Gà</li>
                                            <li style={{ marginBottom: '0.5rem', color: '#555' }}>Gà</li>
                                            <li style={{ marginBottom: '0.5rem', color: '#555' }}>Gà</li>
                                            <li style={{ marginBottom: '0.5rem', color: '#555' }}>Gà</li>
                                            <li style={{ marginBottom: '0.5rem', color: '#555' }}>Gà</li>
                                            <li style={{ marginBottom: '0.5rem', color: '#555' }}>Gà</li>
                                            <li style={{ marginBottom: '0.5rem', color: '#555' }}>Gà</li>
                                            <li style={{ marginBottom: '0.5rem', color: '#555' }}>Gà</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};

export default NewHeader;
