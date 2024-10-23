import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    ListDanhGia:[]
}

const DanhGiaReducer = createSlice({
  name: 'DanhGiaReducer',
  initialState,
  reducers: {

    ListAllDanhGia : (state,action) =>{
        state.ListDanhGia = action.payload;
    }

  }
});

export const {ListAllDanhGia} = DanhGiaReducer.actions

export default DanhGiaReducer.reducer