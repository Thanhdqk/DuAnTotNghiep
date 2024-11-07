import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  listPost:[],
  
}

const postReducer = createSlice({
  name: 'postReducer',
  initialState,
  reducers: {

    GetALLPost:(state,action) =>{
      state.listPost= action.payload
    }

  }
});

export const {GetALLPost} = postReducer.actions

export default postReducer.reducer