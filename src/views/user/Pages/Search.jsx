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
      const API_SanPham = await axios({ url: 'http://localhost:8080/FindProductTopSell', method: 'GET' });

      SetDanhmuc(API_Danhmuc.data);
      SetProduct(API_SanPham.data)
    } catch (error) {

    }

  }

  const handleSearch = async (e) => {
    e.preventDefault();
    
   
    const Default1 = minPrice;
    const Default2 = maxPrice;

const apiMapWithDiscount = {
"danhmuc_only": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndDanhMucWithDiscount?Default1=${Default1}&Default2=${Default2}&danhmuc=${danhmuc}`,
"text_only": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndTextWithDiscount?Default1=${Default1}&Default2=${Default2}&text=${TextSearch}`,
"sosao_only": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndSosaoWithDiscount?Default1=${Default1}&Default2=${Default2}&sosao=${sosao}`,
"name_sosao": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndTextAndSosaoWithDiscount?Default1=${Default1}&Default2=${Default2}&text=${TextSearch}&sosao=${sosao}`,
"name_danhmuc": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndDanhMucAndTextWithDiscount?Default1=${Default1}&Default2=${Default2}&danhmuc=${danhmuc}&text=${TextSearch}`,
"sosao_danhmuc": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndDanhMucAndSosaoWithDiscount?Default1=${Default1}&Default2=${Default2}&danhmuc=${danhmuc}&sosao=${sosao}`,
"name_sosao_danhmuc": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndDanhMucAndTextAndSosaoWithDiscount?Default1=${Default1}&Default2=${Default2}&danhmuc=${danhmuc}&text=${TextSearch}&sosao=${sosao}`,
"no_filters": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndDiscount?Default1=${Default1}&Default2=${Default2}`
};



const apiMapWithoutDiscount = {
"danhmuc_only": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndDanhMuc?Default1=${Default1}&Default2=${Default2}&danhmuc=${danhmuc}`,
"text_only": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndText?Default1=${Default1}&Default2=${Default2}&text=${TextSearch}`,
"sosao_only": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndSosao?Default1=${Default1}&Default2=${Default2}&sosao=${sosao}`,
"name_sosao": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndTextAndSosao?Default1=${Default1}&Default2=${Default2}&text=${TextSearch}&sosao=${sosao}`,
"name_danhmuc": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndDanhMucAndText?Default1=${Default1}&Default2=${Default2}&danhmuc=${danhmuc}&text=${TextSearch}`,
"sosao_danhmuc": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndDanhMucAndSosao?Default1=${Default1}&Default2=${Default2}&danhmuc=${danhmuc}&sosao=${sosao}`,
"name_sosao_danhmuc": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndDanhMucAndTextAndSosao?Default1=${Default1}&Default2=${Default2}&danhmuc=${danhmuc}&text=${TextSearch}&sosao=${sosao}`,
"no_filters": `http://localhost:8080/Product/FindSanPhamByPriceDefault?Default1=${Default1}&Default2=${Default2}`
};



    const getApiKey = () => {

      if (isChecked) {
        if (TextSearch === '' && sosao === "" && danhmuc !== "") return "danhmuc_only";
        if (TextSearch !== '' && sosao === "" && danhmuc == "") return "text_only";
        if (TextSearch === '' && sosao != "" && danhmuc == "") return "sosao_only";

        if (TextSearch !== '' && sosao !== "" && danhmuc == "") return "name_sosao";
        if (TextSearch == '' && sosao != "" && danhmuc != "") return "sosao_danhmuc";
        if (TextSearch !== '' && sosao == "" && danhmuc != "") return "name_danhmuc";

        if (TextSearch !== '' && sosao !== "" && danhmuc != "") return "name_sosao_danhmuc";
        if (danhmuc === "" && TextSearch === "" && sosao === "") return "no_filters";
      } else {  // Trường hợp không có giảm giá
        if (TextSearch === '' && sosao === "" && danhmuc !== "") return "danhmuc_only";
        if (TextSearch !== '' && sosao === "" && danhmuc == "") return "text_only";
        if (TextSearch === '' && sosao != "" && danhmuc == "") return "sosao_only";

        if (TextSearch !== '' && sosao !== "" && danhmuc == "") return "name_sosao";
        if (TextSearch == '' && sosao != "" && danhmuc != "") return "sosao_danhmuc";
        if (TextSearch !== '' && sosao == "" && danhmuc != "") return "name_danhmuc";

        if (TextSearch !== '' && sosao !== "" && danhmuc != "") return "name_sosao_danhmuc";
        if (danhmuc === "" && TextSearch === "" && sosao === "") return "no_filters";
      }
      return null; // Trường hợp không có điều kiện nào thỏa mãn
    };

    const apiKey = getApiKey(); // Lấy khóa API từ hàm getApiKey

    if (apiKey) {
      try {
        // Chọn đúng apiMap dựa trên trạng thái có giảm giá hay không
        const apiUrl = isChecked ? apiMapWithDiscount[apiKey] : apiMapWithoutDiscount[apiKey];
        console.log("dataaa",apiUrl)
        const res = await axios({
          url: apiUrl, // Sử dụng URL tương ứng
          method: 'GET',
        });

        const productsearch = ListProductSearch(res.data);
        dispatch(productsearch);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
      dispatch(SetPrice(10000))

    }
  


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



                if (isChecked) {
                  if (TextSearch === '' && sosao === "") {
                    // Tìm kiếm sản phẩm theo danh mục
                    try {
                      const res = await axios({
                        url: `http://localhost:8080/Product/FindByCategoryWithDiscount?id=${danhmuc}`,
                        method: 'GET',
                      });
                      const productsearch = ListProductSearch(res.data);
                      SetDanhmucCurrent(danhmuc);
                      dispatch(SetDanhMuc(danhmuc));
                      dispatch(productsearch);
                    } catch (error) {
                      console.error("Lỗi khi tìm kiếm sản phẩm theo danh mục:", error);
                    }
                  }
                  if (TextSearch !== '' && sosao === "") {
                    // Tìm kiếm sản phẩm theo tên
                    try {
                      const res = await axios({
                        url: `http://localhost:8080/Product/FindbyNameandDanhmucWithDiscount2?name=${TextSearch}&id=${danhmuc}`,
                        method: 'GET',
                      });
                      const productsearch = ListProductSearch(res.data);
                      dispatch(productsearch);
                      SetDanhmucCurrent(danhmuc);
                      dispatch(SetDanhMuc(danhmuc))
                    } catch (error) {
                      console.error("Lỗi khi tìm kiếm sản phẩm theo tên:", error);
                    }
                  }
                  if (TextSearch === '' && sosao !== "") {
                    // Tìm kiếm sản phẩm theo số sao
                    try {
                      const res = await axios({
                        url: `http://localhost:8080/Product/FindbySoSaoandDanhmucWithDiscount?sosao=${sosao}&id=${danhmuc}`,
                        method: 'GET',
                      });
                      const productsearch = ListProductSearch(res.data);
                      dispatch(productsearch);
                      SetDanhmucCurrent(danhmuc);
                      dispatch(SetDanhMuc(danhmuc))
                    } catch (error) {
                      console.error("Lỗi khi tìm kiếm sản phẩm theo số sao:", error);
                    }
                  }
                  if (TextSearch !== '' && sosao !== "") {
                    // Tìm kiếm sản phẩm theo tên và số sao
                    try {
                      const res = await axios({
                        url: `http://localhost:8080/Product/FindbySoSaoandDanhmucandNameWithDiscount?name=${TextSearch}&sosao=${sosao}&id=${danhmuc}`,
                        method: 'GET',
                      });
                      const productsearch = ListProductSearch(res.data);
                      dispatch(productsearch);
                      SetDanhmucCurrent(danhmuc);
                      dispatch(SetDanhMuc(danhmuc))
                    } catch (error) {
                      console.error("Lỗi khi tìm kiếm sản phẩm theo tên và số sao:", error);
                    }
                  }
                } else {
                  // Trường hợp: Không giảm giá
                  if (TextSearch === '' && sosao === "") {
                    // Tìm kiếm sản phẩm theo danh mục
                    try {
                      const res = await axios({
                        url: `http://localhost:8080/Product/FindByCategory?id=${danhmuc}`,
                        method: 'GET',
                      });
                      const productsearch = ListProductSearch(res.data);
                      SetDanhmucCurrent(danhmuc);
                      dispatch(SetDanhMuc(danhmuc));
                      dispatch(productsearch);
                    } catch (error) {
                      console.error("Lỗi khi tìm kiếm sản phẩm theo danh mục:", error);
                    }
                  }
                  if (TextSearch !== '' && sosao === "") {
                    // Tìm kiếm sản phẩm theo tên
                    try {
                      const res = await axios({
                        url: `http://localhost:8080/Product/FindbyNameandDanhmuc?name=${TextSearch}&id=${danhmuc}`,
                        method: 'GET',
                      });
                      const productsearch = ListProductSearch(res.data);
                      dispatch(productsearch);
                      SetDanhmucCurrent(danhmuc);
                      dispatch(SetDanhMuc(danhmuc))
                    } catch (error) {
                      console.error("Lỗi khi tìm kiếm sản phẩm theo tên:", error);
                    }
                  }
                  if (TextSearch === '' && sosao !== "") {
                    // Tìm kiếm sản phẩm theo số sao
                    try {
                      const res = await axios({
                        url: `http://localhost:8080/Product/FindbySoSaoandDanhmuc?sosao=${sosao}&id=${danhmuc}`,
                        method: 'GET',
                      });
                      const productsearch = ListProductSearch(res.data);
                      dispatch(productsearch);
                      SetDanhmucCurrent(danhmuc);
                      dispatch(SetDanhMuc(danhmuc))
                    } catch (error) {
                      console.error("Lỗi khi tìm kiếm sản phẩm theo số sao:", error);
                    }
                  }
                  if (TextSearch !== '' && sosao !== "") {
                    // Tìm kiếm sản phẩm theo tên và số sao
                    try {
                      const res = await axios({
                        url: `http://localhost:8080/Product/FindbySoSaoandDanhmucandName?name=${TextSearch}&sosao=${sosao}&id=${danhmuc}`,
                        method: 'GET',
                      });
                      const productsearch = ListProductSearch(res.data);
                      dispatch(productsearch);
                      SetDanhmucCurrent(danhmuc);
                      dispatch(SetDanhMuc(danhmuc))
                    } catch (error) {
                      console.error("Lỗi khi tìm kiếm sản phẩm theo tên và số sao:", error);
                    }
                  }
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

                  if (TextSearch === '' && sosao === "" && danhmuc !== "") {
                    // Tìm kiếm sản phẩm theo danh mục
                    try {
                      const res = await axios({
                        url: `http://localhost:8080/Product/FindByCategoryWithDiscount?id=${danhmuc}`,
                        method: 'GET',
                      });
                      const productsearch = ListProductSearch(res.data);
                      SetDanhmucCurrent(danhmuc);
                      dispatch(SetDanhMuc(danhmuc));
                      dispatch(productsearch);
                    } catch (error) {
                      console.error("Lỗi khi tìm kiếm sản phẩm theo danh mục:", error);
                    }
                  }
                  if (TextSearch !== '' && sosao === "" && danhmuc !== "") {
                    // Tìm kiếm sản phẩm theo tên
                    try {
                      const res = await axios({
                        url: `http://localhost:8080/Product/FindbyNameandDanhmucWithDiscount2?name=${TextSearch}&id=${danhmuc}`,
                        method: 'GET',
                      });
                      const productsearch = ListProductSearch(res.data);
                      dispatch(productsearch);
                    } catch (error) {
                      console.error("Lỗi khi tìm kiếm sản phẩm theo tên:", error);
                    }
                  }
                  if (TextSearch === '' && sosao !== "" && danhmuc !== "") {
                    // Tìm kiếm sản phẩm theo số sao
                    if (sosao == 5) {

                    }
                    try {
                      const res = await axios({
                        url: `http://localhost:8080/Product/FindbySoSaoandDanhmucWithDiscount?sosao=${sosao}&id=${danhmuc}`,
                        method: 'GET',
                      });
                      const productsearch = ListProductSearch(res.data);
                      dispatch(productsearch);
                    } catch (error) {
                      console.error("Lỗi khi tìm kiếm sản phẩm theo số sao:", error);
                    }
                  }
                  if (TextSearch !== '' && sosao !== "" && danhmuc !== "") {
                    // Tìm kiếm sản phẩm theo tên và số sao
                    if (sosao == 5) {

                    }
                    try {
                      const res = await axios({
                        url: `http://localhost:8080/Product/FindbySoSaoandDanhmucandNameWithDiscount?name=${TextSearch}&sosao=${sosao}&id=${danhmuc}`,
                        method: 'GET',
                      });
                      const productsearch = ListProductSearch(res.data);
                      dispatch(productsearch);
                    } catch (error) {
                      console.error("Lỗi khi tìm kiếm sản phẩm theo tên và số sao:", error);
                    }
                  }

                  if (danhmuc == "" && TextSearch == "" && sosao == "") {
                    try {
                      const res = await axios({
                        url: `http://localhost:8080/FindProductDiscount`,
                        method: 'GET',
                      });
                      const productsearch = ListProductSearch(res.data);
                      dispatch(productsearch);
                    } catch (error) {
                      console.error("Lỗi khi tìm kiếm sản phẩm theo tên và số sao:", error);
                    }

                  }
                } else {
                  // Trường hợp: Không giảm giá
                  if (TextSearch === '' && sosao === "" && danhmuc !== "") {
                    // Tìm kiếm sản phẩm theo danh mục
                    try {
                      const res = await axios({
                        url: `http://localhost:8080/Product/FindByCategory?id=${danhmuc}`,
                        method: 'GET',
                      });
                      const productsearch = ListProductSearch(res.data);
                      SetDanhmucCurrent(danhmuc);
                      dispatch(SetDanhMuc(danhmuc));
                      dispatch(productsearch);
                    } catch (error) {
                      console.error("Lỗi khi tìm kiếm sản phẩm theo danh mục:", error);
                    }
                  }
                  if (TextSearch !== '' && sosao === "" && danhmuc !== "") {
                    // Tìm kiếm sản phẩm theo tên
                    try {
                      const res = await axios({
                        url: `http://localhost:8080/Product/FindbyNameandDanhmuc?name=${TextSearch}&id=${danhmuc}`,
                        method: 'GET',
                      });
                      const productsearch = ListProductSearch(res.data);
                      dispatch(productsearch);
                    } catch (error) {
                      console.error("Lỗi khi tìm kiếm sản phẩm theo tên:", error);
                    }
                  }
                  if (TextSearch === '' && sosao !== "" && danhmuc !== "") {
                    // Tìm kiếm sản phẩm theo số sao

                    if (sosao == 5) {

                    }

                    try {
                      const res = await axios({
                        url: `http://localhost:8080/Product/FindbySoSaoandDanhmuc?sosao=${sosao}&id=${danhmuc}`,
                        method: 'GET',
                      });
                      const productsearch = ListProductSearch(res.data);
                      dispatch(productsearch);
                    } catch (error) {
                      console.error("Lỗi khi tìm kiếm sản phẩm theo số sao:", error);
                    }
                  }
                  if (TextSearch !== '' && sosao !== "" && danhmuc !== "") {
                    // Tìm kiếm sản phẩm theo tên và số sao

                    if (sosao == 5) {

                    }

                    try {
                      const res = await axios({
                        url: `http://localhost:8080/Product/FindbySoSaoandDanhmucandName?name=${TextSearch}&sosao=${sosao}&id=${danhmuc}`,
                        method: 'GET',
                      });
                      const productsearch = ListProductSearch(res.data);
                      dispatch(productsearch);
                    } catch (error) {
                      console.error("Lỗi khi tìm kiếm sản phẩm theo tên và số sao:", error);
                    }
                  }

                  if (danhmuc == "" && TextSearch == "" && sosao == "") {
                    try {
                      const res = await axios({
                        url: `http://localhost:8080/FindProductTopSell`,
                        method: 'GET',
                      });
                      const productsearch = ListProductSearch(res.data);
                      dispatch(productsearch);
                    } catch (error) {
                      console.error("Lỗi khi tìm kiếm sản phẩm theo tên và số sao:", error);
                    }

                  }
                }

                // if (checked) {

                //   if (danhmuc === '' && TextSearch !== '' && sosao === "") {
                //     const All = await axios({ url: `http://localhost:8080/Product/FindbyNameWithDiscount?name=${TextSearch}`, method: 'GET' });
                //     dispatch(ListProductSearch(All.data));
                //     console.log("dm rỗng")
                //   }

                //   else if (TextSearch === '' && danhmuc !== '' && sosao === "") {
                //     const All = await axios({ url: `http://localhost:8080/Product/FindbyDanhmucWithDiscount?id=${danhmuc}`, method: 'GET' });
                //     dispatch(ListProductSearch(All.data));
                //     console.log("search rỗng")
                //   }
                //   else if (sosao !== "" && TextSearch === '' && danhmuc === '') {
                //     if (sosao == 5) {
                //       const All = await axios({ url: `http://localhost:8080/Product/findSanPhamBySoSaoEqual5HaveDiscount`, method: 'GET' });
                //       dispatch(ListProductSearch(All.data));
                //     }
                //     else {
                //       const All = await axios({ url: `http://localhost:8080/Product/FindSanPhamBySoSaoHaveDiscount?sosao=${sosao}`, method: 'GET' });
                //       dispatch(ListProductSearch(All.data));
                //     }
                //   }
                //   else if (TextSearch === '' && danhmuc === '' && sosao === '') {
                //     const All = await axios({ url: `http://localhost:8080/FindProductDiscount`, method: 'GET' });
                //     dispatch(ListProductSearch(All.data));
                //     console.log("tất cả rỗng")
                //   }



                //   else {
                //     const All = await axios({ url: `http://localhost:8080/Product/FindbyNameandDanhmucWithDiscount?id=${danhmuc}&name=${TextSearch}`, method: 'GET' });
                //     dispatch(ListProductSearch(All.data));
                //   }

                // }
                // else {

                //   if (danhmuc === '' && TextSearch !== '') {
                //     const All = await axios({ url: `http://localhost:8080/Product/findSanPhamByTenWithOutGG?name=${TextSearch}`, method: 'GET' });
                //     dispatch(ListProductSearch(All.data));
                //     console.log("dm rỗng")
                //   }

                //   else if (TextSearch === '' && danhmuc !== '') {
                //     const All = await axios({ url: `http://localhost:8080/Product/findSanPhamByDandMucAndWithOutGG?id=${danhmuc}`, method: 'GET' });
                //     dispatch(ListProductSearch(All.data));
                //     console.log("search rỗng")
                //   }
                //   else if (TextSearch !== '' && danhmuc !== '') {
                //     const All = await axios({ url: `http://localhost:8080/Product/FindbyNameandDanhmucWithoutDiscount?id=${danhmuc}&name=${TextSearch}`, method: 'GET' });
                //     dispatch(ListProductSearch(All.data));
                //     console.log("search rỗng")
                //   }
                //   else if (TextSearch === '' && danhmuc === '') {
                //     const All = await axios({ url: `http://localhost:8080/FindProductThisWeek`, method: 'GET' });
                //     dispatch(ListProductSearch(All.data));
                //     console.log("rỗng")

                //   }

                // }


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

                findBySoSao(1)

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
                    const res = await axios({ url: `http://localhost:8080/Product/findSanPhamBySoSaoEqual5AndDanhMucHaveDisCount?id=${danhmuc}`, method: "GET" })
                    console.log('res 2 dssad ', danhmuc)
                    console.log('res 2 dssad ', res.data)
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

              const apiMapWithoutDiscount = {
                "danhmuc_only": `http://localhost:8080/Product/FindByPriceLessAndCategory?price=10000&category=${danhmuc}`,
                "text_only": `http://localhost:8080/Product/FindByPriceLessAndText?text=${TextSearch}&price=10000`,
                "sosao_only": `http://localhost:8080/Product/FindByPriceLessAndRating?rating=${sosao}&price=10000`,
                "name_sosao": `http://localhost:8080/Product/FindByPriceLessAndTextAndRating?name=${TextSearch}&rating=${sosao}&id=${danhmuc}&price=10000`,
                "name_danhmuc": `http://localhost:8080/Product/FindByPriceLessAndCategoryAndText?name=${TextSearch}&category=${danhmuc}&price=10000`,
                "sosao_danhmuc": `http://localhost:8080/Product/FindByPriceLessAndCategoryAndRating?rating=${sosao}&id=${danhmuc}&price=10000`,
                "name_sosao_danhmuc": `http://localhost:8080/Product/FindByPriceLessAndCategoryAndTextAndRating?rating=${sosao}&id=${danhmuc}?text=${TextSearch}&price=10000`,
                "no_filters": `http://localhost:8080/Product/FindbyPriceLess?price=10000`,
              };


              const apiMapWithDiscount = {
               "danhmuc_only": `http://localhost:8080/Product/FindByPriceLessAndCategoryAndPromotion?category=${danhmuc}&price=10000`,
                "text_only": `http://localhost:8080/Product/FindByPriceLessAndTextAndPromotion?text=${TextSearch}&price=10000`,
                "sosao_only": `http://localhost:8080/Product/FindByPriceLessAndPromotionAndRating?rating=${sosao}&price=10000`,
                "name_sosao": `http://localhost:8080/Product/FindByPriceLessAndTextAndPromotionAndRating?name=${TextSearch}&rating=${sosao}&id=${danhmuc}&price=10000`,
                "name_danhmuc": `http://localhost:8080/Product/FindByPriceLessAndCategoryAndTextAndPromotion?name=${TextSearch}&category=${danhmuc}&price=10000`,
                "sosao_danhmuc": `http://localhost:8080/Product/FindByPriceLessAndCategoryAndPromotionAndRating?rating=${sosao}&id=${danhmuc}&price=10000`,
                "name_sosao_danhmuc": `http://localhost:8080/Product/FindByAllConditions?rating=${sosao}&id=${danhmuc}?text=${TextSearch}&price=10000`,
                "no_filters": `http://localhost:8080/Product/FindByPriceLessAndPromotion?price=10000`,
              };


              const getApiKey = () => {

                if (isChecked) {
                  if (TextSearch === '' && sosao === "" && danhmuc !== "") return "danhmuc_only";
                  if (TextSearch !== '' && sosao === "" && danhmuc == "") return "text_only";
                  if (TextSearch === '' && sosao != "" && danhmuc == "") return "sosao_only";

                  if (TextSearch !== '' && sosao !== "" && danhmuc == "") return "name_sosao";
                  if (TextSearch == '' && sosao != "" && danhmuc != "") return "sosao_danhmuc";
                  if (TextSearch !== '' && sosao == "" && danhmuc != "") return "name_danhmuc";

                  if (TextSearch !== '' && sosao !== "" && danhmuc != "") return "name_sosao_danhmuc";
                  if (danhmuc === "" && TextSearch === "" && sosao === "") return "no_filters";
                } else { 
                   // Trường hợp không có giảm giá
                  if (TextSearch === '' && sosao === "" && danhmuc !== "") return "danhmuc_only";
                  if (TextSearch !== '' && sosao === "" && danhmuc == "") return "text_only";
                  if (TextSearch === '' && sosao != "" && danhmuc == "") return "sosao_only";

                  if (TextSearch !== '' && sosao !== "" && danhmuc == "") return "name_sosao";
                  if (TextSearch == '' && sosao != "" && danhmuc != "") return "sosao_danhmuc";
                  if (TextSearch !== '' && sosao == "" && danhmuc != "") return "name_danhmuc";

                  if (TextSearch !== '' && sosao !== "" && danhmuc != "") return "name_sosao_danhmuc";
                  if (danhmuc === "" && TextSearch === "" && sosao === "") return "no_filters";
                }
                return null; // Trường hợp không có điều kiện nào thỏa mãn
              };

              const apiKey = getApiKey(); // Lấy khóa API từ hàm getApiKey

              if (apiKey) {
                console.log("dsa",apiKey)
                try {
                  // Chọn đúng apiMap dựa trên trạng thái có giảm giá hay không
                  const apiUrl = isChecked ? apiMapWithDiscount[apiKey] : apiMapWithoutDiscount[apiKey];
                  console.log("dsa",apiUrl)
                  const res = await axios({
                    url: apiUrl, // Sử dụng URL tương ứng
                    method: 'GET',
                  });

                  const productsearch = ListProductSearch(res.data);
                  dispatch(productsearch);
                } catch (error) {
                  console.error("Lỗi khi gọi API:", error);
                }
                dispatch(SetPrice(10000))

              }


            }} className="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault9" />
            <label className="form-check-label" htmlFor="flexRadioDefault9">
              <div>
                <h6>Dưới 10.000 đ</h6>
              </div>

            </label>
          </div>

          <div className="form-check">
            <input onClick={async () => {

              const Default1 = 50000;
              const Default2 = 100000;

const apiMapWithDiscount = {
  "danhmuc_only": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndDanhMucWithDiscount?Default1=${Default1}&Default2=${Default2}&danhmuc=${danhmuc}`,
  "text_only": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndTextWithDiscount?Default1=${Default1}&Default2=${Default2}&text=${TextSearch}`,
  "sosao_only": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndSosaoWithDiscount?Default1=${Default1}&Default2=${Default2}&sosao=${sosao}`,
  "name_sosao": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndTextAndSosaoWithDiscount?Default1=${Default1}&Default2=${Default2}&text=${TextSearch}&sosao=${sosao}`,
  "name_danhmuc": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndDanhMucAndTextWithDiscount?Default1=${Default1}&Default2=${Default2}&danhmuc=${danhmuc}&text=${TextSearch}`,
  "sosao_danhmuc": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndDanhMucAndSosaoWithDiscount?Default1=${Default1}&Default2=${Default2}&danhmuc=${danhmuc}&sosao=${sosao}`,
  "name_sosao_danhmuc": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndDanhMucAndTextAndSosaoWithDiscount?Default1=${Default1}&Default2=${Default2}&danhmuc=${danhmuc}&text=${TextSearch}&sosao=${sosao}`,
  "no_filters": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndDiscount?Default1=${Default1}&Default2=${Default2}`
};



const apiMapWithoutDiscount = {
  "danhmuc_only": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndDanhMuc?Default1=${Default1}&Default2=${Default2}&danhmuc=${danhmuc}`,
  "text_only": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndText?Default1=${Default1}&Default2=${Default2}&text=${TextSearch}`,
  "sosao_only": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndSosao?Default1=${Default1}&Default2=${Default2}&sosao=${sosao}`,
  "name_sosao": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndTextAndSosao?Default1=${Default1}&Default2=${Default2}&text=${TextSearch}&sosao=${sosao}`,
  "name_danhmuc": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndDanhMucAndText?Default1=${Default1}&Default2=${Default2}&danhmuc=${danhmuc}&text=${TextSearch}`,
  "sosao_danhmuc": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndDanhMucAndSosao?Default1=${Default1}&Default2=${Default2}&danhmuc=${danhmuc}&sosao=${sosao}`,
  "name_sosao_danhmuc": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndDanhMucAndTextAndSosao?Default1=${Default1}&Default2=${Default2}&danhmuc=${danhmuc}&text=${TextSearch}&sosao=${sosao}`,
  "no_filters": `http://localhost:8080/Product/FindSanPhamByPriceDefault?Default1=${Default1}&Default2=${Default2}`
};



              const getApiKey = () => {

                if (isChecked) {
                  if (TextSearch === '' && sosao === "" && danhmuc !== "") return "danhmuc_only";
                  if (TextSearch !== '' && sosao === "" && danhmuc == "") return "text_only";
                  if (TextSearch === '' && sosao != "" && danhmuc == "") return "sosao_only";

                  if (TextSearch !== '' && sosao !== "" && danhmuc == "") return "name_sosao";
                  if (TextSearch == '' && sosao != "" && danhmuc != "") return "sosao_danhmuc";
                  if (TextSearch !== '' && sosao == "" && danhmuc != "") return "name_danhmuc";

                  if (TextSearch !== '' && sosao !== "" && danhmuc != "") return "name_sosao_danhmuc";
                  if (danhmuc === "" && TextSearch === "" && sosao === "") return "no_filters";
                } else {  // Trường hợp không có giảm giá
                  if (TextSearch === '' && sosao === "" && danhmuc !== "") return "danhmuc_only";
                  if (TextSearch !== '' && sosao === "" && danhmuc == "") return "text_only";
                  if (TextSearch === '' && sosao != "" && danhmuc == "") return "sosao_only";

                  if (TextSearch !== '' && sosao !== "" && danhmuc == "") return "name_sosao";
                  if (TextSearch == '' && sosao != "" && danhmuc != "") return "sosao_danhmuc";
                  if (TextSearch !== '' && sosao == "" && danhmuc != "") return "name_danhmuc";

                  if (TextSearch !== '' && sosao !== "" && danhmuc != "") return "name_sosao_danhmuc";
                  if (danhmuc === "" && TextSearch === "" && sosao === "") return "no_filters";
                }
                return null; // Trường hợp không có điều kiện nào thỏa mãn
              };

              const apiKey = getApiKey(); // Lấy khóa API từ hàm getApiKey

              if (apiKey) {
                try {
                  // Chọn đúng apiMap dựa trên trạng thái có giảm giá hay không
                  const apiUrl = isChecked ? apiMapWithDiscount[apiKey] : apiMapWithoutDiscount[apiKey];
                  console.log("dataaa",apiUrl)
                  const res = await axios({
                    url: apiUrl, // Sử dụng URL tương ứng
                    method: 'GET',
                  });

                  const productsearch = ListProductSearch(res.data);
                  dispatch(productsearch);
                } catch (error) {
                  console.error("Lỗi khi gọi API:", error);
                }
                dispatch(SetPrice(10000))

              }
            }
            } className="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault7" />
            <label className="form-check-label" htmlFor="flexRadioDefault7">
              <div>
                <h6 > 50.000 ~ 100.000 đ</h6>
              </div>

            </label>
          </div>

          <div className="form-check">
            <input onClick={async () => {



              const apiMapWithDiscount = {
                "danhmuc_only": `http://localhost:8080/Product/FindByPriceLessAndCategory?id=${danhmuc}`,
                "text_only": `http://localhost:8080/Product/FindByPriceLessAndText?name=${TextSearch}`,
                "sosao_only": `http://localhost:8080/Product/FindByPriceLessAndRating?sosao=${sosao}&id=${danhmuc}`,
                "name_sosao": `http://localhost:8080/Product/FindbySoSaoandDanhmucandNameWithDiscount?name=${TextSearch}&sosao=${sosao}&id=${danhmuc}`,
                "name_danhmuc": `http://localhost:8080/Product/FindbyPriceLess`,
                "sosao_danhmuc": `http://localhost:8080/Product/FindbyPriceLess`,
                "name_sosao_danhmuc": `http://localhost:8080/Product/FindbyPriceLess`,
                "no_filters": `http://localhost:8080/Product/FindbyPriceLess`,
              };


              const apiMapWithoutDiscount = {
                "danhmuc_only": `http://localhost:8080/Product/FindByPriceLessAndCategory?id=${danhmuc}`,
                "text_only": `http://localhost:8080/Product/FindByPriceLessAndText?name=${TextSearch}`,
                "sosao_only": `http://localhost:8080/Product/FindByPriceLessAndRating?sosao=${sosao}&id=${danhmuc}`,
                "name_sosao": `http://localhost:8080/Product/FindbySoSaoandDanhmucandNameWithDiscount?name=${TextSearch}&sosao=${sosao}&id=${danhmuc}`,
                "name_danhmuc": `http://localhost:8080/Product/FindbyPriceLess`,
                "sosao_danhmuc": `http://localhost:8080/Product/FindbyPriceLess`,
                "name_sosao_danhmuc": `http://localhost:8080/Product/FindbyPriceLess`,
                "no_filters": `http://localhost:8080/Product/FindbyPriceLess`,
              };


              const getApiKey = () => {

                if (isChecked) {
                  if (TextSearch === '' && sosao === "" && danhmuc !== "") return "danhmuc_only";
                  if (TextSearch !== '' && sosao === "" && danhmuc == "") return "text_only";
                  if (TextSearch === '' && sosao != "" && danhmuc == "") return "sosao_only";

                  if (TextSearch !== '' && sosao !== "" && danhmuc == "") return "name_sosao";
                  if (TextSearch == '' && sosao != "" && danhmuc != "") return "sosao_danhmuc";
                  if (TextSearch !== '' && sosao == "" && danhmuc != "") return "name_danhmuc";

                  if (TextSearch !== '' && sosao !== "" && danhmuc != "") return "name_sosao_danhmuc";
                  if (danhmuc === "" && TextSearch === "" && sosao === "") return "no_filters";
                } else {  // Trường hợp không có giảm giá
                  if (TextSearch === '' && sosao === "" && danhmuc !== "") return "danhmuc_only";
                  if (TextSearch !== '' && sosao === "" && danhmuc == "") return "text_only";
                  if (TextSearch === '' && sosao != "" && danhmuc == "") return "sosao_only";

                  if (TextSearch !== '' && sosao !== "" && danhmuc == "") return "name_sosao";
                  if (TextSearch == '' && sosao != "" && danhmuc != "") return "sosao_danhmuc";
                  if (TextSearch !== '' && sosao == "" && danhmuc != "") return "name_danhmuc";

                  if (TextSearch !== '' && sosao !== "" && danhmuc != "") return "name_sosao_danhmuc";
                  if (danhmuc === "" && TextSearch === "" && sosao === "") return "no_filters";
                }
                return null; // Trường hợp không có điều kiện nào thỏa mãn
              };

              const apiKey = getApiKey(); // Lấy khóa API từ hàm getApiKey

              if (apiKey) {
                try {
                  // Chọn đúng apiMap dựa trên trạng thái có giảm giá hay không
                  const apiUrl = isChecked ? apiMapWithDiscount[apiKey] : apiMapWithoutDiscount[apiKey];

                  const res = await axios({
                    url: apiUrl, // Sử dụng URL tương ứng
                    method: 'GET',
                  });

                  const productsearch = ListProductSearch(res.data);
                  dispatch(productsearch);
                } catch (error) {
                  console.error("Lỗi khi gọi API:", error);
                }
                dispatch(SetPrice(10000))

              }

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
