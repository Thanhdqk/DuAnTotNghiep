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
    window.scrollTo(0, 0);
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

                const FindDanhMucWithDiscount = {
                  "only_danhmuc": `http://localhost:8080/Product/FindByCategoryWithDiscount?id=${danhmuc}`,
                  "only_text": `http://localhost:8080/Product/FindbyNameandDanhmucWithDiscount2?name=${TextSearch}&id=${danhmuc}`,
                  "only_sosao": `http://localhost:8080/Product/FindbySoSaoandDanhmucWithDiscount?sosao=${sosao}&id=${danhmuc}`,
                  "only_price_More": `http://localhost:8080/Product/FindByPriceMore100kAndCategoryAndPromotion?category=${danhmuc}&price=100000`,//1
                  "only_price_Less": `http://localhost:8080/Product/FindByPriceLessAndCategory?category=${danhmuc}&price=10000`,//1
                  "only_max_mix": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndDanhMucWithDiscount?danhmuc=${danhmuc}&Default1=${minPrice}&Default2=${maxPrice}`,//2
                  "sosao_text": `http://localhost:8080/Product/FindbySoSaoandDanhmucandNameWithDiscount?name=${TextSearch}&sosao=${sosao}&id=${danhmuc}`,
                  "text_sosao_price_More": `http://localhost:8080/Product/FindByAllConditionsMore100k?category=${danhmuc}&price=100000&rating=${sosao}&name=${TextSearch}`,//3
                  "text_sosao_price_Less": `http://localhost:8080/Product/FindByAllConditions?category=${danhmuc}&price=10000&rating=${sosao}&name=${TextSearch}`,//3
                  "text_sosao_max_mix": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndDanhMucAndTextAndSosaoWithDiscount?danhmuc=${danhmuc}&Default1=${minPrice}&Default2=${maxPrice}&text=${TextSearch}&sosao=${sosao}`,//4
                  "text_price_More": `http://localhost:8080/Product/FindByPriceMore100kAndCategoryAndTextAndPromotion?category=${danhmuc}&price=100000&name=${TextSearch}`,//5
                  "text_price_Less": `http://localhost:8080/Product/FindByPriceLessAndCategoryAndTextAndPromotion?category=${danhmuc}&price=10000&name=${TextSearch}`,//5
                  "text_max_mix": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndDanhMucAndTextWithDiscount?danhmuc=${danhmuc}&Default1=${minPrice}&Default2=${maxPrice}&text=${TextSearch}`,//6
                  "sosao_price_More": `http://localhost:8080/Product/FindByPriceMore100kAndCategoryAndPromotionAndRating?category=${danhmuc}&price=100000&rating=${sosao}`,//7
                  "sosao_price_Less": `http://localhost:8080/Product/FindByPriceLessAndCategoryAndPromotionAndRating?category=${danhmuc}&price=10000&rating=${sosao}`,//7
                  "sao_max_mix": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndDanhMucAndSosaoWithDiscount?danhmuc=${danhmuc}&Default1=${minPrice}&Default2=${maxPrice}&sosao=${sosao}`//8

                }

                const FindDanhMucWithoutDiscount = {
                  "only_danhmuc": `http://localhost:8080/Product/FindByCategory?id=${danhmuc}`,
                  "only_text": `http://localhost:8080/Product/FindbyNameandDanhmuc?name=${TextSearch}&id=${danhmuc}`,
                  "only_sosao": `http://localhost:8080/Product/FindbySoSaoandDanhmuc?sosao=${sosao}&id=${danhmuc}`,
                  "only_price_More": `http://localhost:8080/Product/FindByPriceMore100kAndCategory?category=${danhmuc}&price=100000`,//1
                  "only_price_Less": `http://localhost:8080/Product/FindByPriceLessAndCategory?category=${danhmuc}&price=10000`,//1
                  "only_max_mix": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndDanhMuc?danhmuc=${danhmuc}&Default1=${minPrice}&Default2=${maxPrice}`,//10
                  "sosao_text": `http://localhost:8080/Product/FindbySoSaoandDanhmucandName?name=${TextSearch}&sosao=${sosao}&id=${danhmuc}`,
                  "text_sosao_price_More": `http://localhost:8080/Product/FindByPriceMore100kAndCategoryAndTextAndRating?category=${danhmuc}&price=100000&rating=${sosao}&name=${TextSearch}`,//3
                  "text_sosao_price_Less": `http://localhost:8080/Product/FindByPriceLessAndCategoryAndTextAndRating?category=${danhmuc}&price=10000&rating=${sosao}&name=${TextSearch}`,//3
                  "text_sosao_max_mix": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndDanhMucAndTextAndSosao?danhmuc=${danhmuc}&Default1=${minPrice}&Default2=${maxPrice}&text=${TextSearch}&sosao=${sosao}`,//12
                  "text_price_More": `http://localhost:8080/Product/FindByPriceMore100kAndCategoryAndText?category=${danhmuc}&price=100000&name=${TextSearch}`,//5
                  "text_price_Less": `http://localhost:8080/Product/FindByPriceLessAndCategoryAndText?category=${danhmuc}&price=10000&name=${TextSearch}`,//5
                  "text_max_mix": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndDanhMucAndText?danhmuc=${danhmuc}&Default1=${minPrice}&Default2=${maxPrice}&text=${TextSearch}`,//14
                  "sosao_price_More": `http://localhost:8080/Product/FindByPriceMore100kAndCategoryAndRating?category=${danhmuc}&price=100000&rating=${sosao}`,//7
                  "sosao_price_Less": `http://localhost:8080/Product/FindByPriceLessAndCategoryAndRating?category=${danhmuc}&price=10000&rating=${sosao}`,//7
                  "sao_max_mix": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndDanhMucAndSosao?danhmuc=${danhmuc}&Default1=${minPrice}&Default2=${maxPrice}&sosao=${sosao}`//16

                }

                const api_key = () => {

                  if (TextSearch === '' && sosao === "" && price == 0 && minPrice == 0 && maxPrice == 0) return "only_danhmuc"

                  if (TextSearch !== '' && sosao === "" && price == 0 && minPrice == 0 && maxPrice == 0) return "only_text"

                  if (TextSearch === '' && sosao !== "" && price == 0 && minPrice == 0 && maxPrice == 0) return "only_sosao"

                  if (TextSearch !== '' && sosao !== "" && price == 0 && minPrice == 0 && maxPrice == 0) return "sosao_text"

                  if (TextSearch === '' && sosao === "" && price != 0 && minPrice == 0 && maxPrice == 0) {
                    if (price == 100000) {
                      console.log("saddđsdsadsadá")
                      return "only_price_More"
                    }
                    else {
                      console.log("saddđsdsadsadá2")
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


                const url = isChecked ? FindDanhMucWithDiscount[Getapi] : FindDanhMucWithoutDiscount[Getapi];
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
                  "Only_Danhmuc": `http://localhost:8080/Product/FindByCategory?id=${danhmuc}`,
                  "Only_Text": `http://localhost:8080/Product/FindbyNameWithDiscount?name=${TextSearch}`,
                  "Only_price": `http://localhost:8080/http://localhost:8080/Product/FindbyPriceLess?price=10000`,
                  "Only_minmax": `http://localhost:8080/Product/FindSanPhamByPriceDefault?Default1=${Default1}&Default2=${Default2}`,
                  "Only_Sosao": `http://localhost:8080/`,
                  "Danhmuc_Text": `http://localhost:8080/Product/FindbyNameandDanhmuc?name=${TextSearch}&id=${danhmuc}`,
                  "Danhmuc_Text_Sosao": `http://localhost:8080/Product/FindbySoSaoandDanhmucandName?name=${TextSearch}&sosao=${sosao}&id=${danhmuc}`,
                  "Danhmuc_Sosao": `http://localhost:8080/Product/FindbySoSaoandDanhmuc?name=${TextSearch}&id=${danhmuc}`,
                  "Sosao_text": `http://localhost:8080/Product/FindByPriceLessAndTextAndRating?name=${TextSearch}&rating=${sosao}&category=${danhmuc}&price=10000`,
                  "Danhmuc_Text_Sosao_Price": `http://localhost:8080/Product/FindbySoSaoandDanhmucandName?name=${TextSearch}&sosao=${sosao}&id=${danhmuc}&price=10000`,
                  "Danhmuc_Text_Sosao_minmax": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndDanhMucAndTextAndSosao?Default1=${Default1}&Default2=${Default2}&danhmuc=${danhmuc}&text=${TextSearch}&sosao=${sosao}`,
                  "Danhmuc_Text_Price": `http://localhost:8080/Product/FindByPriceLessAndCategoryAndText?name=${TextSearch}&category=${danhmuc}&price=10000`,
                  "Danhmuc_Sosao_Price": `http://localhost:8080/Product/FindByPriceLessAndCategoryAndRating?rating=${sosao}&category=${danhmuc}&price=10000`,
                  "Text_Sosao_Price": `http://localhost:8080/Product/FindByPriceLessAndTextAndRating?name=${TextSearch}&rating=${sosao}&category=${danhmuc}&price=10000`,
                  "Danhmuc_Text_minmax": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndDanhMucAndText?Default1=${Default1}&Default2=${Default2}&danhmuc=${danhmuc}&text=${TextSearch}`,
                  "Danhmuc_Sosao_minmax": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndDanhMucAndSosao?Default1=${Default1}&Default2=${Default2}&danhmuc=${danhmuc}&sosao=${sosao}`,
                  "Text_Sosao_minmax": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndTextAndSosao?Default1=${Default1}&Default2=${Default2}&text=${TextSearch}&sosao=${sosao}`,
                  "Text_minmax": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndText?Default1=${Default1}&Default2=${Default2}&text=${TextSearch}`,
                  "Danhmuc_minmax": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndDanhMuc?Default1=${Default1}&Default2=${Default2}&danhmuc=${danhmuc}`,
                  "no_filters": "http://localhost:8080/FindProductTopSell"
                }

                const sanphamWithDiscount = {
                  "Only_Danhmuc": `http://localhost:8080/Product/FindByCategoryWithDiscount?id=${danhmuc}`,
                  "Only_Text": `http://localhost:8080/Product/FindbyNameWithDiscount?name=${TextSearch}`,
                  "Only_price": `http://localhost:8080/Product/FindByPriceLessAndPromotion?price=10000`,
                  "Only_minmax": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndDiscount?Default1=${Default1}&Default2=${Default2}`,
                  "Only_Sosao": `http://localhost:8080/Product/FindbySosao?sosao=${sosao}`,
                  "Danhmuc_Text": `http://localhost:8080/Product/FindbyNameandDanhmucWithDiscount?name=${TextSearch}&id=${danhmuc}`,
                  "Danhmuc_Text_Sosao": `http://localhost:8080/Product/FindbySoSaoandDanhmucandName?name=${TextSearch}&sosao=${sosao}&id=${danhmuc}`,
                  "Danhmuc_Sosao": `http://localhost:8080/Product/FindbySoSaoandDanhmucWithDiscount?sosao=${sosao}&id=${danhmuc}`,
                  "Sosao_text": `http://localhost:8080/`,
                  "Danhmuc_Text_Sosao_Price": `http://localhost:8080/Product/FindByAllConditions?rating=${sosao}&category=${danhmuc}?text=${TextSearch}&price=10000`,
                  "Danhmuc_Text_Sosao_minmax": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndDanhMucAndTextAndSosaoWithDiscount?Default1=${Default1}&Default2=${Default2}&danhmuc=${danhmuc}&text=${TextSearch}&sosao=${sosao}`,
                  "Danhmuc_Text_Price": `http://localhost:8080/Product/FindByPriceLessAndCategoryAndTextAndPromotion?name=${TextSearch}&category=${danhmuc}&price=10000`,
                  "Danhmuc_Sosao_Price": `http://localhost:8080/Product/FindByPriceLessAndCategoryAndPromotionAndRating?rating=${sosao}&category=${danhmuc}&price=10000`,
                  "Text_Sosao_Price": `http://localhost:8080/Product/FindByPriceLessAndTextAndPromotionAndRating?name=${TextSearch}&rating=${sosao}&price=10000`,
                  "Danhmuc_Text_minmax": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndDanhMucAndTextWithDiscount?Default1=${Default1}&Default2=${Default2}&danhmuc=${danhmuc}&text=${TextSearch}`,
                  "Danhmuc_Sosao_minmax": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndDanhMucAndSosaoWithDiscount?Default1=${Default1}&Default2=${Default2}&danhmuc=${danhmuc}&sosao=${sosao}`,
                  "Text_Sosao_minmax": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndTextAndSosaoWithDiscount?Default1=${Default1}&Default2=${Default2}&text=${TextSearch}&sosao=${sosao}`,
                  "Text_minmax": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndTextWithDiscount?Default1=${Default1}&Default2=${Default2}&text=${TextSearch}`,
                  "Danhmuc_minmax": `http://localhost:8080/Product/FindSanPhamByPriceDefaultAndDanhMucWithDiscount?Default1=${Default1}&Default2=${Default2}&danhmuc=${danhmuc}`,
                  "no_filters": "http://localhost:8080/FindProductDiscount"
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
                    return "Only_price";
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
                    return "Danhmuc_Text_Sosao_Price";
                  }
                  if (TextSearch != "" && sosao != "" && danhmuc != "" && price == 0 && minPrice != 0 && maxPrice != 0) {
                    return "Danhmuc_Text_Sosao_minmax";
                  }
                  if (TextSearch != "" && sosao == "" && danhmuc != "" && price != 0 && minPrice == 0 && maxPrice == 0) {
                    return "Danhmuc_Text_Price";
                  }
                  if (TextSearch == "" && sosao != "" && danhmuc != "" && price != 0 && minPrice == 0 && maxPrice == 0) {
                    return "Danhmuc_Sosao_Price";
                  }
                  if (TextSearch != "" && sosao != "" && danhmuc == "" && price != 0 && minPrice == 0 && maxPrice == 0) {
                    return "Text_Sosao_Price";
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
                 
                }

                const key = GETapi();

                if (key != null) {
                  const url = checked ? sanphamWithDiscount[key] : sanphamWithoutDiscount[key];
                  console.log("url", url)
                  const res = await axios({ url, method: "GET" });
                  const productsearch = ListProductSearch(res.data);
                  dispatch(productsearch);
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
                "name_sosao": `http://localhost:8080/Product/FindByPriceLessAndTextAndRating?name=${TextSearch}&rating=${sosao}&category=${danhmuc}&price=10000`,
                "name_danhmuc": `http://localhost:8080/Product/FindByPriceLessAndCategoryAndText?name=${TextSearch}&category=${danhmuc}&price=10000`,
                "sosao_danhmuc": `http://localhost:8080/Product/FindByPriceLessAndCategoryAndRating?rating=${sosao}&category=${danhmuc}&price=10000`,
                "name_sosao_danhmuc": `http://localhost:8080/Product/FindByPriceLessAndCategoryAndTextAndRating?rating=${sosao}&category=${danhmuc}?text=${TextSearch}&price=10000`,
                "no_filters": `http://localhost:8080/Product/FindbyPriceLess?price=10000`,
              };


              const apiMapWithDiscount = {
                "danhmuc_only": `http://localhost:8080/Product/FindByPriceLessAndCategoryAndPromotion?category=${danhmuc}&price=10000`,
                "text_only": `http://localhost:8080/Product/FindByPriceLessAndTextAndPromotion?text=${TextSearch}&price=10000`,
                "sosao_only": `http://localhost:8080/Product/FindByPriceLessAndPromotionAndRating?rating=${sosao}&price=10000`,
                "name_sosao": `http://localhost:8080/Product/FindByPriceLessAndTextAndPromotionAndRating?name=${TextSearch}&rating=${sosao}&category=${danhmuc}&price=10000`,
                "name_danhmuc": `http://localhost:8080/Product/FindByPriceLessAndCategoryAndTextAndPromotion?name=${TextSearch}&category=${danhmuc}&price=10000`,
                "sosao_danhmuc": `http://localhost:8080/Product/FindByPriceLessAndCategoryAndPromotionAndRating?rating=${sosao}&category=${danhmuc}&price=10000`,
                "name_sosao_danhmuc": `http://localhost:8080/Product/FindByAllConditions?rating=${sosao}&category=${danhmuc}?text=${TextSearch}&price=10000`,
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
                console.log("dsa", apiKey)
                try {
                  // Chọn đúng apiMap dựa trên trạng thái có giảm giá hay không
                  const apiUrl = isChecked ? apiMapWithDiscount[apiKey] : apiMapWithoutDiscount[apiKey];
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
                "danhmuc_only": `http://localhost:8080/Product/FindByPriceMore100kAndCategory?price=100000&category=${danhmuc}`,
                "text_only": `http://localhost:8080/Product/FindByPriceMore100kAndText?text=${TextSearch}&price=100000`,
                "sosao_only": `http://localhost:8080/Product/FindByPriceMore100kAndRating?rating=${sosao}&price=100000`,
                "name_sosao": `http://localhost:8080/Product/FindByPriceMore100kAndTextAndRating?name=${TextSearch}&rating=${sosao}&category=${danhmuc}&price=100000`,
                "name_danhmuc": `http://localhost:8080/Product/FindByPriceMore100kAndCategoryAndText?name=${TextSearch}&category=${danhmuc}&price=100000`,
                "sosao_danhmuc": `http://localhost:8080/Product/FindByPriceMore100kAndCategoryAndRating?rating=${sosao}&category=${danhmuc}&price=100000`,
                "name_sosao_danhmuc": `http://localhost:8080/Product/FindByPriceMore100kAndCategoryAndTextAndRating?rating=${sosao}&category=${danhmuc}?text=${TextSearch}&price=100000`,
                "no_filters": `http://localhost:8080/Product/FindByPriceMore100k?price=100000`,
              };


              const apiMapWithDiscount = {
                "danhmuc_only": `http://localhost:8080/Product/FindByPriceMore100kAndCategoryAndPromotion?category=${danhmuc}&price=100000`,
                "text_only": `http://localhost:8080/Product/FindByPriceMore100kAndTextAndPromotion?text=${TextSearch}&price=100000`,
                "sosao_only": `http://localhost:8080/Product/FindByPriceMore100kAndPromotionAndRating?rating=${sosao}&price=100000`,
                "name_sosao": `http://localhost:8080/Product/FindByPriceMore100kAndTextAndPromotionAndRating?name=${TextSearch}&rating=${sosao}&category=${danhmuc}&price=100000`,
                "name_danhmuc": `http://localhost:8080/Product/FindByPriceMore100kAndCategoryAndTextAndPromotion?name=${TextSearch}&category=${danhmuc}&price=100000`,
                "sosao_danhmuc": `http://localhost:8080/Product/FindByPriceMore100kAndCategoryAndPromotionAndRating?rating=${sosao}&category=${danhmuc}&price=100000`,
                "name_sosao_danhmuc": `http://localhost:8080/Product/FindByAllConditionsMore100k?rating=${sosao}&category=${danhmuc}?text=${TextSearch}&price=100000`,
                "no_filters": `http://localhost:8080/Product/FindByPriceMore100kAndPromotion?price=100000`,
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
