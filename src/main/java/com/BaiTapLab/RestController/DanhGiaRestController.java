package com.BaiTapLab.RestController;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.DanhGia;
import com.BaiTapLab.Repository.DanhGiaRepository;

@RestController
@RequestMapping("/api/danhgia")
@CrossOrigin(origins = "http://localhost:3000")
public class DanhGiaRestController {
	@Autowired
	DanhGiaRepository danhgiaRepository;
	
	@GetMapping("/list/chuaphanhoi")
	public ResponseEntity<List<DanhGia>> getListChuaPhanHoi(){
		List<DanhGia> danhgia = danhgiaRepository.findAll();
		return ResponseEntity.ok(danhgia);
	}
	
}
