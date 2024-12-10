package com.BaiTapLab.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.DTO.HanhDongDTO;
import com.BaiTapLab.Entity.HanhDong;
import com.BaiTapLab.Service.HanhDongService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class HanhDongRestController {

	@Autowired
	HanhDongService HanhDongService;
	
	@GetMapping("HanhDong/FindDanhMuc")
	public List<HanhDongDTO> getHanhDongByDanhMuc() {
		return HanhDongService.findHanhDongByDanhMuc();
	}
	
}