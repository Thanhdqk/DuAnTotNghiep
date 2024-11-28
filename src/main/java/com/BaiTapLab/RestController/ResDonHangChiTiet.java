package com.BaiTapLab.RestController;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.DanhGia;
import com.BaiTapLab.Entity.DonHang;
import com.BaiTapLab.Entity.DonHangChiTiet;
import com.BaiTapLab.Entity.HinhAnh;
import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Repository.DonhangChiTietRepository;
import com.BaiTapLab.Repository.HinhAnhRepository;
import com.BaiTapLab.Repository.UsersRepository;
import com.BaiTapLab.Repository.DanhGiaRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ResDonHangChiTiet {
	@Autowired
	DonhangChiTietRepository DonhangChiTietRepository;
	@Autowired
	HinhAnhRepository hinhAnhRepository;
	@Autowired
	UsersRepository userRepository;
	@Autowired
	DanhGiaRepository DanhGiaRepository;
	@GetMapping("/api/donhang/{id}")
	public List<DonHangChiTiet> getDonHangById(@PathVariable String id) {
		System.out.println("cc" + id);
		return DonhangChiTietRepository.getDonhangChiTiet(id);
	}

	@GetMapping("/api/users/{accountID}")
    public Users getUserByAccountID(@PathVariable String accountID) {
        return userRepository.findById(accountID).orElse(null);
    }
	@GetMapping("/api/hinhanh/sanpham/{sanPhamId}")
	public List<HinhAnh> getHinhAnhBySanPhamId(@PathVariable int sanPhamId) {
		return hinhAnhRepository.findBySanPhamId(sanPhamId);
	}

}
