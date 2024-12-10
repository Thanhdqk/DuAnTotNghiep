package com.BaiTapLab.RestController;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.DTO.SanPhamDTO;
import com.BaiTapLab.Entity.HanhDong;
import com.BaiTapLab.Entity.SanPham;
import com.BaiTapLab.Repository.HanhDongRepository;
import com.BaiTapLab.Repository.SanPhamRepository;
import com.BaiTapLab.Repository.UsersRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class SanPhamRestController {
	@Autowired
	SanPhamRepository sanPhamRepository;
	
	@Autowired
	HanhDongRepository hanhDongRepository;
	
	@Autowired
	UsersRepository usersRepository;
	// Của Thành
	@GetMapping("/sanPham/nhatKy")
	public ResponseEntity<List<Map<String, Object>>> getSanPhamNhatKy(){
		List<Object[]> listSanPham = sanPhamRepository.listNhatKy();
		List<Map<String, Object>> result = new ArrayList<>();
		for (Object[] obj : listSanPham) {
		        Map<String, Object> map = new HashMap<>();
		        map.put("ten_hanh_dong", obj[0]);
		        map.put("san_pham_id", obj[1]);
		        map.put("ngay_hanh_dong", obj[2]);
		        map.put("accountID", obj[3]);
		        result.add(map);
		}
		return ResponseEntity.ok(result);
	}
	
	@GetMapping("/sanPham/QLSP/danhsach/khuyenmai")
	public ResponseEntity<List<Map<String, Object>>> getSanPhamKhuyenMai(){
		List<Object[]> listSanPham = sanPhamRepository.lietKeDanhSachSPKhuyenMai();
		List<Map<String, Object>> result = new ArrayList<>();
		for (Object[] obj : listSanPham) {
		        Map<String, Object> map = new HashMap<>();
		        map.put("san_phamId", obj[0]);
	            map.put("ten_san_pham", obj[1]);
	            map.put("gia_goc", obj[2]);
	            map.put("gia_km", obj[3]);
	            map.put("mo_ta", obj[4]);
	            map.put("luot_mua", obj[5]);
	            map.put("phantram_GG", obj[6]);
	            map.put("han_gg", obj[7]);
	            map.put("hoat_dong", obj[8]);
		        result.add(map);
		}
		return ResponseEntity.ok(result);
	}
	
	@GetMapping("/sanPham/QLSP/danhsach/nhatky")
	public ResponseEntity<List<Map<String, Object>>> getListNhatKy(){
		List<Object[]> listSanPham = sanPhamRepository.danhSachNhatKyQLSP();
		List<Map<String, Object>> result = new ArrayList<>();
		for (Object[] obj : listSanPham) {
		        Map<String, Object> map = new HashMap<>();
		        map.put("san_phamId", obj[0]);
	            map.put("ten_hanh_dong", obj[1]);
	            map.put("ngay_hanh_dong", obj[2]);
	            map.put("accountID", obj[3]);
		        result.add(map);
		}
		return ResponseEntity.ok(result);
	}
	
	@GetMapping("/sanPham/QLSP/edit/{san_phamId}")
	public ResponseEntity<List<Map<String, Object>>> getSanPhamDetailQLSP(
			@PathVariable("san_phamId") String san_phamId){
		List<Object[]> listSanPham = sanPhamRepository.xemDetail(san_phamId);
		List<Map<String, Object>> result = new ArrayList<>();
		for (Object[] obj : listSanPham) {
		        Map<String, Object> map = new HashMap<>();
		        map.put("san_phamId", obj[0]);
	            map.put("ten_san_pham", obj[1]);
	            map.put("gia_goc", obj[2]);
	            map.put("gia_km", obj[3]);
	            map.put("mo_ta", obj[4]);
	            map.put("phantram_GG", obj[5]);
	            map.put("han_gg", obj[6]);
	            map.put("hoat_dong", obj[7]);
		        result.add(map);
		}
		return ResponseEntity.ok(result);
	}
	
	@GetMapping("/sanPham/edit/{san_phamId}")
	public ResponseEntity<List<Map<String, Object>>> getDetail(
			@PathVariable String san_phamId){
		List<Object[]> listDetail = sanPhamRepository.findByDetailSanPham(san_phamId);
		List<Map<String, Object>> result = new ArrayList<>();
		for (Object[] obj : listDetail) {
            Map<String, Object> map = new HashMap<>();
            map.put("ten_san_pham", obj[0]);
            map.put("ngay_tao", obj[1]);
            map.put("so_luong", obj[2]);
            map.put("mo_ta", obj[3]);
            map.put("chieu_cao", obj[4]);
            map.put("chieu_dai", obj[5]);
            map.put("chieu_rong", obj[6]);
            map.put("khoi_luong", obj[7]);
            map.put("tien_nhap_hang", obj[8]);
            map.put("gia_goc", obj[9]);
            map.put("ten_loaiDM", obj[10]);
            map.put("ten_thuong_hieu", obj[11]);
            map.put("ten_nha_cung_cap", obj[12]);
            map.put("san_phamId", obj[13]);
            result.add(map);
        }
		return ResponseEntity.ok(result);
	}
	
	@GetMapping("/listSanPham")
	public ResponseEntity<List<Map<String, Object>>> getSanPham() {
	    // Lấy tất cả sản phẩm từ cơ sở dữ liệu
	    List<Object[]> listSanPham = sanPhamRepository.listSanPhamMoi();
	    List<Map<String, Object>> result = new ArrayList<>();
		for (Object[] obj : listSanPham) {
            Map<String, Object> map = new HashMap<>();
            map.put("san_phamId", obj[0]);
            map.put("ten_san_pham", obj[1]);
            map.put("ngay_tao", obj[2]);
            map.put("gia_goc", obj[3]);
            map.put("gia_km", obj[4]);
            map.put("han_gg", obj[5]);
            map.put("luot_mua", obj[6]);
            map.put("mo_ta", obj[7]);
            map.put("phantram_GG", obj[8]);
            map.put("so_luong", obj[9]);
            map.put("trang_thai_kho", obj[10]);
            map.put("hoat_dong", obj[11]);
            map.put("phe_duyet", obj[12]);
            map.put("trang_thai_xoa", obj[13]);
            map.put("tien_nhap_hang", obj[14]);
            map.put("chieu_cao", obj[15]);
            map.put("chieu_dai", obj[16]);
            map.put("chieu_rong", obj[17]);
            map.put("khoi_luong", obj[18]);
            map.put("nhap_hang", obj[19]);
            map.put("ten_nha_cung_cap", obj[20]);
            map.put("ten_thuong_hieu", obj[21]);
            map.put("ten_loaiDM", obj[22]);
            result.add(map);
        }
	    return ResponseEntity.ok(result);
	}
	
//	@GetMapping("/edit/sanpham/{san_phamId}")
//	public ResponseEntity<SanPham> getSanPhamById(@PathVariable String san_phamId){
//		Optional<SanPham> sanpham = sanPhamRepository.findById(san_phamId);
//	    return sanpham.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
//	}
	
	@PutMapping("/update/sanpham/{san_phamId}")
	public ResponseEntity<SanPham> updateSanPham(
			@PathVariable String san_phamId, 
			@RequestParam("ten_san_pham") String ten_san_pham,
			@RequestParam("gia_goc") float gia_goc,
			@RequestParam("gia_km") float gia_km,
			@RequestParam("mo_ta") String mo_ta,
			@RequestParam("phantram_GG") int phantram_GG,
			@RequestParam("han_gg") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate han_gg,
			@RequestParam("hoat_dong") String hoat_dong,
			@RequestParam("accountID") String accountID) {
	    Optional<SanPham> optionalSanPham = sanPhamRepository.findById(san_phamId);
	    
	    if (optionalSanPham.isPresent()) {
	        SanPham existingSanPham = optionalSanPham.get();	        
	        // Cập nhật thông tin cho sản phẩm
	        existingSanPham.setTen_san_pham(ten_san_pham);
	        existingSanPham.setGia_goc(gia_goc);
	        existingSanPham.setGia_km(gia_km);
	        existingSanPham.setMo_ta(mo_ta);
	        existingSanPham.setPhantram_GG(phantram_GG);
	        existingSanPham.setHan_gg(han_gg);
	        existingSanPham.setHoat_dong(hoat_dong);
	        
	        HanhDong hanhdong = new HanhDong();
	        hanhdong.setSanpham(existingSanPham);
	        hanhdong.setNgay_hanh_dong(LocalDate.now());
	        hanhdong.setTen_hanh_dong("Cập nhật giá khuyến mãi");
	        hanhdong.setUsers(usersRepository.findById(accountID)
            		.orElseThrow(() -> new RuntimeException("Account không tồn tại")));
	        hanhDongRepository.save(hanhdong);
	        sanPhamRepository.save(existingSanPham);
	        
	        return ResponseEntity.ok(existingSanPham);
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	}

}