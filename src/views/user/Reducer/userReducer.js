import { createSlice } from '@reduxjs/toolkit'

const initialState = {
        useraccount: JSON.parse(localStorage.getItem('Account'))
}

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {

    LoginAPI:(state,action)=>{


      state.useraccount = action.payload

    },

    Logout:(state,action)=>{

      state.useraccount=null
      localStorage.removeItem("Account")

    }

  }
});

export const {LoginAPI,Logout} = userReducer.actions

export default userReducer.reducer