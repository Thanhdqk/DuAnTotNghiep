import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Link to="/" style={styles.logoText}>MyApp</Link>
      </div>
      <ul style={styles.navLinks}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.navLink}>Home</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/about" style={styles.navLink}>About</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/contact" style={styles.navLink}>Contact</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/register" style={styles.navLink}>Register</Link>
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ff4c4c',
    padding: '15px 30px',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#fff',
  },
  logoText: {
    textDecoration: 'none',
    color: '#fff',
  },
  navLinks: {
    display: 'flex',
    listStyle: 'none',
    gap: '20px',
  },
  navItem: {
    display: 'inline',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '18px',
    padding: '8px 16px',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease',
  },
  navLinkHover: {
    backgroundColor: '#ff6666',
  },
};

export default NavBar;
