package com.BaiTapLab.Service;

import com.BaiTapLab.Entity.GioHang;
import com.BaiTapLab.Entity.GioHangChiTiet;
import com.BaiTapLab.Entity.SanPham;
import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Repository.GioHangChiTietRepository;
import com.BaiTapLab.Repository.GioHangRepository;
import com.BaiTapLab.Repository.SanphamRepository;
import com.BaiTapLab.Repository.UsersRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GioHangService {

    @Autowired
    private GioHangRepository gioHangRepository;

    @Autowired
    private UsersRepository usersRepository;
    
    @Autowired
    SanphamRepository sanPhamRepository;
    
    @Autowired
    GioHangChiTietRepository gioHangChiTietRepository;
    
    
    // Lấy giỏ hàng của người dùng
    public GioHang getGioHang(String accountId) {
        return gioHangRepository.findByAccountId(accountId);
    }

    // Thêm sản phẩm vào giỏ hàng với số lượng
    public void addSanPhamToGioHang(String accountId, String sanPhamId, int soLuong) {
        

       
        GioHang gioHang = getGioHang(accountId);
        if (gioHang == null) {
            // Nếu chưa có giỏ hàng, tạo mới
            gioHang = new GioHang();
            Users user = usersRepository.findById(accountId).orElse(null);
            gioHang.setUsers(user);
            gioHang = gioHangRepository.save(gioHang); // Lưu giỏ hàng mới
        }

        // Tìm sản phẩm
        SanPham sanPham = sanPhamRepository.findById(sanPhamId).orElse(null);
        if (sanPham != null) {
           
            Optional<GioHangChiTiet> chiTietOpt = gioHangChiTietRepository.findByGioHangAndSanPham(gioHang, sanPhamId);
            GioHangChiTiet chiTiet;
            if (chiTietOpt.isPresent()) {
              
                chiTiet = chiTietOpt.get();
                if( soLuong == sanPham.getSo_luong())
                {
                	 chiTiet.setSoLuong(sanPham.getSo_luong());
                	gioHangChiTietRepository.save(chiTiet); 
                	return;
                }
                if(chiTiet.getSoLuong() + soLuong > sanPham.getSo_luong())
                {
                	 chiTiet.setSoLuong(sanPham.getSo_luong());
                 	gioHangChiTietRepository.save(chiTiet); 
                	return;
                }
                chiTiet.setSoLuong(chiTiet.getSoLuong() + soLuong); 
            } else {
              
                chiTiet = new GioHangChiTiet();
                chiTiet.setSoLuong(soLuong);
                chiTiet.setGioHang(gioHang);
                chiTiet.setSanPham(sanPham);
            }
            gioHangChiTietRepository.save(chiTiet); 
        }
    }

 
    public void increaseProductQuantity(String accountId, String sanPhamId) {
        updateProductQuantity(accountId, sanPhamId, 1);
    }

    
    public void decreaseProductQuantity(String accountId, String sanPhamId) {
        updateProductQuantity(accountId, sanPhamId, -1); 
    }

  
    private void updateProductQuantity(String accountId, String sanPhamId, int delta) {
        GioHang gioHang = getGioHang(accountId);
        if (gioHang != null) {
            Optional<GioHangChiTiet> chiTietOpt = gioHangChiTietRepository.findByGioHangAndSanPham(gioHang, sanPhamId);
            if (chiTietOpt.isPresent()) {
            	
                GioHangChiTiet chiTiet = chiTietOpt.get();
                int newQuantity = chiTiet.getSoLuong() + delta; 
                if (newQuantity <= 0) {
                    gioHangChiTietRepository.delete(chiTiet); 
                } else {
                    chiTiet.setSoLuong(newQuantity); 
                    gioHangChiTietRepository.save(chiTiet);
                }
            }
        }
    }
    
    @Transactional
    public void removeProductFromGioHang(String userId, String sanPhamId) {
        gioHangRepository.removeProductFromGioHang(userId, sanPhamId);
    }

    // Xóa tất cả sản phẩm trong giỏ hàng
    @Transactional
    public void clearGioHang(String userId) {
        gioHangRepository.clearGioHang(userId);
    }

    }
