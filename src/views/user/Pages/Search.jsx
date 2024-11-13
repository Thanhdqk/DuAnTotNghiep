import React, { useEffect, useState } from 'react';
import ListStore from './ListStore';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { SetDanhMuc, SetPrice, SetSoSao, SetTEXT } from '../Reducer/searchReducer';
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
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);


  const API = async () => {

    try {
      const API_Danhmuc = await axios({ url: 'http://localhost:8080/findAllCategory', method: 'GET' });
      const API_SanPham = await axios({ url: 'http://localhost:8080/FindProductThisWeek', method: 'GET' });

      SetDanhmuc(API_Danhmuc.data);
      SetProduct(API_SanPham.data)
    } catch (error) {

    }

  }

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await axios({ url: `http://localhost:8080/Product/FindbyPrice?price1=${minPrice}&price2=${maxPrice}`, method: 'GET' })
    dispatch(ListProductSearch(res.data));
    dispatch(SetPrice(10000))
    const radioButtonPrice = document.querySelectorAll('input[name="flexRadioDefault1"]');
    radioButtonPrice.forEach((radio) => {
      radio.checked = false;
    });

  };

  const findBySoSao = async (sosao) => {


    // Hàm để xây dựng URL động
    const buildUrl = (isChecked, sosao, TextSearch, danhmuc) => {
      let baseUrl = 'http://localhost:8080/Product/';
      if (isChecked) {
        if (TextSearch && danhmuc) {
          return `${baseUrl}FindSanPhamBySoSaoAndDanhMucAndNameHaveDisCount?sosao=${sosao}&id=${danhmuc}&name=${TextSearch}`;
        } else if (TextSearch) {
          return `${baseUrl}FindSanPhamBySoSaoAndNameHaveDisCount?sosao=${sosao}&name=${TextSearch}`;
        } else if (danhmuc) {
          return `${baseUrl}FindSanPhamBySoSaoAndDanhMucHaveDisCount?sosao=${sosao}&id=${danhmuc}`;
        } else {
          return `${baseUrl}FindSanPhamBySoSaoHaveDiscount?sosao=${sosao}`;
        }
      } else {
        if (TextSearch && danhmuc) {
          return `${baseUrl}FindSanPhamBySoSaoAndDanhMucAndName?sosao=${sosao}&id=${danhmuc}&name=${TextSearch}`;
        } else if (TextSearch) {
          return `${baseUrl}FindSanPhamBySoSaoAndName?sosao=${sosao}&name=${TextSearch}`;
        } else if (danhmuc) {
          return `${baseUrl}FindSanPhamBySoSaoAndDanhMuc?sosao=${sosao}&id=${danhmuc}`;
        } else {
          return `${baseUrl}FindbySosao?sosao=${sosao}`;
        }
      }
    };

    // Xây dựng URL và thực hiện yêu cầu
    const url = buildUrl(isChecked, sosao, TextSearch, danhmuc);
    try {
      const res = await axios({ url, method: "GET" });
      console.log('Kết quả:', res.data);
      dispatch(SetSoSao(sosao));
      dispatch(ListProductSearch(res.data));
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    }
  }

  useEffect(() => {
    API();
    console.log('sad', isChecked)
    console.log('sad', danhmuc)
  }, [])

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-3 sidebar1">
          <h2>Danh mục</h2>
          <ul className="list-unstyled">
            {Danhmuc.map((d) => {
              return <li onClick={async (e) => {
                const danhmuc = e.target.getAttribute("data-value");



                if (TextSearch === '' && sosao === "") {
                  try {
                    const res = await axios({ url: `http://localhost:8080/Product/FindByCategory?id=${danhmuc}`, method: 'GET' })
                    const productsearch = ListProductSearch(res.data)
                    dispatch(productsearch)
                    dispatch(SetDanhMuc(danhmuc))
                    SetDanhmucCurrent(danhmuc)
                  }

                  catch (error) { }


                }
                if (TextSearch === '' && isChecked && sosao === "") {
                  try {
                    const res = await axios({ url: `http://localhost:8080/Product/FindbyDanhmucWithDiscount?id=${danhmuc}`, method: 'GET' })
                    const productsearch = ListProductSearch(res.data)
                    SetDanhmucCurrent(danhmuc)
                    dispatch(SetDanhMuc(danhmuc))
                    dispatch(productsearch)


                  }

                  catch (error) { }
                }


                else {
                  try {
                    const res = await axios({ url: `http://localhost:8080/Product/FindbyNameandDanhmuc?id=${danhmuc}&name=${TextSearch}`, method: 'GET' })
                    const productsearch = ListProductSearch(res.data)
                    SetDanhmucCurrent(danhmuc)
                    dispatch(SetDanhMuc(danhmuc))
                    dispatch(productsearch)

                  }

                  catch (error) { }


                }

              }} key={d.danh_mucId} data-value={`${d.danh_mucId}`} style={danhmuc === d.danh_mucId ? { backgroundColor: 'blue', color: 'white' } : null}  >{d.ten_loaiDM} </li>
            })}

          </ul>
          <h2>Khuyến mãi</h2>
          <div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" checked={isChecked} onChange={async (e) => {
                const checked = e.target.checked;
                setIsChecked(checked);

                if (checked) {

                  if (danhmuc === '' && TextSearch !== '' && sosao === "") {
                    const All = await axios({ url: `http://localhost:8080/Product/FindbyNameWithDiscount?name=${TextSearch}`, method: 'GET' });
                    dispatch(ListProductSearch(All.data));
                    console.log("dm rỗng")
                  }

                  else if (TextSearch === '' && danhmuc !== '' && sosao === "") {
                    const All = await axios({ url: `http://localhost:8080/Product/FindbyDanhmucWithDiscount?id=${danhmuc}`, method: 'GET' });
                    dispatch(ListProductSearch(All.data));
                    console.log("search rỗng")
                  }
                  else if (sosao !== "" && TextSearch === '' && danhmuc === '') {
                    if (sosao == 5) {
                      const All = await axios({ url: `http://localhost:8080/Product/findSanPhamBySoSaoEqual5HaveDiscount`, method: 'GET' });
                      dispatch(ListProductSearch(All.data));
                    }
                    else {
                      const All = await axios({ url: `http://localhost:8080/Product/FindSanPhamBySoSaoHaveDiscount?sosao=${sosao}`, method: 'GET' });
                      dispatch(ListProductSearch(All.data));
                    }
                  }
                  else if (TextSearch === '' && danhmuc === '' && sosao === '') {
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
              <input onClick={async () => {
                // start 1

                findBySoSao(5)

                // end 1
              }} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                <i className="bi bi-star-fill text-warning"></i>

              </label>
            </div>
            <div className="form-check">
              <input onClick={async () => {


                findBySoSao(2)

                // end 2

              }} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-fill text-warning"></i>

              </label>
            </div>
            <div className="form-check">
              <input onClick={async () => {

                findBySoSao(3)
                // end 3

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
              <input onClick={async () => {
                findBySoSao(4)
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
              <input onClick={async () => {
                if (isChecked) {
                  if (TextSearch !== '' && danhmuc === '') {
                    const res = await axios({ url: `http://localhost:8080/Product/findSanPhamBySoSaoEqual5AndNameHaveDisCount?name=${TextSearch}`, method: "GET" })
                    console.log('res 1', res.data)
                    dispatch(SetSoSao(5))
                    dispatch(ListProductSearch(res.data));
                  }
                  else if (danhmuc !== '' && TextSearch === '') {
                    const res = await axios({ url: `http://localhost:8080/Product/findSanPhamBySoSaoEqual5AndDanhMucHaveDisCount?id=?${danhmuc}`, method: "GET" })
                    console.log('res 2', res.data)
                    dispatch(SetSoSao(5))
                    dispatch(ListProductSearch(res.data));
                  }

                  else if (TextSearch !== '' && danhmuc !== "") {
                    const res = await axios({ url: `http://localhost:8080/Product/findSanPhamBySoSaoEqual5AndDanhMucAndNameHaveDisCount?id=${danhmuc}&name=${TextSearch}`, method: "GET" })
                    console.log('res 3', res.data)
                    dispatch(SetSoSao(5))
                    dispatch(ListProductSearch(res.data));
                  }
                  else {
                    const res = await axios({ url: 'http://localhost:8080/Product/findSanPhamBySoSaoEqual5HaveDiscount', method: "GET" })
                    dispatch(SetSoSao(5))
                    dispatch(ListProductSearch(res.data));
                    alert("else gg")
                  }

                }
                else {
                  if (TextSearch !== '' && danhmuc === '') {
                    const res = await axios({ url: `http://localhost:8080/Product/findSanPhamBySoSaoEqual5AndName?name=${TextSearch}`, method: "GET" })
                    console.log('res 1', res.data)
                    dispatch(SetSoSao(5))
                    dispatch(ListProductSearch(res.data));
                  }
                  else if (danhmuc !== '' && TextSearch === '') {
                    const res = await axios({ url: `http://localhost:8080/Product/findSanPhamBySoSaoEqual5AndDanhMuc?id=${danhmuc}`, method: "GET" })
                    console.log('res 2', res.data)
                    dispatch(SetSoSao(5))
                    dispatch(ListProductSearch(res.data));
                  }

                  else if (TextSearch !== '' && danhmuc !== '') {
                    const res = await axios({ url: `http://localhost:8080/Product/findSanPhamBySoSaoEqual5AndDanhMucAndName?id=${danhmuc}&name=${TextSearch}`, method: "GET" })
                    console.log('res 3', res.data)
                    dispatch(SetSoSao(4))
                    dispatch(ListProductSearch(res.data));
                  }
                  else {
                    const res = await axios({ url: 'http://localhost:8080/Product/FindbySosao5', method: "GET" })
                    dispatch(SetSoSao(5))
                    dispatch(ListProductSearch(res.data));

                  }
                }

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
          <h2>Giá</h2>

          <div className="form-check">
            <input onClick={async () => {

              // let url = 'http://localhost:8080/Product/FindbyPriceLess?price=10000';

              // // Cấu hình filters dựa trên điều kiện hiện tại
              // const filters = {
              //   danhmuc,
              //   TextSearch,
              //   isChecked,
              //   sosao
              // };


              // if (filters.danhmuc) {
              //   url += `&category=${filters.danhmuc}`;
              // }
              // if (filters.TextSearch) {
              //   url += `&text=${filters.TextSearch}`;
              // }
              // if (filters.isChecked) {
              //   url += `&promotion=true`;
              // }
              // if (filters.sosao) {
              //   url += `&rating=${filters.sosao}`;
              // }

              // const res = await axios({ url, method: 'GET' });
              // dispatch(ListProductSearch(res.data));
              // dispatch(SetPrice(10000));

              const res = await axios({ url: `http://localhost:8080/Product/FindbyPriceLess?price=10000`, method: 'GET' })
              dispatch(ListProductSearch(res.data));
              dispatch(SetPrice(10000))


            }} className="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault9" />
            <label className="form-check-label" htmlFor="flexRadioDefault9">
              <div>
                <h6>Dưới 10.000 đ</h6>
              </div>

            </label>
          </div>

          <div className="form-check">
            <input onClick={async () => {

              // let url = "http://localhost:8080/Product/FindbyPrice?price1=50000&price2=100000";

              // const filters = {
              //   danhmuc,
              //   TextSearch,
              //   isChecked,
              //   sosao
              // };


              // if (filters.danhmuc) {
              //   url += `&category=${filters.danhmuc}`;
              // }
              // if (filters.TextSearch) {
              //   url += `&text=${filters.TextSearch}`;
              // }
              // if (filters.isChecked) {
              //   url += `&promotion=true`;
              // }
              // if (filters.sosao) {
              //   url += `&rating=${filters.sosao}`;
              // }

              // const res = await axios({ url, method: 'GET' })
              // dispatch(ListProductSearch(res.data));
              // dispatch(SetPrice(10000))

              const res = await axios({ url: `http://localhost:8080/Product/FindbyPrice?price1=50000&price2=100000`, method: 'GET' })
              dispatch(ListProductSearch(res.data));
              dispatch(SetPrice(10000))

            }} className="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault7" />
            <label className="form-check-label" htmlFor="flexRadioDefault7">
              <div>
                <h6 > 50.000 ~ 100.000 đ</h6>
              </div>

            </label>
          </div>

          <div className="form-check">
            <input onClick={async () => {

              // let url = "http://localhost:8080/Product/FindbyPriceMore?price=50000";

              // const filters = {
              //   danhmuc,
              //   TextSearch,
              //   isChecked,
              //   sosao
              // };


              // if (filters.danhmuc) {
              //   url += `&category=${filters.danhmuc}`;
              // }
              // if (filters.TextSearch) {
              //   url += `&text=${filters.TextSearch}`;
              // }
              // if (filters.isChecked) {
              //   url += `&promotion=true`;
              // }
              // if (filters.sosao) {
              //   url += `&rating=${filters.sosao}`;
              // }

              // const res = await axios({ url, method: 'GET' })
              // dispatch(ListProductSearch(res.data));
              // dispatch(SetPrice(10000))

              const res = await axios({ url: `http://localhost:8080/Product/FindbyPriceMore?price=50000`, method: 'GET' })
              dispatch(ListProductSearch(res.data));
              dispatch(SetPrice(10000))

            }} className="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault8" />
            <label className="form-check-label" htmlFor="flexRadioDefault8">
              <div>
                <h6> Trên 100.000 đ</h6>
              </div>

            </label>
          </div>

          <form style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="number"
              name='min'
              onKeyDown={(e) => {
                const currentValue = e.target.value;
                const isNumberKey = e.key >= "0" && e.key <= "9";
                const isAllowedKey = ["Backspace", "ArrowLeft", "ArrowRight", "Delete"].includes(e.key);

                // Nếu là phím số và giá trị hiện tại cộng thêm phím nhập sẽ vượt quá 1000, chặn phím nhập
                if (isNumberKey && parseInt(currentValue + e.key, 10) > 1000000) {
                  e.preventDefault();
                }

                // Cho phép các phím điều hướng và xoá
                else if (!isNumberKey && !isAllowedKey) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => setMinPrice(e.target.value)}
              style={{
                width: "90px",
                padding: "5px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                textAlign: "right",
              }}
              placeholder="Min"
            />

            <input
              name='max'
              type="number"
              onKeyDown={(e) => {
                const currentValue = e.target.value;
                const isNumberKey = e.key >= "0" && e.key <= "9";
                const isAllowedKey = ["Backspace", "ArrowLeft", "ArrowRight", "Delete"].includes(e.key);

                // Nếu là phím số và giá trị hiện tại cộng thêm phím nhập sẽ vượt quá 1000, chặn phím nhập
                if (isNumberKey && parseInt(currentValue + e.key, 10) > 1000000) {
                  e.preventDefault();
                }
                // Cho phép các phím điều hướng và xoá
                else if (!isNumberKey && !isAllowedKey) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => setMaxPrice(e.target.value)}
              style={{
                width: "90px",
                padding: "5px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                textAlign: "right",
              }}
              placeholder="Max"
            />


            <button
              onClick={handleSearch}
              style={{

                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              <i class="bi bi-search text-danger fw-bold"></i>
            </button>
          </form>


          <button className='btn btn-outline-dark mt-3 fw-bold text-center' onClick={() => {
            const radioButtons = document.querySelectorAll('input[name="flexRadioDefault"]');
            radioButtons.forEach((radio) => {
              radio.checked = false;
            });

            const radioButtonPrice = document.querySelectorAll('input[name="flexRadioDefault1"]');
            radioButtonPrice.forEach((radio) => {
              radio.checked = false;
            });

            const max = document.querySelector("input[name=max]")
            const min = document.querySelector("input[name=min]")
            min.value = ""
            max.value = ""
            setIsChecked(false)
            dispatch(SetDanhMuc(""))
            dispatch(SetSoSao(""))
            dispatch(SetTEXT(""))
            dispatch(SetPrice(""))
            dispatch(ListProductSearch(Product));
          }} style={{ minWidth: 230 }}>Xóa bộ lọc</button>

        </div>

        <div className="col-12 col-md-9 product-list">
          <ListStore Products={Product} checked={isChecked}></ListStore>
        </div>
      </div>

    </div>
  );
};

export default Search;
