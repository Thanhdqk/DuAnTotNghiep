package com.BaiTapLab.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Repository.DanhMucRepository;

@RestController
@RequestMapping("/api/danhmuc")
@CrossOrigin(origins = "http://localhost:3000")
public class DanhMucRestController {
	@Autowired
	DanhMucRepository danhmucRepository;
	
//	@GetMapping("/tenloai")
//	public ResponseEntity<?> getListDanhMuc(){
//		List<Object[]> danhmuc = danhmucRepository.getTenLoaiDanhMuc();
//		
//		return ResponseEntity.ok(danhmuc);
//	}
	
	@GetMapping("/tenloai")
	public List<Map<String, Object>> getUsersWithAddress() {
	    List<Object[]> results = danhmucRepository.getTenLoaiDanhMuc();
	    
	    List<Map<String, Object>> response = new ArrayList <>();
	    
	    for (Object[] row : results) {
	        Map<String, Object> ten_loaiDM = new HashMap<>();
	        ten_loaiDM.put("ten_loaiDM", row[0]);
	        response.add(ten_loaiDM);
	    }
	    return response;
	}
}
