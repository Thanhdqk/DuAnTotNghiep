package com.BaiTapLab.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Repository.NhaCungCapRepository;

@RestController
@RequestMapping("/api/nhacungcap")
public class NhaCungCapRestController {
	@Autowired
	NhaCungCapRepository nhacungcapRepository;
	
	@GetMapping("/list/theoTenSanPham")
	public List<Map<String, Object>> getTest(
			@RequestParam("ten_san_pham") String ten_san_pham){
		List<Object[]> listTest = nhacungcapRepository.findNhaCungCapTheoSanPham(ten_san_pham);
		List<Map<String, Object>> response = new ArrayList <>();
	    
	    for (Object[] row : listTest) {
	        Map<String, Object> ten_loaiDM = new HashMap<>();
	        ten_loaiDM.put("ten_nha_cung_cap", row[0]);
	        response.add(ten_loaiDM);
	    }
	    return response;
	}
	
}
