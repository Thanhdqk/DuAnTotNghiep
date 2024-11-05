import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const NewHeader = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        setIsLoggedIn(!!storedUserId);
        setUserId(storedUserId);
    }, []);

    const handleInputClick = () => {
        setShowPopup(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <>
            <header className="bg-white border-bottom">
                <div className="container-fluid py-1">
                    <div className="row align-items-center">
                        <div className="col-3 col-md-3 d-flex align-items-center mt-2">
                            <img src="https://via.placeholder.com/100x40?text=LOTTE+MART" alt="Lotte Mart Logo" className="me-3 img-fluid" />
                        </div>

                        <div className="col-4 col-md-6 mt-2 mt-md-0 d-flex justify-content-center">
                            <input type="text" className="form-control me-2" placeholder="Tìm kiếm" onClick={handleInputClick} />
                            <button className="btn btn-outline-secondary" type="submit">
                                <i className="bi bi-search"></i>
                            </button>
                        </div>

                        <div className="col-5 col-md-3 d-flex justify-content-end align-items-center">
                            <NavLink className="nav-link position-relative me-4" to="#">
                                <i className='fa fa-cart-plus fs-5 mt-1'></i>
                                <span className="position-absolute top-3 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6em', padding: '0.2em 0.4em' }}>
                                    10
                                </span>
                            </NavLink>

                            {isLoggedIn ? (
                                <div className="dropdown me-4">
                                    <button
                                        className="btn btn-link dropdown-toggle d-flex align-items-center no-caret"
                                        type="button"
                                        id="userMenuDropdown"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >

                                        <span className="ms-2" style={{ textDecoration: 'none' }}><i className="bi bi-person-circle text-dark fs-4"></i></span>
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="userMenuDropdown">
                                        <li>
                                            <NavLink className="dropdown-item" to={`/thông-tin-cá-nhân?userId=${userId}`}>
                                                Quản lý cá nhân
                                            </NavLink>
                                        </li>
                                        <li>
                                            <button className="dropdown-item" onClick={handleLogout}>
                                                Đăng xuất
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <div className="dropdown me-4">
                                    <button
                                        className="btn btn-link dropdown-toggle d-flex align-items-center no-caret"
                                        type="button"
                                        id="userMenuDropdown"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >

                                        <span className="ms-2" style={{ textDecoration: 'none' }}><i className="bi bi-person-circle text-dark fs-4"></i></span>
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="userMenuDropdown">
                                        <li>
                                            <NavLink className="dropdown-item" to="/login">
                                                Đăng nhập
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink className="dropdown-item" to="/sign">
                                                Đăng ký
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            )}

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
                            <li className="nav-item dropdown">
                                <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Danh Mục
                                </NavLink>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><NavLink className="dropdown-item" to="/category1">Danh mục 1</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/category2">Danh mục 2</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/category3">Danh mục 3</NavLink></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/search" activeClassName="active">Tìm kiếm</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/uu-dai-hot" activeClassName="active">Ưu Đãi Hot</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/khuyen-mai" activeClassName="active">Khuyến Mãi</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/ban-chay" activeClassName="active">Bán Chạy</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/hang-moi" activeClassName="active">Hàng Mới</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/su-kien-noi-bat" activeClassName="active">Sự Kiện Nổi Bật</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/dat-hang-nhanh" activeClassName="active">Đặt Hàng Nhanh</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Popup tìm kiếm */}
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
                                <div className="col-md-6" style={{ borderRight: '1px solid black' }}>
                                    <h5 style={{ fontWeight: 'bold', marginBottom: '1rem', color: '#333' }}>Lịch sử</h5>
                                    <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                                        <li style={{ marginBottom: '0.5rem', color: '#555' }}>Gà</li>
                                    </ul>
                                </div>
                                <div className="col-md-6">
                                    <h5 style={{ fontWeight: 'bold', marginBottom: '1rem', color: '#333' }}>Từ khóa phổ biến</h5>
                                    <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                                        <li style={{ marginBottom: '0.5rem', color: '#555' }}>Gà</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* CSS to hide the caret */}
            <style>{`
                .no-caret::after {
                    display: none !important;
                }
            `}</style>
        </>
    );
};

export default NewHeader;
