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