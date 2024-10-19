import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import HomeTemplate from "./views/user/Layout/HomeTemplate";
import Index from "./views/user/Pages/Index";
import SellerIndex from "./views/seller/Pages/Sellerindex";
import AdminIndex from "./views/admin/Pages/Adminindex";
import { store } from "./views/user/Reducer/store";
import HomeTemplateSeller from "./views/seller/Layout/HomeTemplateSeller";
import HomeTemplateAdmin from "./views/admin/Layout/HomeTemplateAdmin";
import LoginAdmin from "./views/admin/Pages/LoginAdmin";
import AdminLogin from "./views/admin/Pages/AdminLogin";
import RegisterToSeller from "./views/user/Pages/RegisterToSeller";
import Popup from "./views/admin/Pages/Popup";
import ProtectEoute from "./views/admin/Pages/ProtectEoute";
import App from "./views/admin/Pages/App";
import TyneMCE from "./views/user/Pages/TyneMCE";
import TestScroll from "./views/user/Pages/TestScroll";
import ProductDetail from "./views/user/Pages/ProductDetail";
import Search from "./views/user/Pages/Search";
import TestSearch from "./views/user/Pages/TestSearch";
import Page404 from "./views/user/Pages/Page404";
import Cart from "./views/user/Pages/Cart";
import Thanhtoan from "./views/user/Pages/Thanhtoan";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
      {/* Thanh toán và giỏ hàng */}
      <Route path="cart" element={<Cart/>} />
      <Route path="thanhtoan" element={<Thanhtoan/>} />
        {/* page user */}
        
        <Route path="" element={<HomeTemplate />}>
          <Route index element={<Index />} />

          <Route path="product" element={<ProductDetail></ProductDetail>} />
          <Route path="search" element={<Search></Search>} />
        </Route>

        {/*end page user */}
  
        {/* page admin */}
        <Route path="/admin/login" element={<AdminLogin></AdminLogin>} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectEoute>
              <AdminIndex />
            </ProtectEoute>
          }
        ></Route>

        {/*end page admin */}

        {/* start page 404 */}

        <Route path="*" element={<Page404></Page404>}></Route>

        
        {/* end page 404 */}
      </Routes>
      <Popup></Popup>

    </BrowserRouter>
  </Provider>
);

reportWebVitals();
