package com.BaiTapLab.RestController;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.DanhGia;
import com.BaiTapLab.Entity.HanhDong;
import com.BaiTapLab.Entity.PhanHoiDanhGia;
import com.BaiTapLab.Entity.SanPham;
import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Repository.DanhGiaRepository;
import com.BaiTapLab.Repository.HanhDongRepository;
import com.BaiTapLab.Repository.PhanHoiDanhGiaRepository;

@RestController
@RequestMapping("/api/phanhoidanhgia")
@CrossOrigin(origins = "http://localhost:3000")
public class PhanHoiDanhGiaRestController {
	@Autowired
	PhanHoiDanhGiaRepository phanhoiDanhGiaRepository;
	
	@Autowired
	DanhGiaRepository danhGiaRepository;
	
	@Autowired
	HanhDongRepository hanhdongRepository;
	
	@PostMapping("/save")
	public ResponseEntity<PhanHoiDanhGia> savePhanHoi(
			@RequestParam("danh_giaID") Integer danh_giaID,
			@RequestParam("ngay_tao") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate ngay_tao,
			@RequestParam("noi_dung") String noi_dung,
			@RequestParam("san_phamId") String san_phamId,
			@RequestParam("accountID") String accountID){
//		DanhGia danhgia = new DanhGia();
//		danhgia.setDanh_giaID(danh_giaID);
		
		// Tìm đối tượng DanhGia theo danh_giaID
	    DanhGia danhgia = danhGiaRepository.findById(danh_giaID)
	            .orElseThrow(() -> new RuntimeException("Không tìm thấy đánh giá với ID: " + danh_giaID));

	    // Cập nhật trạng thái phản hồi
	    danhgia.setTrang_thaiPH("Đã phản hồi");
	    danhGiaRepository.save(danhgia);
		
		
		SanPham sanpham = new SanPham();
		sanpham.setSan_phamId(san_phamId);
		
		Users users = new Users();
		users.setAccountID(accountID);
		
		PhanHoiDanhGia phanhoidanhgia = new PhanHoiDanhGia();
		phanhoidanhgia.setDanhgia(danhgia);
		phanhoidanhgia.setNgay_tao(ngay_tao);
		phanhoidanhgia.setNoi_dung(noi_dung);
		phanhoidanhgia.setSanpham(sanpham);
		phanhoidanhgia.setUsers(users);
		phanhoiDanhGiaRepository.save(phanhoidanhgia);
		
		HanhDong hanhdong = new HanhDong();
		hanhdong.setNgay_hanh_dong(LocalDate.now());
		hanhdong.setTen_hanh_dong("Phản hồi đánh giá");
		hanhdong.setDanhgia(danhgia);
		hanhdong.setUsers(users);
		hanhdongRepository.save(hanhdong);
		return ResponseEntity.ok(phanhoidanhgia);
	}
}
