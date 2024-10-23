import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    Text:""
}

const searchReducer = createSlice({
  name: 'searchReducer',
  initialState,
  reducers: {

    SetTEXT : (state,action) =>{
        state.Text = action.payload
    }

  }
});

export const {SetTEXT} = searchReducer.actions

export default searchReducer.reducer