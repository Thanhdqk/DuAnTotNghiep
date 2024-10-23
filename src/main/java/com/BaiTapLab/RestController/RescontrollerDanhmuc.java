package com.BaiTapLab.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.DanhMuc;
import com.BaiTapLab.Service.DanhmucService;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class RescontrollerDanhmuc {
	
	@Autowired
	DanhmucService DanhmucService;
	
	@GetMapping("findAllCategory")
	public List<DanhMuc> getMethodName() {
		
		return  DanhmucService.FindALL();
		
	}
	
	// dùng để làm chức năng sản phẩm tương tự
	@GetMapping("findDanhMucBySanPhamId")
	public DanhMuc getMethodName(@RequestParam("id") String id) {
		
		DanhmucService.FindDanhMucByIDSanPham(id);
		
		return 	DanhmucService.FindDanhMucByIDSanPham(id);
	}
	
	
	
}
