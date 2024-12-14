package com.BaiTapLab.Controller;

import java.io.IOException;
import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.BaiTapLab.Entity.DanhGia;
import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Entity.SanPham;
import com.BaiTapLab.Service.DanhGiaService;
import com.BaiTapLab.Repository.UsersRepository;
import com.BaiTapLab.Repository.SanPhamRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Base64;
import java.util.List;

import com.BaiTapLab.Repository.DanhGiaRepository;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:3000")
public class DanhGiaController {
	@Autowired
	private DanhGiaService danhGiaService;
	@Autowired
	private DanhGiaRepository danhGiaRepository;

	@Autowired
	private UsersRepository usersRepository;

	@Autowired
	private SanPhamRepository sanPhamRepository;

	private static final Logger logger = LoggerFactory.getLogger(DanhGiaController.class);

	@PostMapping
	public ResponseEntity<String> saveReview(@RequestParam("san_phamId") String sanPhamId,
			@RequestParam("users") String userJson, @RequestParam("noi_dung") String noiDung,
			@RequestParam("so_sao") int soSao,
			@RequestParam(value = "hinh_anh", required = false) MultipartFile hinhAnhFile,
			@RequestParam("ngay_tao") String ngayTao) {

		try {
			Users user = usersRepository.findById(userJson).orElse(null);
			SanPham sanPham = sanPhamRepository.findById(sanPhamId).orElse(null);

			if (user == null || sanPham == null) {
				return ResponseEntity.badRequest().body("User or Product not found.");
			}

			DanhGia danhGia = new DanhGia();
			danhGia.setUsers(user);
			danhGia.setSanpham(sanPham);
			danhGia.setNoi_dung(noiDung);
			danhGia.setSo_sao(soSao);
			danhGia.setNgay_tao(LocalDate.parse(ngayTao));

			if (hinhAnhFile != null && !hinhAnhFile.isEmpty()) {
				String fileName = hinhAnhFile.getOriginalFilename();
				danhGia.setHinh_anh(fileName); // Save only the filename
			}

			danhGiaService.saveReview(danhGia);
			return ResponseEntity.ok("Review saved successfully.");
		} catch (Exception e) {
			logger.error("Error saving review", e);
			return ResponseEntity.status(500).body("Error saving review.");
		}
	}

	@GetMapping("/check/all")
	public ResponseEntity<List<String>> getReviewedProducts(@RequestParam String userId) {
		try {
			// Tìm danh sách sản phẩm đã được đánh giá
			List<String> reviewedProductIds = danhGiaRepository.findSanPhamIdsByUserId(userId);
			return ResponseEntity.ok(reviewedProductIds);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

}