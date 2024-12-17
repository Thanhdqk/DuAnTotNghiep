import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { toast } from 'react-toastify';

export const addItemToCart = createAsyncThunk(
    'cart/addItemToCart',
    async ({ ProductDetail, QuantityProduct }, { getState }) => {
        const userId = localStorage.getItem('account_id');
        const state = getState();
        const index = state.cart.Cart.findIndex(p => p.san_phamId === ProductDetail.san_phamId);
        if (index < 0) {
            await axios.post(`http://localhost:8080/AddCart/${userId}/${ProductDetail.san_phamId}/${QuantityProduct}`, null, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const res = await axios.get(`http://localhost:8080/GETcart/${userId}`, {}, {
                headers: { 'Content-Type': 'application/json' }
            });

            return { item: { ...ProductDetail, QuantityProduct }, isNew: true, data: res.data };
        } else {

            await axios.post(`http://localhost:8080/AddCart/${userId}/${ProductDetail.san_phamId}/${QuantityProduct}`, null, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return { item: state.cart.Cart[index], isNew: false };
        }
    }
);

export const removeItem = createAsyncThunk(
    'cart/removeItem',
    async ({ userId, idsanpham }, thunkAPI) => {
        const state = thunkAPI.getState();
        const index = state.cart.ListSpthanhtoan.findIndex(item => item.sanPham.san_phamId === idsanpham);

        if (window.confirm("bạn có muốn xóa vật phẩm này không")) {
            await axios.delete(`http://localhost:8080/remove/${userId}/${idsanpham}`);
            const res = await axios.get(`http://localhost:8080/GETcart/${userId}`, {}, {
                headers: { 'Content-Type': 'application/json' }
            });
            return { action: 'remove', data: res.data, id: idsanpham, index: index };
        }
        return thunkAPI.rejectWithValue("User canceled the removal");


    }
);

export const clearItem = createAsyncThunk(
    'cart/clearItem',
    async (userId, thunkAPI) => {
        if (window.confirm("bạn có muốn xóa tất cả sản phẩm trong giỏ hàng không")) {
            await axios.delete(`http://localhost:8080/Clear/${userId}`);
            const res = await axios.get(`http://localhost:8080/GETcart/${userId}`, {}, {
                headers: { 'Content-Type': 'application/json' }
            });
            return { action: 'clear', data: res.data };
        }
        return thunkAPI.rejectWithValue("User canceled the removal");


    }
);

export const decreaseItem = createAsyncThunk(
    'cart/decreaseItem',
    async ({ productId, quantity, userId, idsp }, thunkAPI) => {


        const state = thunkAPI.getState();
        const index = state.cart.ListSpthanhtoan.findIndex(item => item.sanPham.san_phamId === idsp); // Xác định index của sản phẩm

        if (quantity === 1) {
            if (window.confirm("Bạn có muốn xóa sản phẩm này không?")) {
                await axios.delete(`http://localhost:8080/remove/${userId}/${idsp}`);
                const res = await axios.get(`http://localhost:8080/GETcart/${userId}`, {
                    headers: { 'Content-Type': 'application/json' }
                });
                return { action: 'remove', data: res.data, index };
            } else {
                return undefined;
            }
        }

        await axios.post(`http://localhost:8080/decrease/${idsp}/${userId}`, {}, {
            headers: { 'Content-Type': 'application/json' }
        });
        const res = await axios.get(`http://localhost:8080/GETcart/${userId}`, {
            headers: { 'Content-Type': 'application/json' }
        });
        return { action: 'decrease', data: res.data };
    }
);


export const increaseItem = createAsyncThunk(
    'cart/increaseItem',
    async ({ idsp, userId }, thunkAPI) => {



        await axios.post(`http://localhost:8080/increase/${idsp}/${userId}`, {}, {
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
    ListSpthanhtoan2: [],
    total:'',
    totalafterdiscount: '',
    voucher: '',
    voucher2: '',
    discount: '',
    totalweight: '',
    totallength: '',
    totalwidth: '',
    totalheight: '',

}

const cartReducer = createSlice({
    name: 'cartReducer',
    initialState,
    reducers: {

        clearListSpthanhtoan2: (state, action) => {
            state.ListSpthanhtoan2 = [];
        },
        addtotalafterdiscount: (state, action) => {
            console.log("purchase info : ",action.payload)
            state.totalafterdiscount=action.payload
        },
        addtotal: (state, action) => {
            console.log("purchase info : ",action.payload)
            state.total=action.payload
        },
        addvoucher: (state, action) => {
            console.log("purchase info : ",action.payload)
            state.voucher=action.payload
        },
        addvoucher2: (state, action) => {
            console.log("purchase info : ",action.payload)
            state.voucher2=action.payload
        },
        adddiscount : (state, action) => {
            console.log("purchase info : ",action.payload)
            state.discount=action.payload
        }
        ,addtotalweight: (state, action) => {
            console.log("purchase info : ",action.payload)
            state.totalweight=action.payload
        }
        ,addtotallength: (state, action) => {
            console.log("purchase info : ",action.payload)
            state.totallength=action.payload
        },
        addtotalwidth: (state, action) => {
            console.log("purchase info : ",action.payload)
            state.totalwidth=action.payload
        },addtotalheight: (state, action) => {
            console.log("purchase info : ",action.payload)
            state.totalheight=action.payload
        },
        ListAllCartByid: (state, action) => {
            state.CartDatabase = action.payload;
        },

        AddItem: (state, action) => {
            const ProductDetail = action.payload.ProductDetail;
            const QuantityProduct = action.payload.QuantityProduct;
            const userId = localStorage.getItem('account_id');

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

                const isProductExists = state.ListSpthanhtoan.some(item => item.id === newProduct.id); // Thay newProduct.id bằng id của sản phẩm

                if (!isProductExists) {
                    state.ListSpthanhtoan.push(newProduct);
                } else {
                    console.warn("Sản phẩm đã tồn tại trong danh sách thanh toán.");
                }
            } else {
                console.error("ListSpthanhtoan is not an array");
            }
        },


        DeleteSpthanhtoan: (state, action) => {
            const productToDelete = action.payload; // Đối tượng sản phẩm cần xóa
            const idSanPham = productToDelete.id;   // Lấy id từ đối tượng sản phẩm
            console.log('sad', idSanPham)
            if (Array.isArray(state.ListSpthanhtoan)) {
                // Tìm index của sản phẩm trong ListSpthanhtoan dựa trên id
                const index = state.ListSpthanhtoan.findIndex(item => item.id === idSanPham);

                if (index !== -1) {

                    state.ListSpthanhtoan.splice(index, 1);
                    console.log(`Sản phẩm với id ${idSanPham} đã được xóa.`);
                } else {
                    console.error("Không tìm thấy sản phẩm với id:", idSanPham);
                }
            } else {
                console.error("ListSpthanhtoan is not an array");
            }



        },
        Clear: (state, action) => {
            state.ListSpthanhtoan = []
        },
        IncreaseSpthanhtoan: (state, action) => {

            const { quantity, productId } = action.payload; // Sử dụng sanPham từ payload
            console.log('sd', quantity)
            console.log('sd', productId)
            const index = state.ListSpthanhtoan.findIndex(p => p.sanPham.san_phamId === productId.sanPham.san_phamId);

            console.log('sd', index)
            if (index !== -1) {

                state.ListSpthanhtoan[index].soLuong += quantity;
            }
        },


        DecreaseSpthanhtoan: (state, action) => {
            const { quantity, productId } = action.payload;

            const index = state.ListSpthanhtoan.findIndex(p => p.sanPham.san_phamId === productId.sanPham.san_phamId);

            if (index !== -1 && state.ListSpthanhtoan[index].soLuong > 1) {

                state.ListSpthanhtoan[index].soLuong -= quantity;
            }
        },

        RemoveSpthanhtoan: (state, action) => {
            const sanPhamId = action.payload;
            const index = state.ListSpthanhtoan.findIndex(p => p.sanPham.san_phamId === sanPhamId);

            if (index !== -1) {
                // Xóa sản phẩm khỏi danh sách nếu tìm thấy
                state.ListSpthanhtoan.splice(index, 1);
            }
        },

        Thanhtoan: (state, action) => {
            state.ListSpthanhtoan2 = action.payload
        }


    }, extraReducers: (builder) => {
        builder
            .addCase(decreaseItem.fulfilled, (state, action) => {
                if (!action.payload) return;

                const { action: decreaseAction, data, index } = action.payload;
                if (decreaseAction === 'remove') {
                    if (index !== -1) {
                        console.log('ádsadsa', index)
                        state.ListSpthanhtoan.splice(index, 1); // Xóa sản phẩm khỏi danh sách thanh toán
                    }
                    state.CartDatabase = data; // Cập nhật CartDatabase sau khi xóa
                } else if (decreaseAction === 'decrease') {
                    state.CartDatabase = data;
                }
            })
            .addCase(decreaseItem.rejected, (state, action) => {
                console.error("Thao tác bị từ chối:", action.error);
            })
            .addCase(increaseItem.fulfilled, (state, action) => {
                state.CartDatabase = action.payload; // Cập nhật CartDatabase từ phản hồi API

            })
            .addCase(removeItem.fulfilled, (state, action) => {
                const { action: removeAction, data, idsp, index } = action.payload; // Lấy action và dữ liệu từ payload
                if (removeAction === 'remove') {
                    state.ListSpthanhtoan.splice(index, 1)
                    state.CartDatabase = data; // Cập nhật CartDatabase với dữ liệu mới từ server
                    // Xóa sản phẩm khỏi danh sách thanh toán

                }
            })
            .addCase(removeItem.rejected, (state, action) => {
                console.error(action.payload);
            })
            .addCase(addItemToCart.fulfilled, (state, action) => {
                const { item, isNew, data } = action.payload;

                if (isNew) {
                    state.CartDatabase = data;
                    toast.success('Thêm sản phẩm vào giỏ hàng thành công!');
                    state.Cart.push(item);
                } else {
                    const index = state.Cart.findIndex(p => p.san_phamId === item.san_phamId);
                    if (index !== -1) {
                        state.Cart[index].QuantityProduct += item.QuantityProduct;
                        toast.success('Thêm sản phẩm vào giỏ hàng thành công!');

                    }
                }


            })
            .addCase(addItemToCart.rejected, (state, action) => {
                console.error(action.error.message);
                toast.error('Lỗi khi thêm sản phẩm vào giỏ hàng');
            }).addCase(clearItem.fulfilled, (state, action) => {
                const { action: clearAction, data } = action.payload; // Lấy action và dữ liệu từ payload
                if (clearAction === 'clear') {
                    state.CartDatabase = data;
                    state.Cart = []
                    state.ListSpthanhtoan = []
                }
            }).addCase(clearItem.rejected, (state, action) => {
                console.error(action.error.message);
            })
    }



});

export const { clearListSpthanhtoan2, ListAllCartByid, AddItem, RemoveItem, IncreaseItem, ClearCart, 
                  DecreaseItem, AddSpthanhtoan, DeleteSpthanhtoan, Clear, IncreaseSpthanhtoan, DecreaseSpthanhtoan,
                  RemoveSpthanhtoan, Thanhtoan ,adddiscount,addvoucher,addvoucher2,addtotalheight,addtotalweight,addtotalafterdiscount,addtotallength,addtotalwidth,addtotal} = cartReducer.actions

export default cartReducer.reducer

export const CallAPI_Cart = (userID) => {
    return async (dispatch) => {
        try {
            const res = await axios({ url: `http://localhost:8080/GETcart/${userID}`, method: 'GET' })

            dispatch(ListAllCartByid(res.data));
        } catch (error) {

        }
    }
}

