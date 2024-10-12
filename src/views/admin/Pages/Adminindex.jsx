import React, { useState } from 'react';
import ApexCharts from 'react-apexcharts';
import './Adminindex.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../../user/Reducer/userReducer';
import { useNavigate } from 'react-router-dom';


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

    // get account redux
    const Account = useSelector(state => state.user.useraccount)
    // usedispatch
    const dispatch = useDispatch();
    // render hello
    // usenavigate
    const navigate = useNavigate();
    const renderHello = () =>{
        if(Account)
        {
            return <h1>Welcome back, {Account.name}</h1>



           
        }
       
    }
    const renderbuttonLogout = () =>{
        if(Account)
        {
            return <button className='btn btn-danger fw-bold text-light mt-5' style={{minWidth:250}} onClick={()=>{

                    const logout = Logout();
                    dispatch(logout);
                    navigate('/admin/login')
                    console.log("run")

            }}>Logout</button>



           
        }
       
    }


    return (
        <div className="dashboard">
            <aside className={`sidebar ${isSidebarHidden ? 'hide' : ''}`}>
                <h2>Dashboard</h2>
                <ul>
                    <li><a href="#">Dashboard</a></li>
                    <li><a href="#">User Management</a></li>
                    <li><a href="#">Orders</a></li>
                    <li><a href="#">Reports</a></li>
                    <li><a href="#">Orders</a></li>
                    <li><a href="#">Reports</a></li>
                   
                  
                    {renderbuttonLogout()}
                    
                </ul>
            </aside>

            <main className="content">
                <nav className="navbar1">
                    <button className="icon-btn" onClick={toggleSidebar}>
                        <img src="https://img.icons8.com/?size=100&id=3096&format=png&color=000000" alt="Menu Icon" />
                    </button>
                    {renderHello()}
                </nav>

                <section className="main-section">
                <div className="stats">
    <div className="stat-card">
        <i className="fas fa-shopping-cart icon orders-icon"></i> {/* Icon for Orders */}
        <h3>Total Orders</h3>
        <p>75</p>
    </div>
    <div className="stat-card">
        <i className="fas fa-truck icon delivered-icon"></i> {/* Icon for Delivered */}
        <h3>Total Delivered</h3>
        <p>357</p>
    </div>
    <div className="stat-card">
        <i className="fas fa-times-circle icon canceled-icon"></i> {/* Icon for Canceled */}
        <h3>Total Canceled</h3>
        <p>65</p>
    </div>
    <div className="stat-card">
        <i className="fas fa-dollar-sign icon revenue-icon"></i> {/* Icon for Revenue */}
        <h3>Total Revenue</h3>
        <p>$128</p>
    </div>
</div>



                    <div className="charts-row">
                        <div className="chart-container col-6">
                            <ApexCharts options={revenueChartOptions} series={revenueChartOptions.series} type="line" height={250} />
                        </div>
                        <div className="chart-container col-6">
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
            <i className="fas fa-user-circle"></i> {/* Icon for Sofia */}
            <p><strong>Sofia</strong></p>
            <p>⭐⭐⭐⭐⭐</p>
            <p>"Great service!"</p>
        </div>
        <div className="review-card">
            <i className="fas fa-user-circle"></i> {/* Icon for John S. */}
            <p><strong>John S.</strong></p>
            <p>⭐⭐⭐⭐</p>
            <p>"Good quality products."</p>
        </div>
        <div className="review-card">
            <i className="fas fa-user-circle"></i> {/* Icon for Ashley */}
            <p><strong>Ashley</strong></p>
            <p>⭐⭐⭐⭐⭐</p>
            <p>"Will come back again!"</p>
        </div>
    </div>
</section>

<section className="customer-reviews">
    <h2>Customer Reviews</h2>
    <div className="reviews">
        <div className="review-card">
            <i className="fas fa-user-circle review-icon"></i> {/* Icon for Sofia */}
            <p><strong>Sofia</strong></p>
            <p>⭐⭐⭐⭐⭐</p>
            <p>"Great service!"</p>
        </div>
        <div className="review-card">
            <i className="fas fa-user-circle review-icon"></i> {/* Icon for John S. */}
            <p><strong>John S.</strong></p>
            <p>⭐⭐⭐⭐</p>
            <p>"Good quality products."</p>
        </div>
        <div className="review-card">
            <i className="fas fa-user-circle review-icon"></i> {/* Icon for Ashley */}
            <p><strong>Ashley</strong></p>
            <p>⭐⭐⭐⭐⭐</p>
            <p>"Will come back again!"</p>
        </div>
    </div>
</section>

<section className="notifications">
    <h2>Notifications</h2>
    <div className="notification-card">
        <i className="fas fa-user-circle notification-icon"></i> {/* Icon for new user */}
        <p>New user registered: Alex</p>
    </div>
    <div className="notification-card">
        <i className="fas fa-box notification-icon"></i> {/* Icon for order */}
        <p>Order #1234 has been shipped!</p>
    </div>
    <div className="notification-card">
        <i className="fas fa-star notification-icon"></i> {/* Icon for review */}
        <p>Customer review received from Mike: ⭐⭐⭐⭐</p>
    </div>
</section>


                </section>
            </main>
        </div>
    );
};

export default Adminindex;