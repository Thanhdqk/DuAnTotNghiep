package com.BaiTapLab.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.SanPham;
import com.BaiTapLab.Repository.SanphamRepository;
import com.BaiTapLab.Service.SanPhamService;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class XuyetduyetSanPham {

	@Autowired
	SanPhamService SanPhamService;
	@Autowired
	SanphamRepository repository;

	@PostMapping("approveproduct")
	public SanPham approveproduct(@RequestBody SanPham entity) {
		SanPham sp = SanPhamService.FindProductByID(entity.getSan_phamId());
		sp.setPhe_duyet("0");
		repository.save(sp);
		return entity;
	}

	@PostMapping("notapprove")
	public SanPham notApprove(@RequestBody SanPham entity) {
		SanPham sp = SanPhamService.FindProductByID(entity.getSan_phamId());
		System.out.println(entity.getGhi_chu());
		repository.save(sp);
		return entity;
	}

}
