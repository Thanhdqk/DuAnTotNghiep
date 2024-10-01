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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>

        {/* page user */}

        <Route path='' element={<HomeTemplate/>}>
          <Route index element={<Index/>} />
        </Route>

        {/*end page user */}

        {/* page admin */}

        <Route path='/admin' element={<HomeTemplateAdmin />}>
        
          <Route index element={<AdminIndex />} />
          
        </Route>

        {/*end page admin */}

        {/* page seller */}

        <Route path='/seller' element={<HomeTemplateSeller />}>
          <Route index element={<SellerIndex />} />
        </Route>

        {/*end page seller */}

      </Routes>
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
