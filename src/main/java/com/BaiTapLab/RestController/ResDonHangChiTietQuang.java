package com.BaiTapLab.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.DonHangChiTiet;
import com.BaiTapLab.Entity.HinhAnh;
import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Repository.DonHangChiTietRepository;
import com.BaiTapLab.Repository.HinhAnhRepository;
import com.BaiTapLab.Repository.UsersRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ResDonHangChiTietQuang {
	@Autowired
	DonHangChiTietRepository DonhangChiTietRepository;
	@Autowired
	HinhAnhRepository hinhAnhRepository;
	@Autowired
	UsersRepository userRepository;

	@GetMapping("/api/donhang/{id}")
	public List<DonHangChiTiet> getDonHangById(@PathVariable String id) {
		System.out.println("cc" + id);
		return DonhangChiTietRepository.getDonhangChiTiet(id);
	}

	@GetMapping("/api/hinhanh/sanpham/{sanPhamId}")
	public List<HinhAnh> getHinhAnhBySanPhamId(@PathVariable String sanPhamId) {
		return hinhAnhRepository.findBySanPhamId(sanPhamId);
	}
	@GetMapping("/api/users/{accountID}")
    public Users getUserByAccountID(@PathVariable String accountID) {
        return userRepository.findById(accountID).orElse(null);
    }
}