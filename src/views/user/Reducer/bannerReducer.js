import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    ListBanner:[]
}

const bannerReducer = createSlice({
  name: 'bannerReducer',
  initialState,
  reducers: {

    ListAll : (state,action) =>{
        state.ListBanner = action.payload;
    }

  }
});

export const {ListAll} = bannerReducer.actions

export default bannerReducer.reducer