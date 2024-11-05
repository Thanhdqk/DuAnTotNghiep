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
import { store } from './views/user/Reducer/store';
import HomeTemplateSeller from './views/seller/Layout/HomeTemplateSeller';
import HomeTemplateAdmin from './views/admin/Layout/HomeTemplateAdmin';
import LoginAdmin from './views/admin/Pages/LoginAdmin';
import AdminLogin from './views/admin/Pages/AdminLogin';
import RegisterToSeller from './views/user/Pages/RegisterToSeller';
import Popup from './views/admin/Pages/Popup';
import ProtectEoute from './views/admin/Pages/ProtectEoute';
import App from './views/admin/Pages/App';
import TyneMCE from './views/user/Pages/TyneMCE';
import TestScroll from './views/user/Pages/TestScroll';
import ProductDetail from './views/user/Pages/ProductDetail';
import Search from './views/user/Pages/Search';
import TestSearch from './views/user/Pages/TestSearch';
import Page404 from './views/user/Pages/Page404';
import Sign from './views/user/Pages/Sign';
import PersonalInfo from './views/user/Pages/PersonalInfo';
import Login from './views/user/Pages/Login';
import FavoriteProducts from './views/user/Pages/FavoriteProducts';
import Order from './views/user/Pages/OrderCard';
import ReviewForm  from './views/user/Pages/Review';
import OrderDetail  from './views/user/Pages/OrderDetail';
import PasswordChangeForm  from './views/user/Pages/PasswordChangeForm';
import Feedback  from './views/user/Pages/Feedback';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>

        {/* page user */}

        <Route path='' element={<HomeTemplate/>}>
          <Route index element={<Index/>} />
          
         
          
          <Route path='product' element={<ProductDetail></ProductDetail>} />
          <Route path='search' element={<Search></Search>} />
          <Route path='/login' element={<Login></Login>} />
          <Route path='/sign' element={<Sign></Sign>} />
          
        </Route>

        {/*end page user */} 
        <Route path='/đổi-mật-khẩu' element={<PasswordChangeForm></PasswordChangeForm>} />
        <Route path='//review/:productId' element={<ReviewForm></ReviewForm>} />
        <Route path='/OrderDetail/:id' element={<OrderDetail ></OrderDetail >} />
        <Route path='/lịch-sử-đặt-hàng' element={<Order></Order>} />
        <Route path='/like' element={<FavoriteProducts></FavoriteProducts>} />
        <Route path='/thông-tin-cá-nhân' element={<PersonalInfo></PersonalInfo>} />
        <Route path='/Feedback' element={<Feedback></Feedback>} />
        {/* page admin */}
        <Route path='/admin/login' element={<AdminLogin></AdminLogin>} />
        
        
        <Route path='/admin/dashboard' element={
          <ProtectEoute>
            <AdminIndex />
          </ProtectEoute>} >

       

        </Route>
          
          
      

        {/*end page admin */}

        {/* start page 404 */}

          <Route path='*' element={<Page404></Page404>}></Route>

         {/* end page 404 */}
      </Routes>
      <Popup></Popup>
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
