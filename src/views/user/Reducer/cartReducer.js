import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


// Thunk để thêm sản phẩm vào giỏ hàng
export const addItemToCart = createAsyncThunk(
    'cart/addItemToCart',
    async ({ ProductDetail, QuantityProduct }, { getState }) => {
        const userId = localStorage.getItem('account_id');
        
        if (!userId) {
            throw new Error('userId không được tìm thấy');
        }

        const state = getState();
        const index = state.cart.Cart.findIndex(p => p.san_phamId === ProductDetail.san_phamId);

        if (index < 0) {
            // Thêm sản phẩm mới vào giỏ hàng
            await axios.post(`http://localhost:8080/AddCart/${userId}/${ProductDetail.san_phamId}/${QuantityProduct}`, null, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const res = await axios.get(`http://localhost:8080/GETcart/${userId}`, {}, {
                headers: { 'Content-Type': 'application/json' }
            });

            return { item: { ...ProductDetail, QuantityProduct }, isNew: true, data: res.data  };
        } else {
            // Cập nhật số lượng sản phẩm
            await axios.post(`http://localhost:8080/AddCart1/${userId}/${ProductDetail.san_phamId}/${QuantityProduct}`, null, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return { item: state.cart.Cart[index], isNew: false};
        }
    }
);

export const removeItem = createAsyncThunk(
    'cart/removeItem',
    async ({ idcart, userId }, thunkAPI) => {
        if (window.confirm("bạn có muốn xóa vật phẩm này không")) {
            await axios.delete(`http://localhost:8080/delete/${idcart}`);
            const res = await axios.get(`http://localhost:8080/GETcart/${userId}`, {}, {
                headers: { 'Content-Type': 'application/json' }
            });
            return { action: 'remove', data: res.data };
        }
        return thunkAPI.rejectWithValue("User canceled the removal");


    }
);

export const decreaseItem = createAsyncThunk(
    'cart/decreaseItem',
    async ({ productId, quantity, userId, idcart }, thunkAPI) => {
        // Tìm chỉ số của sản phẩm trong CartDatabase
        const index = thunkAPI.getState().cart.CartDatabase.findIndex(p => p.san_phamId === productId);

        if (quantity === 1) {
            // Trường hợp xóa sản phẩm khỏi giỏ hàng
            if (window.confirm("bạn có muốn xóa vật phẩm này không")) {
                await axios.delete(`http://localhost:8080/delete/${idcart}`);
                const res = await axios.get(`http://localhost:8080/GETcart/${userId}`, {}, {
                    headers: { 'Content-Type': 'application/json' }
                });
                return { action: 'remove', data: res.data, index }; // Trả về hành động và chỉ số sản phẩm
            }
        } else {
            // Trường hợp giảm số lượng sản phẩm
            await axios.post(`http://localhost:8080/decrease/${idcart}`, {}, {
                headers: { 'Content-Type': 'application/json' }
            });
            const res = await axios.get(`http://localhost:8080/GETcart/${userId}`, {}, {
                headers: { 'Content-Type': 'application/json' }
            });
            return { action: 'decrease', data: res.data, index }; // Trả về hành động, dữ liệu và chỉ số sản phẩm
        }
    }
);


export const increaseItem = createAsyncThunk(
    'cart/increaseItem',
    async ({ idcart, userId }, thunkAPI) => {
        const id = parseInt(idcart);

      
        await axios.post(`http://localhost:8080/increase/${id}`, {}, {
            headers: { 'Content-Type': 'application/json' }
        });
        
        
        const response = await axios.get(`http://localhost:8080/GETcart/${userId}`);
        return response.data;
    }
);

const initialState = {
    Cart: [],
    CartDatabase: [],
   
    ListSpthanhtoan: [],
    ListSpthanhtoan2: []

}

const cartReducer = createSlice({
    name: 'cartReducer',
    initialState,
    reducers: {

        ListAllCartByid: (state, action) => {
            state.CartDatabase = action.payload;
        },

        AddItem: (state, action) => {
            const ProductDetail = action.payload.ProductDetail;
            const QuantityProduct = action.payload.QuantityProduct;
            const userId = localStorage.getItem('account_id');

            if (!userId) {
                console.error('userId không được tìm thấy');
                return;  
            }



            const index = state.Cart.findIndex(p => p.san_phamId === ProductDetail.san_phamId);
            if (index < 0) {
                const item = { ...ProductDetail, QuantityProduct };
                state.Cart.push(item);


                // Gửi yêu cầu thêm sản phẩm vào giỏ hàng
                const add = async () => {
                    try {

                        const res = await axios({
                            url: `http://localhost:8080/AddCart/${userId}/${ProductDetail.san_phamId}/${QuantityProduct}`,
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        

                    } catch (error) {

                    }
                }
                add()

            } else {
              
                state.Cart[index].QuantityProduct += QuantityProduct;

             
                const add = async () => {
                    try {

                        const res = await axios({
                            url: `http://localhost:8080/AddCart1/${userId}/${ProductDetail.san_phamId}/${QuantityProduct}`,
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                    } catch (error) {

                    }
                }
                add()

            }

           
        },
       


        ClearCart: (state, action) => {
            if (window.confirm("Bạn có muốn clear hoàn toàn giỏ hàng không")) {
                state.ListSpthanhtoan = []
                state.Cart = [];

            
            }


        },

       

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
            console.log("spne",sp);

            // Kiểm tra xem ListSpthanhtoan có phải là một mảng trước khi tìm chỉ mục
            if (Array.isArray(state.ListSpthanhtoan)) {
                const index = state.ListSpthanhtoan.findIndex(s => s.sanpham.san_phamId === sp.sanpham.san_phamId);
                console.log("index ne",index)
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
            const index = state.ListSpthanhtoan.findIndex(p => p.sanpham.san_phamId == productId.sanpham.san_phamId);

            state.ListSpthanhtoan[index].so_luong += quantity
        },
        DecreaseSpthanhtoan: (state, action) => {
            const { quantity, productId } = action.payload;
            const index = state.ListSpthanhtoan.findIndex(p => p.sanpham.san_phamId == productId.sanpham.san_phamId);

            if (state.ListSpthanhtoan[index].QuantityProduct === 1) {
                return;
            }
            state.ListSpthanhtoan[index].so_luong -= quantity
        },
        RemoveSpthanhtoan: (state, action) => {

            const index = state.ListSpthanhtoan.findIndex(p => p.san_phamId == action.payload);
        },

        Thanhtoan: (state, action) => {
            state.ListSpthanhtoan2 = action.payload
        }


    }, extraReducers: (builder) => {
        builder
            .addCase(decreaseItem.fulfilled, (state, action) => {
                const { action: decreaseAction, data, index } = action.payload; // Lấy action, data và index từ payload
                if (decreaseAction === 'remove') {
                    state.ListSpthanhtoan.splice(index, 1);
                    state.CartDatabase = data // Xóa sản phẩm khỏi danh sách thanh toán
                } else if (decreaseAction === 'decrease') {
                    state.CartDatabase = data
                }
            })
            .addCase(decreaseItem.rejected, (state, action) => {
                console.error(action.payload); // Đã hủy xóa sản phẩm
            })
            .addCase(increaseItem.fulfilled, (state, action) => {
                state.CartDatabase = action.payload; // Cập nhật CartDatabase từ phản hồi API
            }).addCase(removeItem.fulfilled, (state, action) => {
                const { action: removeAction, data } = action.payload; // Lấy action và dữ liệu từ payload
                if (removeAction === 'remove') {
                    state.CartDatabase = data; // Cập nhật CartDatabase với dữ liệu mới từ server
                    // Giả sử rằng ListSpthanhtoan chứa danh sách sản phẩm đã thanh toán
                    state.ListSpthanhtoan = state.ListSpthanhtoan.filter(item => item.id !== action.meta.arg.idcart); // Xóa sản phẩm khỏi danh sách thanh toán
                }
            })
            .addCase(removeItem.rejected, (state, action) => {
                console.error(action.payload); 
            }).addCase(addItemToCart.fulfilled, (state, action) => {
                const { item, isNew,data } = action.payload;

                if (isNew) {
                    state.CartDatabase = data
                    state.Cart.push(item);
                } else {
                    const index = state.Cart.findIndex(p => p.san_phamId === item.san_phamId);
                    state.Cart[index].QuantityProduct += item.QuantityProduct;
                }

                // Lưu giỏ hàng vào localStorage nếu cần
                // localStorage.setItem('cart', JSON.stringify(state.Cart));
            })
            .addCase(addItemToCart.rejected, (state, action) => {
                console.error(action.error.message);
            });
    }


});

export const { ListAllCartByid, AddItem, RemoveItem, IncreaseItem, ClearCart, DecreaseItem, AddSpthanhtoan, DeleteSpthanhtoan, Clear, IncreaseSpthanhtoan, DecreaseSpthanhtoan, RemoveSpthanhtoan, Thanhtoan } = cartReducer.actions

export default cartReducer.reducer

export const CallAPI_Cart = (userID) => {
    return async (dispatch) => {
        const res = await axios({ url: `http://localhost:8080/GETcart/${userID}`, method: 'GET' })
        dispatch(ListAllCartByid(res.data));
    }
}

