import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    Cart:[]
}

const cartReducer = createSlice({
    name: 'cartReducer',
    initialState,
    reducers: {

        AddItem : (state, action) =>{

        },
        RemoveItem : (state, action) =>{

        },
        IncreaseItem: (state, action) =>{

        },
        ClearCart:(state, action) =>{

        }
        
    }
});

export const {AddItem,RemoveItem,IncreaseItem,ClearCart } = cartReducer.actions

export default cartReducer.reducer

