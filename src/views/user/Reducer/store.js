import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userReducer'
import popReducer from './popupReducer'
import categoryReducer from './categotyReducer'
import productReducer from './productReducer'
import cartReducer from './cartReducer'
import searchReducer from './searchReducer'
import bannerReducer from './bannerReducer'
import LoadingReducer from './LoadingReducer'
import { ContentPopup } from './popupReducer'
import Spthanhtoan from './Spthanhtoan'
export const store = configureStore({

    reducer:{

        user:userReducer,
        popup:popReducer,
        category:categoryReducer,
        product:productReducer,
        cart:cartReducer,
        textSearch:searchReducer,
        banner : bannerReducer,
        Loadingga:LoadingReducer,
        ListPopup:ContentPopup,
        Spthanhtoan:Spthanhtoan   
    }


})