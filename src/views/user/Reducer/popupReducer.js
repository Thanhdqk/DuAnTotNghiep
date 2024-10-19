import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    StatusPopup:'none',
    ContentPopup:'',
    BorderColor:'',
    IconImage:''
}

const popupReducer = createSlice({
  name: 'Popup',
  initialState,
  reducers: {

    StatusPopup:(state,action) =>{
      state.StatusPopup=action.payload
    },

    BorderColor:(state,action) =>{

      state.BorderColor =action.payload

    },

    ContentPopup:(state,action) =>{

      state.ContentPopup =action.payload

    },
    IconImage:(state,action) =>{

      state.IconImage =action.payload

    },

  }
});

export const {StatusPopup,BorderColor,ContentPopup,IconImage} = popupReducer.actions

export default popupReducer.reducer