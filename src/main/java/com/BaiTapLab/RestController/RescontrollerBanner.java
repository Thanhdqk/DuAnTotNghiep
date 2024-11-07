package com.BaiTapLab.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.Banner;
import com.BaiTapLab.Service.BannerService;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class RescontrollerBanner {
	
	@Autowired
	BannerService BannerService;
	
	@GetMapping("FindAllBanner")
	public List<Banner> getMethodName() {
		return BannerService.FindALL();
	}
	
	
}
