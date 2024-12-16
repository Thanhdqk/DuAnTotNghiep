package com.BaiTapLab.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.ThuongHieu;
import com.BaiTapLab.Service.ThuongHieuService;


@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class RescontrollerThuongHieu {
	@Autowired
	ThuongHieuService ThuongHieuService;

	@GetMapping("ThuongHieu/FINDALL")
	public List<ThuongHieu> FINDALL() {
		return ThuongHieuService.FINDALL();
	}
	
	
}