import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


const initialState = {
    Cart: [],
    ListSpthanhtoan: [],
    ListSpthanhtoan2: []

}

const cartReducer = createSlice({
    name: 'cartReducer',
    initialState,
    reducers: {

        AddItem: (state, action) => {
            const ProductDetail = action.payload.ProductDetail;
            const QuantityProduct = action.payload.QuantityProduct;

            const index = state.Cart.findIndex(p => p.san_phamId === ProductDetail.san_phamId);
            if (index < 0) {
                const item = { ...ProductDetail, QuantityProduct }
                state.Cart.push(item)
                alert(`Thêm thành công ${ProductDetail.ten_san_pham} với ${QuantityProduct} sản phẩm`)
            }
            else {
                state.Cart[index].QuantityProduct += QuantityProduct
            }

        },
        RemoveItem: (state, action) => {
            if (window.confirm("bạn có muốn xóa sản phẩm này không")) {
                const index = state.Cart.findIndex(p => p.san_phamId == action.payload);
                state.Cart.splice(index, 1)
                state.ListSpthanhtoan.splice(index, 1)



            }
        },
        IncreaseItem: (state, action) => {
            const { quantity, productId } = action.payload;
            const index = state.Cart.findIndex(p => p.san_phamId == productId);
            state.Cart[index].QuantityProduct += quantity
        },
        DecreaseItem: (state, action) => {
            const { quantity, productId } = action.payload;
            const index = state.Cart.findIndex(p => p.san_phamId == productId);
            if (state.Cart[index].QuantityProduct === 1) {
                if (window.confirm("bạn có muốn xóa vật phẩm này không")) {
                    state.Cart.splice(index, 1)
                    state.ListSpthanhtoan.splice(index, 1)
                }
                else {
                    return;
                }
            }
            else {

                state.Cart[index].QuantityProduct -= quantity
            }



        },
        ClearCart: (state, action) => {
            if (window.confirm("Bạn có muốn clear hoàn toàn giỏ hàng không")) {
                state.Cart = [];
            }

        },

        //

        AddSpthanhtoan: (state, action) => {
            const newProduct = action.payload;


            if (Array.isArray(state.ListSpthanhtoan)) {

                state.ListSpthanhtoan.push(newProduct);
            } else {
                console.error("ListSpthanhtoan is not an array");
            }
        },


        DeleteSpthanhtoan: (state, action) => {
            const sp = action.payload;


            // Kiểm tra xem ListSpthanhtoan có phải là một mảng trước khi tìm chỉ mục
            if (Array.isArray(state.ListSpthanhtoan)) {
                const index = state.ListSpthanhtoan.findIndex(s => s.san_phamId === sp.san_phamId);

                // Nếu tìm thấy (index != -1), xóa sản phẩm khỏi danh sách
                if (index !== -1) {
                    state.ListSpthanhtoan.splice(index, 1);
                } else {
                    console.error("Item not found in ListSpthanhtoan");
                }

            } else {
                console.error("ListSpthanhtoan is not an array");
            }
        },
        Clear: (state, action) => {
            state.ListSpthanhtoan = []
        },
        IncreaseSpthanhtoan: (state, action) => {
            const { quantity, productId } = action.payload;
            const index = state.ListSpthanhtoan.findIndex(p => p.san_phamId == productId.san_phamId);

            state.ListSpthanhtoan[index].QuantityProduct += quantity
        },
        DecreaseSpthanhtoan: (state, action) => {
            const { quantity, productId } = action.payload;
            const index = state.ListSpthanhtoan.findIndex(p => p.san_phamId == productId.san_phamId);

            if (state.ListSpthanhtoan[index].QuantityProduct === 1) {
                return;
            }
            state.ListSpthanhtoan[index].QuantityProduct -= quantity
        },
        RemoveSpthanhtoan: (state, action) => {

            const index = state.ListSpthanhtoan.findIndex(p => p.san_phamId == action.payload);
        },

        Thanhtoan: (state, action) => {
            state.ListSpthanhtoan2 = action.payload
        }


    }
});

export const { AddItem, RemoveItem, IncreaseItem, ClearCart, DecreaseItem, AddSpthanhtoan, DeleteSpthanhtoan, Clear, IncreaseSpthanhtoan, DecreaseSpthanhtoan, RemoveSpthanhtoan, Thanhtoan } = cartReducer.actions

export default cartReducer.reducer

