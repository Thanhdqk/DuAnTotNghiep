import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userReducer'
import popReducer from './popupReducer'
import categoryReducer from './categotyReducer'
import productReducer from './productReducer'
import cartReducer from './cartReducer'
import searchReducer from './searchReducer'
export const store = configureStore({

    reducer:{

        user:userReducer,
        popup:popReducer,
        category:categoryReducer,
        product:productReducer,
        cart:cartReducer,
        textSearch:searchReducer
    }


})