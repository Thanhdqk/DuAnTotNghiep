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
            const ProductDetail = action.payload.ProductDetail;
            const QuantityProduct = action.payload.QuantityProduct;
           
            const index = state.Cart.findIndex(p => p.san_phamId === ProductDetail.san_phamId);
           if(index<0)
           {
            const item = {...ProductDetail,QuantityProduct}
             state.Cart.push(item)
             alert(`Thêm thành công ${ProductDetail.ten_san_pham } với ${QuantityProduct} sản phẩm`)
           }
           else{
            state.Cart[index].QuantityProduct += QuantityProduct
           }
          
        },
        RemoveItem : (state, action) =>{
           if(window.confirm("bạn có muốn xóa sản phẩm này không"))
           { const index = state.Cart.findIndex(p => p.san_phamId == action.payload);
            state.Cart.splice(index,1)}
        },
        IncreaseItem: (state, action) =>{
            const { quantity, productId } = action.payload;
          const index = state.Cart.findIndex(p => p.san_phamId == productId);
          state.Cart[index].QuantityProduct +=quantity
        },
        DecreaseItem:(state,action) =>{
            const { quantity, productId } = action.payload;
            const index = state.Cart.findIndex(p => p.san_phamId == productId);
            if(state.Cart[index].QuantityProduct === 1)
            {
                if(window.confirm("bạn có muốn xóa vật phẩm này không"))
                {
                    state.Cart.splice(index,1)
                }
                else{
                    return;
                }
            }
            else{
               
                state.Cart[index].QuantityProduct -=quantity
            }
           
          
           
        },
        ClearCart:(state, action) =>{
            if(window.confirm("Bạn có muốn clear hoàn toàn giỏ hàng không"))
            {
                state.Cart =[];
            }
            
        }
        
    }
});

export const {AddItem,RemoveItem,IncreaseItem,ClearCart,DecreaseItem } = cartReducer.actions

export default cartReducer.reducer

