create database DuAnTotNghiep
drop database DuAnTotNghiep
use DuAnTotNghiep

-- 1. Tạo user
INSERT INTO users (accountID, password, hovaten, hinh_anh, vai_tro, so_dien_thoai, email, dia_chi)
VALUES
('user1', 'password1', N'Nguyễn Văn A', 'link_to_image1', 'user', '0123456789', 'user1@example.com', N'Hà nội'),
('user2', 'password2', N'Trần Thị B', 'link_to_image2', 'admin', '0987654321', 'user2@example.com', N'Hồ Chí Minh'),
('user3', 'password3', N'Lê Văn C', 'link_to_image3', 'user', '0123456788', 'user3@example.com', N'Đà Nẵng'),
('user4', 'password4', N'Phạm Thị D', 'link_to_image4', 'user', '0123456787', 'user4@example.com', N'Hải Phòng'),
('user5', 'password5', N'Võ Văn E', 'link_to_image5', 'user', '0123456786', 'user5@example.com', N'Nha Trang');

-- 2. Tạo Cửa hàng
INSERT INTO cuahang (ten_cua_hang, nguoi_dai_dien, thanh_pho, quan, dia_chi, mon_anKD, loai_hinhKD, so_dien_thoai, email, gio_hoat_dong, trang_thai, ngay_tao, accountID)
VALUES
(N'Cửa hàng 1', N'Trần Thị B', N'Hồ Chí Minh', N'Quận 1', N'Số 123, Đường ABC', N'Phở', N'Trái cây', '0123456789', 'cuahang1@example.com', '08:00 - 22:00', N'Hoạt động', GETDATE(), 'user1'),
(N'Cửa hàng 2', N'Lê Văn C', N'Đà Nẵng', N'Quận Hải Châu', N'Số 456, Đường XYZ', N'Bánh mì', N'Món ăn nhanh', '0987654321', 'cuahang2@example.com', '07:00 - 21:00', N'Hoạt động', GETDATE(), 'user2'),
(N'Cửa hàng 3', N'Nguyễn Văn A', N'Hà Nội', N'Quận Hoàn Kiếm', N'Số 789, Đường DEF', N'Mì tôm', N'Món ăn truyền thống', '0123456788', 'cuahang3@example.com', '09:00 - 20:00', N'Ngừng hoạt động', GETDATE(), 'user3'),
(N'Cửa hàng 4', N'Phạm Thị D', N'Hải Phòng', N'Quận Hồng Bàng', N'Số 321, Đường GHI', N'Sushi', N'Nhà hàng', '0123456787', 'cuahang4@example.com', '10:00 - 23:00', N'Hoạt động', GETDATE(), 'user4'),
(N'Cửa hàng 5', N'Võ Văn E', N'Nha Trang', N'Quận Ninh Hòa', N'Số 654, Đường JKL', N'Gà rán', N'Quán ăn vặt', '0123456786', 'cuahang5@example.com', '11:00 - 20:00', N'Hoạt động', GETDATE(), 'user5');


-- 3. Tạo đơn hàng
INSERT INTO donhang (don_hangID, trang_thai, ngay_tao, dia_chi, so_dien_thoai, ghi_chu, accountID, ten_cua_hang)
VALUES
('dh1', N'Đang chờ', GETDATE(), N'Số 123, Đường ABC, Hồ Chí Minh', '0123456789', N'Ghi chú cho đơn hàng 1', 'user1', N'Cửa hàng 1'),
('dh2', N'Đã giao', GETDATE(), N'Số 456, Đường XYZ, Đà Nẵng', '0987654321', N'Ghi chú cho đơn hàng 2', 'user2', N'Cửa hàng 2'),
('dh3', N'Đã hủy', GETDATE(), N'Số 789, Đường DEF, Hà Nội', '0123456788', N'Ghi chú cho đơn hàng 3', 'user3', N'Cửa hàng 3'),
('dh4', N'Đang giao', GETDATE(), N'Số 321, Đường GHI, Hải Phòng', '0123456787', N'Ghi chú cho đơn hàng 4', 'user4', N'Cửa hàng 4'),
('dh5', N'Hoàn tất', GETDATE(), N'Số 654, Đường JKL, Nha Trang', '0123456786', N'Ghi chú cho đơn hàng 5', 'user5', N'Cửa hàng 5');


-- 4. Tạo Loại món ăn
INSERT INTO loaimonan (loai_mon_anID, ten_loai, hinh_anh)
VALUES
('lma1', N'Món ăn nhanh', 'link_to_image1'),
('lma2', N'Món ăn truyền thống', 'link_to_image2'),
('lma3', N'Món ăn vặt', 'link_to_image3'),
('lma4', N'Món chay', 'link_to_image4'),
('lma5', N'Món hải sản', 'link_to_image5');


-- 5. Tạo món ăn
INSERT INTO monan (mon_anID, ten_mon_an, ngay_tao, gia_goc, mo_ta, gia_moi, loai_mon_anID, ten_cua_hang)
VALUES
('ma1', N'Burger', GETDATE(), 50000, N'Burger với phô mai và rau củ tươi', 60000, 'lma1', N'Cửa hàng 1'),
('ma2', N'Phở', GETDATE(), 40000, N'Phở bò với nước dùng thơm ngon', 45000, 'lma2', N'Cửa hàng 2'),
('ma3', N'Gà rán', GETDATE(), 60000, N'Gà rán giòn rụm, ăn kèm với sốt', 65000, 'lma3', N'Cửa hàng 3'),
('ma4', N'Sushi', GETDATE(), 80000, N'Sushi cá hồi tươi sống', 90000, 'lma4', N'Cửa hàng 4'),
('ma5', N'Chè', GETDATE(), 20000, N'Chè đậu xanh mát lạnh', 25000, 'lma5', N'Cửa hàng 5');


-- 6. Tạo đơn hàng chi tiết
 INSERT INTO donhangchitiet (don_hangID, mon_anID, so_luong, tong_tien)
VALUES
('dh1', 'ma1', 2, 120000),  
('dh1', 'ma2', 1, 45000), 
('dh2', 'ma3', 3, 195000),  
('dh3', 'ma4', 1, 90000),   
('dh4', 'ma5', 5, 125000);   


-- 7. Tạo loại lựa chọn
INSERT INTO loailuachon (loai_lua_chonID, ten_loai_lua_chon, so_lan_chon, mon_anID)
VALUES
('llc1', N'Chọn thêm sốt', 10, 'ma1'), 
('llc2', N'Chọn thêm rau', 15, 'ma1'),  
('llc3', N'Chọn nước dùng', 5, 'ma2'),   
('llc4', N'Chọn topping', 20, 'ma3'),    
('llc5', N'Chọn kích cỡ', 8, 'ma4');     


-- 8. Tạo sự lựa chọn
INSERT INTO suluachon (su_lua_chonID, ten_lua_chon, gia, mon_anID, loai_lua_chonID)
VALUES
('slc1', N'Phô mai thêm', 15000, 'ma1', 'llc1'),  
('slc2', N'Rau củ tươi', 20000, 'ma1', 'llc2'),  
('slc3', N'Nước dùng đặc biệt', 10000, 'ma2', 'llc3'), 
('slc4', N'Topping gà chiên', 30000, 'ma3', 'llc4'),
('slc5', N'Sushi hảo hạng', 50000, 'ma4', 'llc5'); 


-- 9. Tạo voucher
INSERT INTO voucher (voucherID, so_tien_giam, hinh_anh, han_su_dung, so_luotSD, phuong_thuc_TT, dieu_kien, ten_cua_hang)
VALUES
('v1', 50000, 'link_to_image1', '2024-12-31', 10, N'Giảm giá theo đơn hàng', N'Minimum purchase of 200000', N'Cửa hàng 1'),
('v2', 20000, 'link_to_image2', '2024-11-30', 15, N'Giảm giá theo món ăn', N'Applicable for food items', N'Cửa hàng 2'),
('v3', 30000, 'link_to_image3', '2024-10-15', 5, N'Giảm giá combo', N'Applicable for combo meals', N'Cửa hàng 3'),
('v4', 100000, 'link_to_image4', '2024-10-20', 20, N'Giảm giá khi thanh toán online', N'Applicable for online payments', N'Cửa hàng 4'),
('v5', 15000, 'link_to_image5', '2024-12-15', 8, N'Giảm giá cho khách hàng mới', N'First purchase discount', N'Cửa hàng 5');


-- 10. Tạo Vocuher detail
INSERT INTO voucherdetail (accountID, voucherID)
VALUES
('user1', 'v1'),
('user2', 'v2'),
('user3', 'v3'),
('user4', 'v4'),
('user5', 'v5');


-- 11. Tạo đánh giá
INSERT INTO danhgia (danh_giaID, noi_dung, sao, hinh_anh, ngay_tao, accountID, ten_cua_hang)
VALUES
('dg1', N'Thức ăn rất ngon, dịch vụ tốt!', 5, 'link_to_image1', GETDATE(), 'user1', N'Cửa hàng 1'),
('dg2', N'Giá cả hợp lý, không gian thoải mái!', 4, 'link_to_image2', GETDATE(), 'user2', N'Cửa hàng 2'),
('dg3', N'Món ăn bình thường, không có gì đặc sắc.', 3, 'link_to_image3', GETDATE(), 'user3', N'Cửa hàng 3'),
('dg4', N'Dịch vụ chậm, cần cải thiện.', 2, 'link_to_image4', GETDATE(), 'user4', N'Cửa hàng 4'),
('dg5', N'Tuyệt vời! Tôi sẽ quay lại.', 5, 'link_to_image5', GETDATE(), 'user5', N'Cửa hàng 5');








