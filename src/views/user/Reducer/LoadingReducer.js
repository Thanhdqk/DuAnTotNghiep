import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading:'none'
}

const LoadingReducer = createSlice({
  name: 'LoadingReducer',
  initialState,
  reducers: {

    setLoading : (state,action) =>{
        state.loading = action.payload
    }

  }
});

export const {setLoading} = LoadingReducer.actions

export default LoadingReducer.reducer