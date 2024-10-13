import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import HomeTemplate from './views/user/Layout/HomeTemplate';
import Index from './views/user/Pages/Index';
import SellerIndex from './views/seller/Pages/Sellerindex';
import AdminIndex from './views/admin/Pages/Adminindex';
import Dashboard from './views/admin/Pages/Dashboard';
import UserManagement from './views/admin/Pages/UserManagement';
import Orders from './views/admin/Pages/Orders';
import Reports from './views/admin/Pages/Reports';
import { store } from './views/user/Reducer/store';
import HomeTemplateSeller from './views/seller/Layout/HomeTemplateSeller';
import HomeTemplateAdmin from './views/admin/Layout/HomeTemplateAdmin';
import Signin from './views/admin/Partials/Signin';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>

        {/* page user */}

        <Route path='' element={<HomeTemplate/>}>
          <Route index element={<Index/>} />
          <Route path='signin' element={<Signin />} />
        </Route>

        {/*end page user */}

        {/* page admin */}

        <Route path='/admin' element={<HomeTemplateAdmin />}>
        <Route index element={<AdminIndex />} /> {/* Trang Dashboard */}
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="user-management" element={<UserManagement />} />
    <Route path="orders" element={<Orders />} />
    <Route path="reports" element={<Reports />} />
          <Route index element={<AdminIndex />} />
          
        </Route>

        {/*end page admin */}

        {/* page seller */}

       

        {/*end page seller */}

      </Routes>
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
