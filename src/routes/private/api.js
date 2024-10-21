// src/api/apiClient.js

import axios from 'axios';

// Tạo một instance Axios
const apiClient = axios.create({
    baseURL: 'http://localhost:8080', // Địa chỉ API của bạn
    withCredentials: true, // Cho phép gửi cookies
});

// Ví dụ về cách sử dụng Axios để gửi yêu cầu đăng nhập
export const login = async (username, password) => {
    try {
        const response = await apiClient.post('/login', { username, password });
        return response.data; // Trả về dữ liệu từ response
    } catch (error) {
        throw error.response.data; // Xử lý lỗi nếu có
    }
};
