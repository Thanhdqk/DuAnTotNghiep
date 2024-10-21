import React, { useEffect, useState } from 'react';
import ListStore from './ListStore';
import axios from 'axios';


const Search = () => {

  const [Danhmuc,SetDanhmuc] = useState([]);
  const [Product,SetProduct] = useState([]);
  const API =  async() =>{

   try {
    const API_Danhmuc = await axios({url:'http://localhost:8080/findAllCategory',method:'GET'});
    const API_SanPham = await axios({url:'http://localhost:8080/FindProductThisWeek',method:'GET'});

    SetDanhmuc(API_Danhmuc.data);
    SetProduct(API_SanPham.data)
   } catch (error) {
    
   }

  }

  useEffect(()=>{
    API();
  },[])
  
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-2 sidebar1">
          <h2>Danh mục</h2>
          <ul className="list-unstyled">
           {Danhmuc.map((d)=>{
            return  <li key={d.danh_mucId} >{d.ten_loaiDM} </li>
           })}
            
          </ul>
          <h2>Khuyến mãi</h2>
          <div>
  <div className="form-check">
    <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
    <label className="form-check-label" htmlFor="flexCheckDefault">
      Default checkbox
    </label>
  </div>
  <div className="form-check">
    <input className="form-check-input" type="checkbox" defaultValue id="flexCheckChecked" defaultChecked />
    <label className="form-check-label" htmlFor="flexCheckChecked">
      Checked checkbox
    </label>
  </div>
</div>
<h2>Đánh giá</h2>
<div>
  <div className="form-check">
    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
    <label className="form-check-label" htmlFor="flexRadioDefault1">
    <i class="bi bi-star-fill text-warning"></i>
    
    </label>
  </div>
  <div className="form-check">
    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"  />
    <label className="form-check-label" htmlFor="flexRadioDefault2">
    <i class="bi bi-star-fill text-warning"></i>
    <i class="bi bi-star-fill text-warning"></i>
    
    </label>
  </div>
  <div className="form-check">
    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
    <label className="form-check-label" htmlFor="flexRadioDefault3">
    <i class="bi bi-star-fill text-warning"></i>
    <i class="bi bi-star-fill text-warning"></i>
    <i class="bi bi-star-fill text-warning"></i>
    </label>
  </div>
  <div className="form-check">
    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" />
    <label className="form-check-label" htmlFor="flexRadioDefault4">
    <i class="bi bi-star-fill text-warning"></i>
    <i class="bi bi-star-fill text-warning"></i>
    <i class="bi bi-star-fill text-warning"></i>
    <i class="bi bi-star-fill text-warning"></i>
    </label>
  </div>
  <div className="form-check">
    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault5" />
    <label className="form-check-label" htmlFor="flexRadioDefault5">
    <i class="bi bi-star-fill text-warning"></i>
    <i class="bi bi-star-fill text-warning"></i>
    <i class="bi bi-star-fill text-warning"></i>
    <i class="bi bi-star-fill text-warning"></i>
    <i class="bi bi-star-fill text-warning"></i>
    </label>
  </div>
</div>



        </div>

        <div className="col-12 col-md-10 product-list">
          <ListStore Products={Product} ></ListStore>
        </div>
      </div>

    </div>
  );
};

export default Search;
