import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    ListSpthanhtoan :[]
}

const Spthanhtoan = createSlice({
  name: 'Spthanhtoan',
  initialState,
  reducers: {

    AddSpthanhtoan : (state,action) =>{
        state.ListSpthanhtoan = action.payload
    },
    DeleteSpthanhtoan: (state,action) =>{
      state.ListSpthanhtoan = action.payload
  }


  }
});

export const {} = Spthanhtoan.actions

export default Spthanhtoan.reducer