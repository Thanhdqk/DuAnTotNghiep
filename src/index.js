import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Kho from './components/Quanlykho';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Nhaphang from './components/Quanlynhaphang';
import Sanpham from './components/Quanlysanpham';
import Voucher from './components/Quanlyvoucher';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/kho" element={<Kho />} />
        <Route path="/nhaphang" element={<Nhaphang />} />
        <Route path="/Sanpham" element={<Sanpham />} />
        <Route path="/Voucher" element={<Voucher />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
