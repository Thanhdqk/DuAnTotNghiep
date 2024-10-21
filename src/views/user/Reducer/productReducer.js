import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  ListProductThisWeek: [],
  ListProductTopSale: [],
  ListProductDiscount: [],
  ListProductSearch: []
}

const productReducer = createSlice({
  name: 'productReducer',
  initialState,
  reducers: {

    ListProductThisWeek: (state, action) => {
      state.ListProductThisWeek = action.payload
    },
    ListProductTopSale: (state, action) => {
      state.ListProductTopSale = action.payload
    },
    ListProductDiscount: (state, action) => {
      state.ListProductDiscount = action.payload
    },
    ListProductSearch: (state,action) =>{
      state.ListProductSearch = action.payload
    }

  }
});

export const {ListProductThisWeek,ListProductTopSale,ListProductDiscount,ListProductSearch } = productReducer.actions

export default productReducer.reducer

export const Call_API_Products = () => {

  return async (dispatch) => {

   try {
    const [ListProductThisWeekAPI, ListProductTopSaleAPI, ListProductDiscountAPI] = await Promise.all([
      axios({ url: 'http://localhost:8080/FindProductThisWeek', method: 'GET' }),
      axios({ url: 'http://localhost:8080/FindProductThisWeek', method: 'GET' }),
      axios({ url: 'http://localhost:8080/FindProductDiscount', method: 'GET' })
      
    ]);

    // const ListProductThisWeek = await axios({url:'',method:'GET'});

    // const ListProductTopSale = await axios({url:'',method:'GET'});

    // const ListProductDiscount = await axios({url:'',method:'GET'});

    const API_ListProductThisWeek = ListProductThisWeek(ListProductThisWeekAPI.data);

    const API_ListProductTopSale = ListProductTopSale(ListProductTopSaleAPI.data);

    const API_ListProductDiscount = ListProductDiscount(ListProductDiscountAPI.data);

    dispatch(API_ListProductThisWeek);
    dispatch(API_ListProductTopSale);
    dispatch(API_ListProductDiscount);
   } catch (error) {
    
   }

  }


}