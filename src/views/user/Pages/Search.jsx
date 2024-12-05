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
  const price = useSelector(state => state.textSearch.price);
  const dispatch = useDispatch();
  const TextSearch = useSelector(state => state.textSearch.Text);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);


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
    dispatch(SetPrice(0))

    const Default1 = minPrice;
    const Default2 = maxPrice;


    const apiMapWithDiscount = {
      "danhmuc_only": `http://localhost:8080/Search/findSanPhamByDiscountDanhmucDefaultOrNot?Default1=${Default1}&Default2=${Default2}&id=${danhmuc}&showDiscount=${isChecked}`,
      "text_only": `http://localhost:8080/Search/findSanPhamByDiscountNameDefaultOrNot?Default1=${Default1}&Default2=${Default2}&name=${TextSearch}&showDiscount=${isChecked}`,
      "sosao_only": `http://localhost:8080/Search/findSanPhamByDiscountSosaoDefaultOrNot?Default1=${Default1}&Default2=${Default2}&rating=${sosao}&showDiscount=${isChecked}`,
      "name_sosao": `http://localhost:8080/Search/findSanPhamByDiscountSosaoNameDefaultOrNot?Default1=${Default1}&Default2=${Default2}&name=${TextSearch}&rating=${sosao}&showDiscount=${isChecked}`,
      "name_danhmuc": `http://localhost:8080/Search/findSanPhamByDiscountNameDanhMucDefaultOrNot?Default1=${Default1}&Default2=${Default2}&id=${danhmuc}&name=${TextSearch}&showDiscount=${isChecked}`,
      "sosao_danhmuc": `http://localhost:8080/Search/findSanPhamByDiscountSosaoDanhMucDefaultOrNot?Default1=${Default1}&Default2=${Default2}&id=${danhmuc}&rating=${sosao}`,
      "name_sosao_danhmuc": `http://localhost:8080/Search/findSanPhamByDiscountSosaoNameDanhMucDefaultOrNot?Default1=${Default1}&Default2=${Default2}&id=${danhmuc}&name=${TextSearch}&rating=${sosao}&showDiscount=${isChecked}`,
      "no_filters": `http://localhost:8080/Search/findSanPhamByDiscountdefaultOrNot?Default1=${Default1}&Default2=${Default2}&showDiscount=${isChecked}`
    };



   



    const getApiKey = () => {

      
        if (TextSearch === '' && sosao === "" && danhmuc !== "") return "danhmuc_only";
        if (TextSearch !== '' && sosao === "" && danhmuc == "") return "text_only";
        if (TextSearch === '' && sosao != "" && danhmuc == "") return "sosao_only";

        if (TextSearch !== '' && sosao !== "" && danhmuc == "") return "name_sosao";
        if (TextSearch == '' && sosao != "" && danhmuc != "") return "sosao_danhmuc";
        if (TextSearch !== '' && sosao == "" && danhmuc != "") return "name_danhmuc";

        if (TextSearch !== '' && sosao !== "" && danhmuc != "") return "name_sosao_danhmuc";
        if (danhmuc === "" && TextSearch === "" && sosao === "") return "no_filters";
      
      return null; // Trường hợp không có điều kiện nào thỏa mãn
    };

    const apiKey = getApiKey(); // Lấy khóa API từ hàm getApiKey

    if (apiKey) {
      try {
        // Chọn đúng apiMap dựa trên trạng thái có giảm giá hay không
        const apiUrl = apiMapWithDiscount[apiKey] 
        console.log("dataaa", apiUrl)
        const res = await axios({
          url: apiUrl, // Sử dụng URL tương ứng
          method: 'GET',
        });

        const productsearch = ListProductSearch(res.data);
        dispatch(productsearch);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }


    }



    const radioButtonPrice = document.querySelectorAll('input[name="flexRadioDefault1"]');
    radioButtonPrice.forEach((radio) => {
      radio.checked = false;
    });

  };
  //////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////

  const findBySoSao = async (sosao) => {


    // Hàm để xây dựng URL động
    const buildUrl = (isChecked, sosao, TextSearch, danhmuc, minPrice, maxPrice) => {
      let baseUrl = 'http://localhost:8080/Search/';

     
        // Trường hợp có cả TextSearch, danh mục, và giá cụ thể
        if (TextSearch && danhmuc && price) {

          if (price == 10000) {
            return `${baseUrl}findSanPhamByDiscountDanhMucNameLess10KOrNot?id=${danhmuc}&rating=${sosao}&name=${TextSearch}&showDiscount=${isChecked}`;
          }
          else {
            return `${baseUrl}FindSanphamByPriceNameDanhMucSosaoMore100k?id=${danhmuc}&rating=${sosao}&name=${TextSearch}&showDiscount=${isChecked}`;
          }


        }
        // Trường hợp có TextSearch, danh mục và khoảng giá (min hoặc max)
        else if (TextSearch && danhmuc && (minPrice || maxPrice)) {



          return `${baseUrl}findSanPhamByDiscountSosaoNameDanhMucDefaultOrNot?id=${danhmuc}&Default1=${minPrice}&Default2=${maxPrice}&name=${TextSearch}&sosao=${sosao}&showDiscount=${isChecked}`;


        }
        // Trường hợp có TextSearch và danh mục
        else if (TextSearch && danhmuc) {

          return `${baseUrl}findSanPhamByDanhMucNameSoSao?rating=${sosao}&id=${danhmuc}&name=${TextSearch}&showDiscount=${isChecked}`;
        }
        //here
        else if (TextSearch && price) {

          if (price == 10000) {
            return `${baseUrl}findSanPhamByDiscountDanhMucSoSaoNameLess10KOrNot?name=${TextSearch}&rating=${sosao}&showDiscount=${isChecked}`;
          }
          else {
            return `${baseUrl}findSanPhamByDiscountSoSaoNameMore100kOrNot?name=${TextSearch}&rating=${sosao}&showDiscount=${isChecked}`;
          }
        }

        else if (danhmuc && price) {

          if (price == 10000) {
            return `${baseUrl}findSanPhamByDiscountDanhMucSoSaoLess10kOrNot?rating=${sosao}&id=${danhmuc}&showDiscount=${isChecked}`;
          }
          else {
            return `${baseUrl}findSanPhamByDiscountDanhMucSoSaoMore100kOrNot?rating=${sosao}&id=${danhmuc}&showDiscount=${isChecked}`;
          }

        }

        else if (TextSearch && minPrice || maxPrice) {

          return `${baseUrl}findSanPhamByDiscountSoSaoNamedefaultOrNot?Default1=${minPrice}&Default2=${maxPrice}&name=${TextSearch}&rating=${sosao}&showDiscount=${isChecked}`;
        }

        else if (danhmuc && minPrice || maxPrice) {

          return `${baseUrl}findSanPhamByDiscountDanhMucSoSaodefaultOrNot?Default1=${minPrice}&Default2=${maxPrice}&id=${danhmuc}&rating=${sosao}&showDiscount=${isChecked}`;
        }
       
        // Trường hợp chỉ có TextSearch
        else if (TextSearch) {

          return `${baseUrl}findSanPhamByDiscountSosaoNameOrNot?rating=${sosao}&name=${TextSearch}&showDiscount=${isChecked}`;
           //here
        }
        // Trường hợp chỉ có danh mục
        else if (danhmuc) {

          return `${baseUrl}findSanPhamByDanhMucAndSosao?rating=${sosao}&id=${danhmuc}&showDiscount=${isChecked}`;
        }
        // Trường hợp chỉ có giá cụ thể
        else if (price) {


          if (price == 10000) {
            return `${baseUrl}FindSanphamByPriceSosaoLess10k?rating=${sosao}&showDiscount=${isChecked}`;
          }
          else {
            return `${baseUrl}FindSanphamByPriceSosaoMore100k?rating=${sosao}&showDiscount=${isChecked}`;
          }


        }
        // Trường hợp có khoảng giá (min hoặc max)
        else if (minPrice || maxPrice) {

          return `${baseUrl}findSanPhamByDiscountSosaoDefaultOrNot?Default1=${minPrice}&Default2=${maxPrice}&rating=${sosao}&showDiscount=${isChecked}`;
        }
        // Trường hợp không có thêm thông tin, chỉ dựa vào số sao
        else {

          return `${baseUrl}FindSanPhamBySoSaoHaveDiscount?rating=${sosao}&showDiscount=${isChecked}`;
        }
      
      

    };

    // Xây dựng URL và thực hiện yêu cầu
    const url = buildUrl(isChecked, sosao, TextSearch, danhmuc, minPrice, maxPrice);
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
    window.scrollTo(0, 0);
    API();
    console.log('sad', isChecked)
    console.log('sad', danhmuc)
    console.log('sad', minPrice)
    console.log('sad', maxPrice)
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

                const FindDanhMucWithDiscount = {
                  "only_danhmuc": `http://localhost:8080/Search/findSanPhamByDanhMuc?id=${danhmuc}&showDiscount=${isChecked}`,
                  "only_text": `http://localhost:8080/Search/findSanPhamByDanhMucAndName?name=${TextSearch}&id=${danhmuc}&showDiscount=${isChecked}`,
                  "only_sosao": `http://localhost:8080/Search/findSanPhamByDanhMucAndSosao?rating=${sosao}&id=${danhmuc}&showDiscount=${isChecked}`,
                  "only_price_More": `http://localhost:8080/Search/findSanPhamByDanhMucMore100K?id=${danhmuc}&showDiscount=${isChecked}`,//1
                  "only_price_Less": `http://localhost:8080/Search/findSanPhamByDanhMucLess10K?id=${danhmuc}&showDiscount=${isChecked}`,//1
                  "only_max_mix": `http://localhost:8080/Search/findSanPhamByDanhMucDefault?id=${danhmuc}&Default1=${minPrice}&Default2=${maxPrice}&showDiscount=${isChecked}`,//2
                  "sosao_text": `http://localhost:8080/Search/findSanPhamByDanhMucNameSoSao?name=${TextSearch}&rating=${sosao}&id=${danhmuc}&showDiscount=${isChecked}`,
                  "text_sosao_price_More": `http://localhost:8080/Search/findSanPhamByDanhMucNameSoSaoMore100k?id=${danhmuc}&rating=${sosao}&name=${TextSearch}&showDiscount=${isChecked}`,//3
                  "text_sosao_price_Less": `http://localhost:8080/Search/findSanPhamByDanhMucNameSoSaoLess10k?id=${danhmuc}&rating=${sosao}&name=${TextSearch}&showDiscount=${isChecked}`,//3
                  "text_sosao_max_mix": `http://localhost:8080/Search/findSanPhamByDanhMucNameSoSaoDefault?id=${danhmuc}&Default1=${minPrice}&Default2=${maxPrice}&name=${TextSearch}&rating=${sosao}&showDiscount=${isChecked}`,//4
                  "text_price_More": `http://localhost:8080/Search/findSanPhamByDanhMucNameMore100k?id=${danhmuc}&name=${TextSearch}&showDiscount=${isChecked}`,//5
                  "text_price_Less": `http://localhost:8080/Search/findSanPhamByDanhMucNameLess10k?id=${danhmuc}&name=${TextSearch}&showDiscount=${isChecked}`,//5
                  "text_max_mix": `http://localhost:8080/Search/findSanPhamByDanhMucNameDefault?id=${danhmuc}&Default1=${minPrice}&Default2=${maxPrice}&name=${TextSearch}&showDiscount=${isChecked}`,//6
                  "sosao_price_More": `http://localhost:8080/Search/findSanPhamByDanhMucSoSaoMore100k?id=${danhmuc}&rating=${sosao}&showDiscount=${isChecked}`,//7
                  "sosao_price_Less": `http://localhost:8080/Search/findSanPhamByDanhMucSoSaoLess10k?id=${danhmuc}&rating=${sosao}&showDiscount=${isChecked}`,//7
                  "sao_max_mix": `http://localhost:8080/Search/findSanPhamByDanhMucSoSaoDefault?id=${danhmuc}&Default1=${minPrice}&Default2=${maxPrice}&rating=${sosao}&showDiscount=${isChecked}`//8

                }

                

                const api_key = () => {

                  if (TextSearch === '' && sosao === "" && price == 0 && minPrice == 0 && maxPrice == 0) return "only_danhmuc"

                  if (TextSearch !== '' && sosao === "" && price == 0 && minPrice == 0 && maxPrice == 0) return "only_text"

                  if (TextSearch === '' && sosao !== "" && price == 0 && minPrice == 0 && maxPrice == 0) return "only_sosao"

                  if (TextSearch !== '' && sosao !== "" && price == 0 && minPrice == 0 && maxPrice == 0) return "sosao_text"

                  if (TextSearch === '' && sosao === "" && price != 0 && minPrice == 0 && maxPrice == 0) {
                    if (price == 100000) {
                     
                      return "only_price_More"
                    }
                    else {
                    
                      return "only_price_Less"
                    }

                  }
                  //
                  if (TextSearch === '' && sosao === "" && price == 0 && minPrice != 0 && maxPrice != 0) return "only_max_mix"
                  // here
                  if (TextSearch !== '' && sosao !== "" && price != 0 && minPrice == 0 && maxPrice == 0) {
                    {
                      if (price == 100000) {
                        return "text_sosao_price_More"
                      }
                      else {
                        return "text_sosao_price_Less"
                      }
                    }
                  }
                  // here
                  if (TextSearch !== '' && sosao !== "" && price == 0 && minPrice != 0 && maxPrice != 0) return "text_sosao_max_mix"
                  //here
                  if (TextSearch !== '' && sosao === "" && price != 0 && minPrice == 0 && maxPrice == 0) {
                    {
                      if (price == 100000) {
                        return "text_price_More"
                      }
                      return "text_price_Less"
                    }
                  }
                  //here
                  if (TextSearch !== '' && sosao === "" && price == 0 && minPrice != 0 && maxPrice != 0) return "text_max_mix"
                  //here
                  if (TextSearch === '' && sosao !== "" && price != 0 && minPrice == 0 && maxPrice == 0) {
                    {
                      if (price == 100000) {
                        return "sosao_price_More"
                      }
                      return "sosao_price_Less"
                    }
                  }

                  if (TextSearch === '' && sosao !== "" && price == 0 && minPrice != 0 && maxPrice != 0) return "sao_max_mix"

                }

                const Getapi = api_key();


                const url = FindDanhMucWithDiscount[Getapi] 
                if (url != null) {
                  console.log("sdsdsadsadsa", Getapi)
                  console.log(url)
                  const res = await axios({ url, method: "GET" });
                  const productsearch = ListProductSearch(res.data);
                  dispatch(productsearch);

                }
                else {
                  console.log("ko có")
                }


                SetDanhmucCurrent(danhmuc);
                dispatch(SetDanhMuc(danhmuc))
              }} key={d.danh_mucId} data-value={`${d.danh_mucId}`} style={danhmuc === d.danh_mucId ? { backgroundColor: 'blue', color: 'white' } : null}  >{d.ten_loaiDM} </li>
            })}

          </ul>
          <h2>Khuyến mãi</h2>
          <div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" checked={isChecked} onChange={async (e) => {
                const checked = e.target.checked;
                setIsChecked(checked);
                const Default1 = minPrice;
                const Default2 = maxPrice;
                const sanphamWithoutDiscount = {
                  "Only_Danhmuc": `http://localhost:8080/Search/findSanPhamByDanhMuc?id=${danhmuc}&showDiscount=${isChecked}`,
                  "Only_Text": `http://localhost:8080/Search/findSanPhamByDiscountWithNameOrNot?name=${TextSearch}&showDiscount=${isChecked}`,
                  "Only_price_More": `http://localhost:8080/Search/findSanPhamByDiscountMore100kOrNot?showDiscount=${isChecked}`,
                  "Only_price_Less": `http://localhost:8080/Search/findSanPhamByDiscountLess10kOrNot?showDiscount=${isChecked}`,
                  "Only_minmax": `http://localhost:8080/Search/findSanPhamByDiscountDefaultOrNot?Default1=${Default1}&Default2=${Default2}`,
                  "Only_Sosao": `http://localhost:8080/Search/findSanPhamByDiscountWithSosaoOrNot?rating=${sosao}&showDiscount=${isChecked}`,
                  "Danhmuc_Text": `http://localhost:8080/Search/findSanPhamByDiscountDanhMucNameOrNot?name=${TextSearch}&id=${danhmuc}&showDiscount=${isChecked}`,
                  "Danhmuc_Text_Sosao": `http://localhost:8080/Search/findSanPhamByDiscountDanhMucSoSaoNameOrNot?name=${TextSearch}&rating=${sosao}&id=${danhmuc}&showDiscount=${isChecked}`,
                  "Danhmuc_Sosao": `http://localhost:8080/Search/findSanPhamByDiscountDanhMucSoSaoOrNot?rating=${sosao}&id=${danhmuc}&showDiscount=${isChecked}`,
                  "Sosao_text": `http://localhost:8080/Search/findSanPhamByDiscountSoSaoNameOrNot?name=${TextSearch}&rating=${sosao}&showDiscount=${isChecked}`,
                  "Danhmuc_Text_Sosao_Price_More": `http://localhost:8080/Search/findSanPhamByDiscountDanhMucSoSaoNameMore100KOrNot?rating=${sosao}&id=${danhmuc}?name=${TextSearch}&showDiscount=${isChecked}`,
                  "Danhmuc_Text_Sosao_Price_Less": `http://localhost:8080/Search/findSanPhamByDiscountDanhMucSoSaoNameLess10KOrNot?rating=${sosao}&id=${danhmuc}?name=${TextSearch}&showDiscount=${isChecked}`,
                  "Danhmuc_Text_Sosao_minmax": `http://localhost:8080/Search/findSanPhamByDiscountDanhMucSoSaoNamedefaultOrNot?Default1=${Default1}&Default2=${Default2}&id=${danhmuc}&name=${TextSearch}&sosao=${sosao}&showDiscount=${isChecked}`,
                  "Danhmuc_Text_Price_More": `http://localhost:8080/Search/findSanPhamByDiscountDanhMucNameMore100KOrNot?name=${TextSearch}&id=${danhmuc}&showDiscount=${isChecked}`,
                  "Danhmuc_Text_Price_Less": `http://localhost:8080/Search/findSanPhamByDiscountDanhMucNameLess10KOrNot?name=${TextSearch}&id=${danhmuc}&showDiscount=${isChecked}`,
                  "Danhmuc_Sosao_Price_More": `http://localhost:8080/Search/findSanPhamByDiscountDanhMucSoSaoMore100kOrNot?rating=${sosao}&id=${danhmuc}&showDiscount=${isChecked}`,
                  "Danhmuc_Sosao_Price_Less": `http://localhost:8080/Search/findSanPhamByDiscountDanhMucSoSaoLess10kOrNot?rating=${sosao}&id=${danhmuc}&showDiscount=${isChecked}`,
                  "Text_Sosao_Price_More": `http://localhost:8080/Search/findSanPhamByDiscountSoSaoNameMore100kOrNot?name=${TextSearch}&rating=${sosao}&id=${danhmuc}&showDiscount=${isChecked}`,
                  "Text_Sosao_Price_Less": `http://localhost:8080/Search/findSanPhamByDiscountSoSaoNameLess10kOrNot?name=${TextSearch}&rating=${sosao}&showDiscount=${isChecked}`,
                  "Danhmuc_Text_minmax": `http://localhost:8080/Search/findSanPhamByDiscountDanhMucNamedefaultOrNot?Default1=${Default1}&Default2=${Default2}&id=${danhmuc}&name=${TextSearch}&showDiscount=${isChecked}`,
                  "Danhmuc_Sosao_minmax": `http://localhost:8080/Search/findSanPhamByDiscountDanhMucSoSaodefaultOrNot?Default1=${Default1}&Default2=${Default2}&id=${danhmuc}&rating=${sosao}&showDiscount=${isChecked}`,
                  "Text_Sosao_minmax": `http://localhost:8080/Search/findSanPhamByDiscountSoSaoNamedefaultOrNot?Default1=${Default1}&Default2=${Default2}&name=${TextSearch}&rating=${sosao}&showDiscount=${isChecked}`,
                  "Text_minmax": `http://localhost:8080/Search/findSanPhamByDiscountNamedefaultOrNot?Default1=${Default1}&Default2=${Default2}&name=${TextSearch}&showDiscount=${isChecked}`,
                  "Danhmuc_minmax": `http://localhost:8080/Search/findSanPhamByDiscountDanhMucdefaultOrNot?Default1=${Default1}&Default2=${Default2}&id=${danhmuc}&showDiscount=${isChecked}`,
                  // thêm danh mục - price và text-price less more
                  "Danhmuc_price_More": `http://localhost:8080/Search/findSanPhamByDiscountDanhMucMore100kOrNot?id=${danhmuc}&showDiscount=${isChecked}`,
                  "Danhmuc_price_Less": `http://localhost:8080/Search/findSanPhamByDiscountDanhMucLess10kOrNot?id=${danhmuc}&showDiscount=${isChecked}`,
                  "Text_price_Less": `http://localhost:8080/Search/findSanPhamByDiscountNameMore100KOrNot?name=${TextSearch}&showDiscount=${isChecked}`,
                  "Text_price_More": `http://localhost:8080/Search/findSanPhamByDiscountNameLess10KOrNot?name=${TextSearch}&showDiscount=${isChecked}`,
                  
                  
                  "no_filters": "http://localhost:8080/Search/findSanPhamByDiscountOrNot?showDiscount=${isChecked}"

                }

               

                const GETapi = () => {
                  if (TextSearch == "" && sosao == "" && danhmuc == "" && price == 0 && minPrice == 0 && maxPrice == 0) {
                    return "no_filters";
                  }
                  if (TextSearch != "" && sosao == "" && danhmuc == "" && price == 0 && minPrice == 0 && maxPrice == 0) {
                    return "Only_Text";
                  }
                  if (TextSearch == "" && sosao != "" && danhmuc == "" && price == 0 && minPrice == 0 && maxPrice == 0) {
                    return "Only_Sosao";
                  }
                  if (TextSearch == "" && sosao == "" && danhmuc != "" && price == 0 && minPrice == 0 && maxPrice == 0) {
                    return "Only_Danhmuc";
                  }
                  if (TextSearch == "" && sosao == "" && danhmuc == "" && price != 0 && minPrice == 0 && maxPrice == 0) {
                    if (price == 10000)
                      return "Only_price_Less";
                    else
                      return "Only_price_More";
                  }
                  if (TextSearch == "" && sosao == "" && danhmuc == "" && price == 0 && minPrice != 0 && maxPrice != 0) {
                    return "Only_minmax";
                  }
                  if (TextSearch != "" && sosao == "" && danhmuc != "" && price == 0 && minPrice == 0 && maxPrice == 0) {
                    return "Danhmuc_Text";
                  }
                  if (TextSearch != "" && sosao != "" && danhmuc != "" && price == 0 && minPrice == 0 && maxPrice == 0) {
                    return "Danhmuc_Text_Sosao";
                  }

                  if (TextSearch == "" && sosao != "" && danhmuc != "" && price == 0 && minPrice == 0 && maxPrice == 0) {
                    return "Danhmuc_Sosao";
                  }
                  if (TextSearch != "" && sosao != "" && danhmuc == "" && price == 0 && minPrice == 0 && maxPrice == 0) {
                    return "Sosao_text";
                  }
                  if (TextSearch != "" && sosao != "" && danhmuc != "" && price != 0 && minPrice == 0 && maxPrice == 0) {

                    if (price == 10000)
                      return "Danhmuc_Text_Sosao_Price_Less";
                    else
                      return "Danhmuc_Text_Sosao_Price_More";
                  }
                  if (TextSearch != "" && sosao != "" && danhmuc != "" && price == 0 && minPrice != 0 && maxPrice != 0) {
                    return "Danhmuc_Text_Sosao_minmax";
                  }
                  if (TextSearch != "" && sosao == "" && danhmuc != "" && price != 0 && minPrice == 0 && maxPrice == 0) {

                    if (price == 10000) {
                      return "Danhmuc_Text_Price_Less"
                    }
                    else {
                      return "Danhmuc_Text_Price_More"
                    }
                  }
                  if (TextSearch == "" && sosao != "" && danhmuc != "" && price != 0 && minPrice == 0 && maxPrice == 0) {
                    if (price == 10000) {
                      return "Danhmuc_Sosao_Price_Less"
                    }
                    else {
                      return "Danhmuc_Sosao_Price_More"
                    }

                  }
                  if (TextSearch != "" && sosao != "" && danhmuc == "" && price != 0 && minPrice == 0 && maxPrice == 0) {
                    if (price == 10000) {
                      return "Text_Sosao_Price_Less"
                    }
                    else {
                      return "Text_Sosao_Price_More"
                    }
                    //
                  }
                  if (TextSearch != "" && sosao == "" && danhmuc != "" && price == 0 && minPrice != 0 && maxPrice != 0) {
                    return "Danhmuc_Text_minmax";
                  }
                  if (TextSearch == "" && sosao != "" && danhmuc != "" && price == 0 && minPrice != 0 && maxPrice != 0) {
                    return "Danhmuc_Sosao_minmax";
                  }
                  if (TextSearch != "" && sosao != "" && danhmuc == "" && price == 0 && minPrice != 0 && maxPrice != 0) {
                    return "Text_Sosao_minmax";
                  }
                  if (TextSearch != "" && sosao == "" && danhmuc == "" && price == 0 && minPrice != 0 && maxPrice != 0) {
                    return "Text_minmax";
                  }
                  if (TextSearch == "" && sosao == "" && danhmuc != "" && price == 0 && minPrice != 0 && maxPrice != 0) {
                    return "Danhmuc_minmax";
                  }

                  if (TextSearch == "" && sosao == "" && danhmuc != "" && price != 0 && minPrice == 0 && maxPrice == 0) {
                    if (price == 10000) {
                      return "Danhmuc_price_Less";
                    }
                    else {
                      return "Danhmuc_price_More";
                    }
                  }

                  if (TextSearch != "" && sosao == "" && danhmuc == "" && price != 0 && minPrice == 0 && maxPrice == 0) {
                    if (price == 10000) {
                      return "Text_price_Less";
                    }
                    else {
                      return "Text_price_More";
                    }
                  }


                }

                const key = GETapi();

                if (key != null) {
                  const url =  sanphamWithoutDiscount[key];
                  console.log("url", url)
                  console.log("url", key)
                  const res = await axios({ url, method: "GET" });
                  const productsearch = ListProductSearch(res.data);
                  dispatch(productsearch);
                }
                else {
                  console.log("ko cossssssssss")
                }


              }




              }
                defaultValue id="flexCheckDefault" />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Có khuyến mãi
              </label>
            </div>

          </div>
          <h2>Đánh giá</h2>
          <div>
            <div className="form-check">
              <input checked={sosao == 1} onChange={async () => {
                // start 1

                findBySoSao(1)

                // end 1
              }} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                <i className="bi bi-star-fill text-warning"></i>

              </label>
            </div>
            <div className="form-check">
              <input checked={sosao == 2} onChange={async () => {


                findBySoSao(2)

                // end 2

              }} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-fill text-warning"></i>

              </label>
            </div>
            <div className="form-check">
              <input checked={sosao == 3} onChange={async () => {

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
              <input checked={sosao == 4} onChange={async () => {
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
              <input checked={sosao == 5} onChange={async () => {
                findBySoSao(5)

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
                "danhmuc_only": `http://localhost:8080/Search/FindSanphamByPriceDanhmucLess10k?id=${danhmuc}&showDiscount=${isChecked}`,
                "text_only": `http://localhost:8080/Search/FindSanphamByPriceNameLess10k?name=${TextSearch}&showDiscount=${isChecked}`,
                "sosao_only": `http://localhost:8080/Search/FindSanphamByPriceSosaoLess10k?rating=${sosao}&showDiscount=${isChecked}`,
                "name_sosao_danhmuc": `http://localhost:8080/Search/FindSanphamByPriceNameDanhMucSosaoLess10k?name=${TextSearch}&rating=${sosao}?id=${danhmuc}&showDiscount=${isChecked}`,
                "name_danhmuc": `http://localhost:8080/Search/FindSanphamByPriceNameDanhMucSosaoLess10k?name=${TextSearch}&id=${danhmuc}&showDiscount=${isChecked}`,
                "sosao_danhmuc": `http://localhost:8080/Search/FindSanphamByPriceDanhMucSosaoLESS10k?rating=${sosao}&id=${danhmuc}&showDiscount=${isChecked}`,
                "name_sosao": `http://localhost:8080/Search/FindSanphamByPriceNameSosaoLESS10k?rating=${sosao}&id=${danhmuc}&showDiscount=${isChecked}`,
                "no_filters": `http://localhost:8080/Search/FindSanphamByPriceLess10k?showDiscount=${isChecked}`,
              };

              const getApiKey = () => {


                if (TextSearch === '' && sosao === "" && danhmuc !== "") return "danhmuc_only";
                if (TextSearch !== '' && sosao === "" && danhmuc == "") return "text_only";
                if (TextSearch === '' && sosao != "" && danhmuc == "") return "sosao_only";

                if (TextSearch !== '' && sosao !== "" && danhmuc == "") return "name_sosao";
                if (TextSearch == '' && sosao != "" && danhmuc != "") return "sosao_danhmuc";
                if (TextSearch !== '' && sosao == "" && danhmuc != "") return "name_danhmuc";

                if (TextSearch !== '' && sosao !== "" && danhmuc != "") return "name_sosao_danhmuc";
                if (danhmuc === "" && TextSearch === "" && sosao === "") return "no_filters";

                return null;
              };

              const apiKey = getApiKey();

              if (apiKey) {
                console.log("dsa", apiKey)
                try {
                  // Chọn đúng apiMap dựa trên trạng thái có giảm giá hay không
                  const apiUrl = apiMapWithoutDiscount[apiKey];
                  console.log("dsa", apiUrl)
                  const res = await axios({
                    url: apiUrl, // Sử dụng URL tương ứng
                    method: 'GET',
                  });

                  const productsearch = ListProductSearch(res.data);
                  dispatch(productsearch);
                } catch (error) {
                  console.error("Lỗi khi gọi API:", error);
                }
                setMaxPrice(0)
                setMinPrice(0)
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
                "danhmuc_only": `http://localhost:8080/Search/findSanPhamByDiscountDanhmucDefaultOrNot?Default1=${Default1}&Default2=${Default2}&id=${danhmuc}&showDiscount=${isChecked}`,
                "text_only": `http://localhost:8080/Search/findSanPhamByDiscountNameDefaultOrNot?Default1=${Default1}&Default2=${Default2}&name=${TextSearch}&showDiscount=${isChecked}`,
                "sosao_only": `http://localhost:8080/Search/findSanPhamByDiscountSosaoDefaultOrNot?Default1=${Default1}&Default2=${Default2}&rating=${sosao}&showDiscount=${isChecked}`,
                "name_sosao": `http://localhost:8080/Search/findSanPhamByDiscountSosaoNameDefaultOrNot?Default1=${Default1}&Default2=${Default2}&name=${TextSearch}&rating=${sosao}&showDiscount=${isChecked}`,
                "name_danhmuc": `http://localhost:8080/Search/findSanPhamByDiscountNameDanhMucDefaultOrNot?Default1=${Default1}&Default2=${Default2}&id=${danhmuc}&name=${TextSearch}&showDiscount=${isChecked}`,
                "sosao_danhmuc": `http://localhost:8080/Search/findSanPhamByDiscountSosaoDanhMucDefaultOrNot?Default1=${Default1}&Default2=${Default2}&id=${danhmuc}&rating=${sosao}`,
                "name_sosao_danhmuc": `http://localhost:8080/Search/findSanPhamByDiscountSosaoNameDanhMucDefaultOrNot?Default1=${Default1}&Default2=${Default2}&id=${danhmuc}&name=${TextSearch}&rating=${sosao}&showDiscount=${isChecked}`,
                "no_filters": `http://localhost:8080/Search/findSanPhamByDiscountdefaultOrNot?Default1=${Default1}&Default2=${Default2}&showDiscount=${isChecked}`
              };



             


              const getApiKey = () => {

              
                  if (TextSearch === '' && sosao === "" && danhmuc !== "") return "danhmuc_only";
                  if (TextSearch !== '' && sosao === "" && danhmuc == "") return "text_only";
                  if (TextSearch === '' && sosao != "" && danhmuc == "") return "sosao_only";

                  if (TextSearch !== '' && sosao !== "" && danhmuc == "") return "name_sosao";
                  if (TextSearch == '' && sosao != "" && danhmuc != "") return "sosao_danhmuc";
                  if (TextSearch !== '' && sosao == "" && danhmuc != "") return "name_danhmuc";

                  if (TextSearch !== '' && sosao !== "" && danhmuc != "") return "name_sosao_danhmuc";
                  if (danhmuc === "" && TextSearch === "" && sosao === "") return "no_filters";
                
                return null; 
              };

              const apiKey = getApiKey(); 

              if (apiKey) {
                try {
                  
                  const apiUrl =  apiMapWithDiscount[apiKey] 
                  console.log("dataaa", apiUrl)
                  const res = await axios({
                    url: apiUrl, // Sử dụng URL tương ứng
                    method: 'GET',
                  });

                  const productsearch = ListProductSearch(res.data);
                  dispatch(productsearch);
                } catch (error) {
                  console.error("Lỗi khi gọi API:", error);
                }
                setMinPrice(50000)
                setMaxPrice(100000)

                dispatch(SetPrice(0))
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



              const apiMapWithoutDiscount = {
                "danhmuc_only": `http://localhost:8080/Search/FindSanphamByPriceDanhmucMore100k?id=${danhmuc}&showDiscount=${isChecked}`,
                "text_only": `http://localhost:8080/Search/FindSanphamByPriceNameMore100k2?name=${TextSearch}&showDiscount=${isChecked}`,
                "sosao_only": `http://localhost:8080/Search/FindSanphamByPriceSosaoMore100k?rating=${sosao}&showDiscount=${isChecked}`,
                "name_sosao": `http://localhost:8080/Search/FindSanphamByPriceNameSosaoMore100k?name=${TextSearch}&rating=${sosao}&showDiscount=${isChecked}`,
                "name_danhmuc": `http://localhost:8080/Search/FindSanphamByPriceNameMore100k?name=${TextSearch}&id=${danhmuc}&showDiscount=${isChecked}`,
                "sosao_danhmuc": `http://localhost:8080/Search/FindSanphamByPriceDanhMucSosaoMore100k?rating=${sosao}&category=${danhmuc}&showDiscount=${isChecked}`,
                "name_sosao_danhmuc": `http://localhost:8080/Search/FindSanphamByPriceNameDanhMucSosaoMore100k?rating=${sosao}&id=${danhmuc}&name=${TextSearch}&showDiscount=${isChecked}`,
                "no_filters": `http://localhost:8080/Search/FindSanphamByPriceMore100k?showDiscount=${isChecked}`,
              };


             


              const getApiKey = () => {

              
                  if (TextSearch === '' && sosao === "" && danhmuc !== "") return "danhmuc_only";
                  if (TextSearch !== '' && sosao === "" && danhmuc == "") return "text_only";
                  if (TextSearch === '' && sosao != "" && danhmuc == "") return "sosao_only";

                  if (TextSearch !== '' && sosao !== "" && danhmuc == "") return "name_sosao";
                  if (TextSearch == '' && sosao != "" && danhmuc != "") return "sosao_danhmuc";
                  if (TextSearch !== '' && sosao == "" && danhmuc != "") return "name_danhmuc";

                  if (TextSearch !== '' && sosao !== "" && danhmuc != "") return "name_sosao_danhmuc";
                  if (danhmuc === "" && TextSearch === "" && sosao === "") return "no_filters";
                
                return null; // Trường hợp không có điều kiện nào thỏa mãn
              };

              const apiKey = getApiKey(); // Lấy khóa API từ hàm getApiKey

              if (apiKey) {
                try {
                  // Chọn đúng apiMap dựa trên trạng thái có giảm giá hay không
                  const apiUrl =   apiMapWithoutDiscount[apiKey];

                  const res = await axios({
                    url: apiUrl, // Sử dụng URL tương ứng
                    method: 'GET',
                  });

                  const productsearch = ListProductSearch(res.data);
                  dispatch(productsearch);
                } catch (error) {
                  console.error("Lỗi khi gọi API:", error);
                }
                setMaxPrice(0)
                setMinPrice(0)

                dispatch(SetPrice(100000))

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
              <i className="bi bi-search text-danger fw-bold"></i>
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
            setMaxPrice(0)
            setMinPrice(0)
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
