// Adminindex.js
import React, { useState } from 'react';
import ApexCharts from 'react-apexcharts';
import './Adminindex.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Outlet, Link } from 'react-router-dom';

const Adminindex = () => {
    
    const [isSidebarHidden, setSidebarHidden] = useState(false);

    const toggleSidebar = () => {
        setSidebarHidden(!isSidebarHidden);
    };

    const revenueChartOptions = {
        chart: {
            type: 'line',
            height: 250,
            toolbar: { show: false },
        },
        series: [
            {
                name: 'Total Revenue',
                data: [30, 40, 35, 50, 49, 60, 70],
            },
            {
                name: 'Customer Growth',
                data: [10, 20, 15, 25, 30, 35, 40],
            },
        ],
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        },
        stroke: {
            curve: 'smooth',
        },
        title: {
            text: 'Monthly Overview',
            align: 'left',
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#333',
            },
        },
        colors: ['#008FFB', '#FF4560'],
        grid: {
            borderColor: '#e0e0e0',
            row: {
                colors: ['#f9f9f9', 'transparent'],
            },
        },
        tooltip: {
            theme: 'dark',
        },
    };

    const orderChartOptions = {
        chart: {
            type: 'bar',
            height: 250,
            toolbar: { show: false },
        },
        series: [
            {
                name: 'Orders',
                data: [20, 30, 25, 45, 60, 70, 50],
            },
        ],
        xaxis: {
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        colors: ['#28a745'],
        title: {
            text: 'Weekly Orders',
            align: 'left',
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#333',
            },
        },
    };

    const pieChartOptions = {
        chart: {
            type: 'pie',
            height: 250,
            toolbar: { show: false },
        },
        series: [44, 55, 13, 33],
        labels: ['Delivered', 'Pending', 'Canceled', 'Returned'],
        colors: ['#008FFB', '#28a745', '#FF4560', '#FF9800'],
        title: {
            text: 'Order Status',
            align: 'left',
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#333',
            },
        },
    };

    return (
        <div className="dashboard">
            <aside className={`sidebar ${isSidebarHidden ? 'hide' : ''}`}>
                <h2>Dash Board</h2>
                <ul>
                    <li><Link to="/admin/dashboard">Dashboard</Link></li>
                    <li><Link to="/admin/user-management">User Management</Link></li>
                    <li><Link to="/admin/orders">Orders</Link></li>
                    <li><Link to="/admin/reports">Reports</Link></li>
                </ul>
            </aside>

            <main className="content">
                <Outlet></Outlet>
                <nav className="navbar">
                    <button className="icon-btn" onClick={toggleSidebar}>
                        <img src="https://img.icons8.com/?size=100&id=3096&format=png&color=000000" alt="Menu Icon" />
                    </button>
                    <h1>Welcome back, Samantha</h1>
                </nav>

                <section className="main-section">
                    <div className="stats">
                        <div className="stat-card">
                            <i className="fas fa-shopping-cart icon orders-icon"></i>
                            <h3>Total Orders</h3>
                            <p>75</p>
                        </div>
                        <div className="stat-card">
                            <i className="fas fa-truck icon delivered-icon"></i>
                            <h3>Total Delivered</h3>
                            <p>357</p>
                        </div>
                        <div className="stat-card">
                            <i className="fas fa-times-circle icon canceled-icon"></i>
                            <h3>Total Canceled</h3>
                            <p>65</p>
                        </div>
                        <div className="stat-card">
                            <i className="fas fa-dollar-sign icon revenue-icon"></i>
                            <h3>Total Revenue</h3>
                            <p>$128</p>
                        </div>
                    </div>

                    <div className="charts-row" style={{ display: 'flex', marginBottom: '20px' }}>
                        <div className="chart-container" style={{ flex: 1, marginRight: '10px' }}>
                            <ApexCharts options={revenueChartOptions} series={revenueChartOptions.series} type="line" height={250} />
                        </div>
                        <div className="chart-container" style={{ flex: 1, marginLeft: '10px' }}>
                            <ApexCharts options={orderChartOptions} series={orderChartOptions.series} type="bar" height={250} />
                        </div>
                    </div>

                    <div className="chart-container">
                        <ApexCharts options={pieChartOptions} series={pieChartOptions.series} type="pie" height={250} />
                    </div>

                    <section className="customer-reviews">
                        <h2>Customer Reviews</h2>
                        <div className="reviews">
                            <div className="review-card">
                                <i className="fas fa-user-circle"></i>
                                <p><strong>Sofia</strong></p>
                                <p>⭐⭐⭐⭐⭐</p>
                                <p>"Great service!"</p>
                            </div>
                            <div className="review-card">
                                <i className="fas fa-user-circle"></i>
                                <p><strong>John S.</strong></p>
                                <p>⭐⭐⭐⭐</p>
                                <p>"Good quality products."</p>
                            </div>
                            <div className="review-card">
                                <i className="fas fa-user-circle"></i>
                                <p><strong>Ashley</strong></p>
                                <p>⭐⭐⭐⭐⭐</p>
                                <p>"Will come back again!"</p>
                            </div>
                        </div>
                    </section>

                    <section className="notifications">
                        <h2>Notifications</h2>
                        <div className="notification-card">
                            <i className="fas fa-user-circle notification-icon"></i>
                            <p>New user registered: Alex</p>
                        </div>
                        <div className="notification-card">
                            <i className="fas fa-box notification-icon"></i>
                            <p>Order #1234 has been shipped!</p>
                        </div>
                        <div className="notification-card">
                            <i className="fas fa-star notification-icon"></i>
                            <p>Customer review received from Mike: ⭐⭐⭐⭐</p>
                        </div>
                    </section>
                </section>
            </main>
        </div>
    );
};

export default Adminindex;