import React, { useEffect, useState } from 'react';
import ListStore from './ListStore';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { SetTEXT } from '../Reducer/searchReducer';
import { ListProductSearch } from '../Reducer/productReducer';


const Search = () => {

  const [Danhmuc, SetDanhmuc] = useState([]);
  const [Product, SetProduct] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [DanhmucCurrent, SetDanhmucCurrent] = useState("");
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
                    SetDanhmucCurrent(danhmuc)
                  }

                  catch (error) { }


                }
                else {
                  try {
                    const res = await axios({ url: `http://localhost:8080/Product/FindByCategory?id=${danhmuc}&name=${TextSearch}`, method: 'GET' })
                    const productsearch = ListProductSearch(res.data)
                    SetDanhmucCurrent(danhmuc)
                    dispatch(productsearch)

                  }

                  catch (error) { }


                }

              }} key={d.danh_mucId} data-value={`${d.danh_mucId}`} >{d.ten_loaiDM} </li>
            })}

          </ul>
          <h2>Khuyến mãi</h2>
          <div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" checked={isChecked} onChange={async (e) => {
                const checked = e.target.checked;
                setIsChecked(checked);

                if (checked) {

                  if (DanhmucCurrent === '' && TextSearch !=='') {
                    const All = await axios({url:`http://localhost:8080/Product/FindbyNameWithDiscount?name=${TextSearch}`,method:'GET'});
                    dispatch(ListProductSearch(All.data));
                    console.log("dm rỗng")
                  }

                  else if (TextSearch === '' && DanhmucCurrent !== '') {
                    const All = await axios({url:`http://localhost:8080/Product/FindbyDanhmucWithDiscount?id=${DanhmucCurrent}`,method:'GET'});
                    dispatch(ListProductSearch(All.data));
                    console.log("search rỗng")
                  }
                  else if (TextSearch === '' && DanhmucCurrent === '') {
                    const All = await axios({url:`http://localhost:8080/FindProductDiscount`,method:'GET'});
                    dispatch(ListProductSearch(All.data));
                   
                  }

                  else {
                    const All = await axios({url:`http://localhost:8080/Product/FindbyNameandDanhmucWithDiscount?id=${DanhmucCurrent}&name=${TextSearch}`,method:'GET'});
                    dispatch(ListProductSearch(All.data));
                  }

                }
                else {

                  if (DanhmucCurrent === '' && TextSearch !=='') {
                    const All = await axios({url:`http://localhost:8080/Product/FindbyName?name=${TextSearch}`,method:'GET'});
                    dispatch(ListProductSearch(All.data));
                    console.log("dm rỗng")
                  }

                  else if (TextSearch === '' && DanhmucCurrent !== '') {
                    const All = await axios({url:`http://localhost:8080/Product/FindByCategory?id=${DanhmucCurrent}`,method:'GET'});
                    dispatch(ListProductSearch(All.data));
                    console.log("search rỗng")
                  }
                  else if (TextSearch === '' && DanhmucCurrent === '') {
                    const All = await axios({url:`http://localhost:8080/FindProductThisWeek`,method:'GET'});
                    dispatch(ListProductSearch(All.data));
                   
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
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                <i class="bi bi-star-fill text-warning"></i>

              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
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
