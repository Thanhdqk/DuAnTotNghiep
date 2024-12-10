package com.BaiTapLab.RestController;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.DTO.DanhGiaDTO;
import com.BaiTapLab.DTO.SanPhamDTO;
import com.BaiTapLab.Entity.DanhGia;
import com.BaiTapLab.Entity.HanhDong;
import com.BaiTapLab.Entity.SanPham;
import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Repository.DanhGiaRepository;
import com.BaiTapLab.Repository.HanhDongRepository;
import com.BaiTapLab.Repository.UsersRepository;

@RestController
@RequestMapping("/api/danhgia")
@CrossOrigin(origins = "http://localhost:3000")
public class DanhGiaRestController {
	@Autowired
	DanhGiaRepository danhgiaRepository;
	
	@Autowired
	HanhDongRepository hanhDongRepository;
	
	@Autowired
	UsersRepository usersRepository;
	
	// Đánh giá của Thành
	@GetMapping("/list/chuaphanhoi")
	public ResponseEntity<List<Map<String, Object>>> getListChuaPhanHoi() {
	    List<Object[]> listDanhgia = danhgiaRepository.listChuaPhanHoi();
	    List<Map<String, Object>> result = new ArrayList<>();
	    
	    for (Object[] obj : listDanhgia) {
	        Map<String, Object> map = new HashMap<>();
	        map.put("danh_giaID", obj[0]);
	        map.put("noi_dung", obj[1]);
	        map.put("so_sao", obj[2]);
	        map.put("hinh_anh", obj[3]);
	        map.put("ngay_tao", obj[4]);
	        map.put("hoat_dong", obj[5]);
	        map.put("trang_thaiPH", obj[6]);
	        map.put("accountID", obj[7]);
	        map.put("san_phamId", obj[8]);
	        result.add(map);
	    }

	    return ResponseEntity.ok(result);
	}
	
	@GetMapping("/list/nhatky")
	public ResponseEntity<List<Map<String, Object>>> getListNhatKy() {
	    List<Object[]> listDanhgia = danhgiaRepository.listNhatKy();
	    List<Map<String, Object>> result = new ArrayList<>();
	    
	    for (Object[] obj : listDanhgia) {
	        Map<String, Object> map = new HashMap<>();
	        map.put("ten_hanh_dong", obj[0]);
	        map.put("ngay_hanh_dong", obj[1]);
	        map.put("danh_giaID", obj[2]);
	        map.put("accountID", obj[3]);
	        result.add(map);
	    }

	    return ResponseEntity.ok(result);
	}
	
	@PutMapping("/show/{danh_giaID}")
    public ResponseEntity<String> showDanhGia(@PathVariable Integer danh_giaID,
    		@RequestBody Map<String, Object> payload) {
        try {
        	String accountID = (String) payload.get("accountID");
            danhgiaRepository.showDanhGia(danh_giaID);
            DanhGia danhgia = danhgiaRepository.findById(danh_giaID)
                    .orElseThrow(() -> new RuntimeException("DanhGia không tồn tại"));

            HanhDong hanhdong = new HanhDong();
            hanhdong.setDanhgia(danhgia);
            hanhdong.setNgay_hanh_dong(LocalDate.now());
            hanhdong.setTen_hanh_dong("On");
            hanhdong.setUsers(usersRepository.findById(accountID)
            		.orElseThrow(() -> new RuntimeException("Account không tồn tại")));
            hanhDongRepository.save(hanhdong);
            return ResponseEntity.ok("Cập nhật trạng thái thành công.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Lỗi khi cập nhật trạng thái.");
        }
    }
	
	@PutMapping("/disable/{danh_giaID}")
    public ResponseEntity<String> disableDanhGia(@PathVariable Integer danh_giaID,
    		@RequestBody Map<String, Object> payload) {
        try {
        	String accountID = (String) payload.get("accountID");
            danhgiaRepository.disableDanhGia(danh_giaID);
            DanhGia danhgia = danhgiaRepository.findById(danh_giaID)
                    .orElseThrow(() -> new RuntimeException("DanhGia không tồn tại"));
            HanhDong hanhdong = new HanhDong();
            hanhdong.setDanhgia(danhgia);
            hanhdong.setNgay_hanh_dong(LocalDate.now());
            hanhdong.setTen_hanh_dong("Off");
            hanhdong.setUsers(usersRepository.findById(accountID)
            		.orElseThrow(() -> new RuntimeException("Account không tồn tại")));
            hanhDongRepository.save(hanhdong);
            return ResponseEntity.ok("Cập nhật trạng thái thành công.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Lỗi khi cập nhật trạng thái.");
        }
    }
}
