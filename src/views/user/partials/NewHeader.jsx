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
                <div className="container-fluid py-2">
                    <div className="row align-items-center">
                        {/* Logo Section */}
                        <div className="col-3 d-flex align-items-center">
                            <img
                                src="/images/logosnackshoponline.jpg"
                                alt="Snack Shop Logo"
                                className="me-3 img-fluid"
                                style={{ width: '165px', height: 'auto' }}
                            />
                        </div>

                        {/* Search Bar Section */}
                        <div className="col-6 d-flex justify-content-center">
                            <div className="input-group" style={{ maxWidth: '450px', width: '100%' }}>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Tìm kiếm"
                                    onClick={handleInputClick}
                                />
                                <button className="btn btn-outline-secondary" type="submit">
                                    <i className="bi bi-search"></i>
                                </button>
                            </div>
                        </div>

                        {/* User & Cart Section */}
                        <div className="col-3 d-flex justify-content-end align-items-center gap-3">
                            {/* Cart Icon */}
                            <NavLink className="nav-link position-relative" to="/cart">
                                <i className="fa fa-cart-plus fs-5"></i>
                                <span
                                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                    style={{ fontSize: '0.75rem', padding: '0.25em 0.4em' }}
                                >
                                    10
                                </span>
                            </NavLink>

                            {/* User Dropdown */}
                            <div className="dropdown d-flex align-items-center justify-content-center mb-2">
                                <button
                                    className="btn btn-link dropdown-toggle no-caret p-0"
                                    id="userMenuDropdown"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={{
                                        lineHeight: '1',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <i className="bi bi-person-circle text-dark fs-4"></i>
                                </button>
                                <ul
                                    className="dropdown-menu dropdown-menu-end"
                                    aria-labelledby="userMenuDropdown"
                                    style={{ minWidth: '150px' }}
                                >
                                    {isLoggedIn ? (
                                        <>
                                            <li>
                                                <NavLink
                                                    className="dropdown-item"
                                                    to={`/personal-info`}
                                                >
                                                    Quản lý cá nhân
                                                </NavLink>
                                            </li>
                                            <li>
                                                <button className="dropdown-item" onClick={handleLogout}>
                                                    Đăng xuất
                                                </button>
                                            </li>
                                        </>
                                    ) : (
                                        <>
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
                                        </>
                                    )}
                                </ul>
                            </div>


                            {/* Notifications Icon */}
                            <NavLink className="nav-link" to="/notifications">
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
