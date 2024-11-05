import React from 'react';
import { Link } from 'react-router-dom';

const FavoriteProducts = () => {
  // Sample product data
  const products = [
    { id: 1, name: "Sản phẩm A", date: new Date(2024, 9, 20), imgSrc: 'https://via.placeholder.com/100', price: '100.000 VND', category: 'electronics' },
    { id: 2, name: "Sản phẩm B", date: new Date(2024, 9, 22), imgSrc: 'https://via.placeholder.com/100', price: '150.000 VND', category: 'fashion' },
    { id: 3, name: "Sản phẩm C", date: new Date(2024, 9, 21), imgSrc: 'https://via.placeholder.com/100', price: '200.000 VND', category: 'electronics' },
    { id: 4, name: "Sản phẩm D", date: new Date(2024, 9, 23), imgSrc: 'https://via.placeholder.com/100', price: '250.000 VND', category: 'fashion' },
  ];

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <Link to="/" style={styles.link}>
          <h3 style={styles.sidebarHeader}>Quản Lý Sản Phẩm Yêu Thích</h3>
        </Link>
        <ul style={styles.menu}>
          {['Personal Info', 'Lịch sử đặt hàng', 'Đơn hàng đang xử lý', 'Phương thức thanh toán', 'Đổi mật khẩu'].map((item, index) => (
            <li key={index}>
              <Link to={`/${item.replace(/ /g, '-').toLowerCase()}`} style={styles.link}>
                <button style={styles.button}>{item}</button>
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      <main style={styles.mainContent}>
        <h2 style={styles.formHeader}>Danh Sách Sản Phẩm Yêu Thích</h2>
        <label htmlFor="categoryFilter" style={styles.label}>Loại sản phẩm:</label>
        <select id="categoryFilter" style={styles.select}>
          <option value="all">Tất cả</option>
          <option value="electronics">Điện tử</option>
          <option value="fashion">Thời trang</option>
        </select>
        
        <ul style={styles.productList}>
          {products.map(product => (
            <li key={product.id} style={styles.productItem}>
              <img src={product.imgSrc} alt={product.name} style={styles.image} />
              <div style={styles.productInfo}>
                <strong>{product.name}</strong>
                <div style={styles.price}>{product.price}</div>
                <div style={styles.date}>Ngày tạo: {product.date.toLocaleDateString()}</div>
              </div>
              <button style={styles.addButton}>Thêm vào giỏ hàng</button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

// Combined CSS styles into a single styles object
const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#2c3e50',
    color: '#fff',
    padding: '20px',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
  },
  sidebarHeader: {
    fontSize: '20px',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#ecf0f1',
  },
  link: {
    textDecoration: 'none',
    color: 'white',
  },
  menu: {
    listStyleType: 'none',
    padding: '0',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#34495e',
    color: 'white',
    border: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '16px',
    marginBottom: '10px',
    borderRadius: '5px',
    transition: 'background-color 0.3s, transform 0.2s',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  },
  mainContent: {
    flex: 1,
    padding: '40px',
    backgroundColor: '#ecf0f1',
    overflowY: 'auto',
  },
  formHeader: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#34495e',
  },
  label: {
    marginBottom: '10px',
    display: 'block',
    fontWeight: 'bold',
    color: '#34495e',
  },
  select: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '20px',
  },
  productList: {
    listStyleType: 'none',
    padding: '0',
  },
  productItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #ccc',
    color: '#34495e',
    transition: 'background-color 0.3s',
    cursor: 'pointer',
  },
  productInfo: {
    marginLeft: '10px',
    flexGrow: 1,
  },
  image: {
    width: '100px',
    height: '100px',
    borderRadius: '5px',
  },
  price: {
    fontSize: '16px',
    color: '#27ae60',
    marginTop: '5px',
  },
  date: {
    fontSize: '14px',
    color: '#7f8c8d',
    marginTop: '5px',
  },
  addButton: {
    marginLeft: '10px',
    padding: '8px 12px',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  cartHeader: {
    fontSize: '20px',
    marginTop: '20px',
    marginBottom: '10px',
    color: '#34495e',
  },
  cartList: {
    listStyleType: 'none',
    padding: '0',
  },
  cartItem: {
    padding: '10px',
    borderBottom: '1px solid #ccc',
    color: '#34495e',
  },
};

export default FavoriteProducts;
