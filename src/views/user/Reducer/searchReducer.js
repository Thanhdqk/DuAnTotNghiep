import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    Text:"",
    Danhmuc:"",
    sosao:"",
    price:0,
    
}

const searchReducer = createSlice({
  name: 'searchReducer',
  initialState,
  reducers: {

    SetTEXT : (state,action) =>{
        state.Text = action.payload
    },

    SetDanhMuc:(state,action)=>{
      state.Danhmuc = action.payload
    },
    SetSoSao:(state,action)=>{
      state.sosao = action.payload
    },
    SetPrice:(state,action)=>{
      state.price = action.payload
    }

  }
});

export const {SetTEXT,SetDanhMuc,SetSoSao,SetPrice} = searchReducer.actions

export default searchReducer.reducer