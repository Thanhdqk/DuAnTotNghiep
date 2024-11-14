package com.BaiTapLab.RestController;

import java.time.LocalDate;
import java.util.List;
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
import com.BaiTapLab.Entity.SanPham;
import com.BaiTapLab.Repository.SanPhamRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class SanPhamRestController {
	@Autowired
	SanPhamRepository sanPhamRepository;
	
//	@GetMapping("/listSanPham")
//	public ResponseEntity<List<SanPham>> getSanPham(){
//		List<SanPham> listSanPham = sanPhamRepository.findAll();
//		return ResponseEntity.ok(listSanPham);
//	}
	
	@GetMapping("/listSanPham")
	public ResponseEntity<List<SanPhamDTO>> getSanPham() {
	    // Lấy tất cả sản phẩm từ cơ sở dữ liệu
	    List<SanPham> listSanPham = sanPhamRepository.findAll();

	    // Chuyển đổi các đối tượng SanPham thành SanPhamDTO
	    List<SanPhamDTO> listSanPhamDTO = listSanPham.stream()
	            .map(sanPham -> new SanPhamDTO(
	                    sanPham.getSan_phamId(),
	                    sanPham.getTen_san_pham(),
	                    sanPham.getNgay_tao(),
	                    sanPham.getGia_goc(),
	                    sanPham.getGia_km(),
	                    sanPham.getHan_gg(),  // Thêm thông tin "han_gg"
	                    sanPham.getLuot_mua(), // Thêm thông tin "luot_mua"
	                    sanPham.getMo_ta(),    // Thêm thông tin "mo_ta"
	                    sanPham.getPhantram_GG(),  // Thêm thông tin "phantram_GG"
	                    sanPham.getSo_luong(),
	                    sanPham.getTrang_thai_kho(),
	                    sanPham.getHoat_dong(),
	                    sanPham.getPhe_duyet(),
	                    sanPham.getTrang_thai_xoa(),
	                    sanPham.getHanh_dong(),
	                    sanPham.getTien_nhap_hang(),
	                    sanPham.getChieu_cao(),
	                    sanPham.getChieu_dai(),
	                    sanPham.getChieu_rong(),
	                    sanPham.getKhoi_luong()
	            ))
	            .collect(Collectors.toList());

	    // Trả về danh sách SanPhamDTO
	    return ResponseEntity.ok(listSanPhamDTO);
	}

	
	@GetMapping("/edit/sanpham/{san_phamId}")
	public ResponseEntity<SanPham> getSanPhamById(@PathVariable String san_phamId){
		Optional<SanPham> sanpham = sanPhamRepository.findById(san_phamId);
	    return sanpham.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}
	
//	@PutMapping("/update/sanpham/{san_phamId}")
//	public ResponseEntity<SanPham> updateSanPham(@PathVariable String san_phamId, @RequestBody SanPham updatedSanPham) {
//	    Optional<SanPham> optionalSanPham = sanPhamRepository.findById(san_phamId);
//	    
//	    if (optionalSanPham.isPresent()) {
//	        SanPham existingSanPham = optionalSanPham.get();
//	        
//	        // Cập nhật thông tin cho sản phẩm
//	        existingSanPham.setTen_san_pham(updatedSanPham.getTen_san_pham());
//	        existingSanPham.setGia_goc(updatedSanPham.getGia_goc());
//	        existingSanPham.setGia_km(updatedSanPham.getGia_km());
//	        existingSanPham.setMo_ta(updatedSanPham.getMo_ta());
//	        existingSanPham.setLuot_mua(updatedSanPham.getLuot_mua());
//	        existingSanPham.setPhantram_GG(updatedSanPham.getPhantram_GG());
//	        existingSanPham.setHan_gg(updatedSanPham.getHan_gg());
//	        existingSanPham.setHoat_dong(updatedSanPham.getHoat_dong());
//	        
//	        // Lưu sản phẩm đã được cập nhật vào cơ sở dữ liệu
//	        sanPhamRepository.save(existingSanPham);
//	        
//	        return ResponseEntity.ok(existingSanPham); // Trả về sản phẩm đã cập nhật
//	    } else {
//	        return ResponseEntity.notFound().build(); // Trả về 404 nếu không tìm thấy sản phẩm
//	    }
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
			@RequestParam("hoat_dong") String hoat_dong) {
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
	        
	        // Lưu sản phẩm đã được cập nhật vào cơ sở dữ liệu
	        sanPhamRepository.save(existingSanPham);
	        
	        return ResponseEntity.ok(existingSanPham); // Trả về sản phẩm đã cập nhật
	    } else {
	        return ResponseEntity.notFound().build(); // Trả về 404 nếu không tìm thấy sản phẩm
	    }
	}

}
