import { createSlice } from '@reduxjs/toolkit'

const initialState = {
     sanphamfavorited :{}
}

const YeuthichReducer = createSlice({
  name: 'YeuthichReducer',
  initialState,
  reducers: {

    addFavotite:(state,action) =>{
        state.sanphamfavorited = action.payload
    }

  }
});

export const {addFavotite} = YeuthichReducer.actions

export default YeuthichReducer.reducer