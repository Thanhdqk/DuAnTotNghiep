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
import YeuthichReducer from './YeuthichReducer'
import postReducer from './postReducer'
import voucherReducer from './voucherReducer'
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
        Yeuthich :YeuthichReducer,
        post: postReducer,
        voucher : voucherReducer
    }


})