import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userReducer'
import popReducer from './popupReducer'
export const store = configureStore({

    reducer:{

        user:userReducer,
        popup:popReducer


    }


})