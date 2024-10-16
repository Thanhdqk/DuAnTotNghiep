import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    ListCategory : []
}

const categotyReducer = createSlice({
  name: "categotyReducer",
  initialState,
  reducers: {

    FindAllCategory: (state,action)=>{
        state.ListCategory = action.payload;
    }

  }
});

export const {FindAllCategory} = categotyReducer.actions

export default categotyReducer.reducer

export const API_FindALL_Category = () => {

    return  async (dispatch) => {

            try {
              const RES = await axios({url:'http://localhost:8080/findAllCategory',method:'GET'});

            const API_FindALL_Category =  FindAllCategory(RES.data);
            dispatch(API_FindALL_Category);
            } catch (error) {
              
            }

    }

}