package com.BaiTapLab.RestController;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.BaiDang;
import com.BaiTapLab.Service.BaiDangService;
import com.BaiTapLab.Service.BaiDangServiceLoi;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class RescontrollerBaiDangLoi {

	@Autowired
	BaiDangServiceLoi BaiDangService;
		@GetMapping("Find2NewBaiDang")
		public List<BaiDang> Find2NewBaiDang() {
			return BaiDangService.Find2new(PageRequest.of(0, 2));
		}
		
		@GetMapping("FindAllBaiDang")
		public List<BaiDang> FindAll() {
			return BaiDangService.FindALL();
		}
		
		@GetMapping("FindPostByid")
		public Optional<BaiDang> FindPostByid(@RequestParam("id") String id) {
			return BaiDangService.FindByID(id);
		}
}