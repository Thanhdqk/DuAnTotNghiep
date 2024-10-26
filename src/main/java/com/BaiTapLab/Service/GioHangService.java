package com.BaiTapLab.Service;

import com.BaiTapLab.Entity.GioHang;
import com.BaiTapLab.Repository.GioHangRepository;
import com.BaiTapLab.Repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GioHangService {

    @Autowired
    private GioHangRepository gioHangRepository;

    @Autowired
    private UsersRepository usersRepository;

    public GioHang addGioHang(GioHang gioHang) {
        return gioHangRepository.save(gioHang);
    }
    
    public GioHang findByUserIdAndSanPhamId(String userId, String sanphamId) {
        
    	return gioHangRepository.findByUserIdAndSanPhamId(userId, sanphamId);
    }

    
    
    public List<GioHang> getGioHangByUserId(String userId) {
        return gioHangRepository.findByUsers_AccountID(userId);
    }

    public GioHang increaseQuantity(Integer gioHangId) {
        GioHang gioHang = gioHangRepository.findById(gioHangId).orElse(null);
        if (gioHang != null) {
            gioHang.setSo_luong(gioHang.getSo_luong() + 1);
            return gioHangRepository.save(gioHang);
        }
        return null;
    }

    public GioHang decreaseQuantity(Integer gioHangId) {
        GioHang gioHang = gioHangRepository.findById(gioHangId).orElse(null);
        if (gioHang != null && gioHang.getSo_luong() > 1) {
            gioHang.setSo_luong(gioHang.getSo_luong() - 1);
            return gioHangRepository.save(gioHang);
        }
        return null;
    }

    public void deleteGioHang(Integer gioHangId) {
        gioHangRepository.deleteById(gioHangId);
    }
}
