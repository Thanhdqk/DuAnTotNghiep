import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userReducer'
import popReducer from './popupReducer'
import categoryReducer from './categotyReducer'
export const store = configureStore({

    reducer:{

        user:userReducer,
        popup:popReducer,
        category:categoryReducer

    }


})