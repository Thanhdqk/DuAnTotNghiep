package com.BaiTapLab.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.DanhGia;
import com.BaiTapLab.Service.DanhGiaService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class RescontrollerDangGia {
	
	@Autowired
	DanhGiaService DanhGiaService;
	
	@GetMapping("FindDangGiaByIdSanPham")
	public List<DanhGia> FindDangGiaByIdSanPham(@RequestParam("id") String id) {
		
		
		return DanhGiaService.FindDanhGiaByIdSanPham(id);
		
	}
	
}
