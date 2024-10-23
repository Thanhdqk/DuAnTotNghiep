import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    ListPopup:[]
}

const contentPopup = createSlice({
  name: 'contentPopup',
  initialState,
  reducers: {

    ListPopupall : (state,action) =>{
        state.ListPopup =action.payload;
    }

  }
});

export const {} = contentPopup.actions

export default contentPopup.reducer