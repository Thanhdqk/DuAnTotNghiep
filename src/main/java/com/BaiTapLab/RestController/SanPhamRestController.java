package com.BaiTapLab.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.SanPham;
import com.BaiTapLab.Repository.SanPhamRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class SanPhamRestController {
	@Autowired
	SanPhamRepository sanPhamRepository;
	
	@GetMapping("/listSanPham")
	public ResponseEntity<List<SanPham>> getSanPham(){
		List<SanPham> listSanPham = sanPhamRepository.findAll();
		return ResponseEntity.ok(listSanPham);
	}
}
