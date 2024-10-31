import React, { useEffect, useState } from 'react';
import ListStore from './ListStore';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { SetDanhMuc, SetSoSao, SetTEXT } from '../Reducer/searchReducer';
import { ListProductSearch } from '../Reducer/productReducer';


const Search = () => {

  const [Danhmuc, SetDanhmuc] = useState([]);
  const [Product, SetProduct] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [DanhmucCurrent, SetDanhmucCurrent] = useState("");
  const danhmuc = useSelector(state => state.textSearch.Danhmuc);
  const sosao = useSelector(state => state.textSearch.sosao);
  const dispatch = useDispatch();
  const TextSearch = useSelector(state => state.textSearch.Text);



  const API = async () => {

    try {
      const API_Danhmuc = await axios({ url: 'http://localhost:8080/findAllCategory', method: 'GET' });
      const API_SanPham = await axios({ url: 'http://localhost:8080/FindProductThisWeek', method: 'GET' });

      SetDanhmuc(API_Danhmuc.data);
      SetProduct(API_SanPham.data)
    } catch (error) {

    }

  }

  useEffect(() => {
    API();
  }, [])

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-2 sidebar1">
          <h2>Danh mục</h2>
          <ul className="list-unstyled">
            {Danhmuc.map((d) => {
              return <li onClick={async (e) => {
                const danhmuc = e.target.getAttribute("data-value");
                


                if (TextSearch === '') {
                  try {
                    const res = await axios({ url: `http://localhost:8080/Product/FindByCategory?id=${danhmuc}`, method: 'GET' })
                    const productsearch = ListProductSearch(res.data)
                    dispatch(productsearch)
                    dispatch(SetDanhMuc(danhmuc))
                    SetDanhmucCurrent(danhmuc)
                  }

                  catch (error) { }


                }
                else if(TextSearch === '' && isChecked)
                {
                  try {
                    const res = await axios({ url: `Product/FindbyNameandDanhmucWithDiscount?id=${danhmuc}&name=${TextSearch}`, method: 'GET' })
                    const productsearch = ListProductSearch(res.data)
                    SetDanhmucCurrent(danhmuc)
                    dispatch(SetDanhMuc(danhmuc))
                    dispatch(productsearch)

                  }

                  catch (error) { }
                }
                 else  {
                  try {
                    const res = await axios({ url: `http://localhost:8080/Product/FindbyNameandDanhmuc?id=${danhmuc}&name=${TextSearch}`, method: 'GET' })
                    const productsearch = ListProductSearch(res.data)
                    SetDanhmucCurrent(danhmuc)
                    dispatch(SetDanhMuc(danhmuc))
                    dispatch(productsearch)

                  }

                  catch (error) { }


                }

              }} key={d.danh_mucId} data-value={`${d.danh_mucId}`}   >{d.ten_loaiDM} </li>
            })}

          </ul>
          <h2>Khuyến mãi</h2>
          <div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" checked={isChecked} onChange={async (e) => {
                const checked = e.target.checked;
                setIsChecked(checked);

                if (checked) {

                  if (danhmuc === '' && TextSearch !== '') {
                    const All = await axios({ url: `http://localhost:8080/Product/FindbyNameWithDiscount?name=${TextSearch}`, method: 'GET' });
                    dispatch(ListProductSearch(All.data));
                    console.log("dm rỗng")
                  }

                  else if (TextSearch === '' && danhmuc !== '') {
                    const All = await axios({ url: `http://localhost:8080/Product/FindbyDanhmucWithDiscount?id=${danhmuc}`, method: 'GET' });
                    dispatch(ListProductSearch(All.data));
                    console.log("search rỗng")
                  }
                  else if (TextSearch === '' && danhmuc === '') {
                    const All = await axios({ url: `http://localhost:8080/FindProductDiscount`, method: 'GET' });
                    dispatch(ListProductSearch(All.data));
                    console.log("tất cả rỗng")
                  }

                  else {
                    const All = await axios({ url: `http://localhost:8080/Product/FindbyNameandDanhmucWithDiscount?id=${danhmuc}&name=${TextSearch}`, method: 'GET' });
                    dispatch(ListProductSearch(All.data));
                  }

                }
                else {

                  if (danhmuc === '' && TextSearch !== '') {
                    const All = await axios({ url: `http://localhost:8080/Product/findSanPhamByTenWithOutGG?name=${TextSearch}`, method: 'GET' });
                    dispatch(ListProductSearch(All.data));
                    console.log("dm rỗng")
                  }

                  else if (TextSearch === '' && danhmuc !== '') {
                    const All = await axios({ url: `http://localhost:8080/Product/findSanPhamByDandMucAndWithOutGG?id=${danhmuc}`, method: 'GET' });
                    dispatch(ListProductSearch(All.data));
                    console.log("search rỗng")
                  }
                  else if (TextSearch !== '' && danhmuc !== '') {
                    const All = await axios({ url: `http://localhost:8080/Product/FindbyNameandDanhmucWithoutDiscount?id=${danhmuc}&name=${TextSearch}`, method: 'GET' });
                    dispatch(ListProductSearch(All.data));
                    console.log("search rỗng")
                  }
                  else if (TextSearch === '' && danhmuc === '') {
                    const All = await axios({ url: `http://localhost:8080/FindProductThisWeek`, method: 'GET' });
                    dispatch(ListProductSearch(All.data));
                    console.log("rỗng")

                  }

                }


              }}
                defaultValue id="flexCheckDefault" />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Có khuyến mãi
              </label>
            </div>

          </div>
          <h2>Đánh giá</h2>
          <div>
            <div className="form-check">
              <input onClick={async()=>{
                  const res = await axios({url:'http://localhost:8080/Product/FindbySosao?sosao=1',method:"GET"})
                  dispatch(ListProductSearch(res.data));
                
                  dispatch(SetSoSao(1))
              }} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                <i className="bi bi-star-fill text-warning"></i>

              </label>
            </div>
            <div className="form-check">
              <input onClick={async()=>{
                  const res = await axios({url:'http://localhost:8080/Product/FindbySosao?sosao=2',method:"GET"})
                
                  dispatch(SetSoSao(2))
                  dispatch(ListProductSearch(res.data));

              }} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-fill text-warning"></i>

              </label>
            </div>
            <div className="form-check">
              <input onClick={async()=>{
                  const res = await axios({url:'http://localhost:8080/Product/FindbySosao?sosao=3',method:"GET"})
                
                  dispatch(SetSoSao(3))
                  dispatch(ListProductSearch(res.data));

              }} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
              <label className="form-check-label" htmlFor="flexRadioDefault3">
                <div>
                  <i className="bi bi-star-fill text-warning" />
                  <i className="bi bi-star-fill text-warning" />
                  <i className="bi bi-star-fill text-warning" />
                </div>

              </label>
            </div>
            <div className="form-check">
              <input onClick={async()=>{
                  const res = await axios({url:'http://localhost:8080/Product/FindbySosao?sosao=4',method:"GET"})
                  
                  dispatch(SetSoSao(4))
                  dispatch(ListProductSearch(res.data));

              }} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" />
              <label className="form-check-label" htmlFor="flexRadioDefault4">
                <div>
                  <i className="bi bi-star-fill text-warning" />
                  <i className="bi bi-star-fill text-warning" />
                  <i className="bi bi-star-fill text-warning" />
                  <i className="bi bi-star-fill text-warning" />
                </div>

              </label>
            </div>
            <div className="form-check">
              <input onClick={async()=>{
                  const res = await axios({url:'http://localhost:8080/Product/FindbySosao5',method:"GET"})
                 
                  dispatch(SetSoSao(5))
                  dispatch(ListProductSearch(res.data));

              }} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault5" />
              <label className="form-check-label" htmlFor="flexRadioDefault5">
                <div>
                  <i className="bi bi-star-fill text-warning" />
                  <i className="bi bi-star-fill text-warning" />
                  <i className="bi bi-star-fill text-warning" />
                  <i className="bi bi-star-fill text-warning" />
                  <i className="bi bi-star-fill text-warning" />
                </div>

              </label>
            </div>
          </div>
          <h2></h2>
              <button className='btn btn-outline-dark mt-3 fw-bold text-center' onClick={()=>{
                const radioButtons = document.querySelectorAll('input[name="flexRadioDefault"]');
                radioButtons.forEach((radio) => {
                  radio.checked = false;
                });
                setIsChecked(false)
                dispatch(SetDanhMuc(""))
                dispatch(SetSoSao(""))
                dispatch(SetTEXT(""))
                dispatch(ListProductSearch(Product));
              }} style={{minWidth:160}}>Xóa bộ lọc</button>

        </div>

        <div className="col-12 col-md-10 product-list">
          <ListStore Products={Product} checked={isChecked}></ListStore>
        </div>
      </div>

    </div>
  );
};

export default Search;