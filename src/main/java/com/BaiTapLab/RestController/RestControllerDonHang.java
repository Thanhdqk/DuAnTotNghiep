package com.BaiTapLab.RestController;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.DonHang;
import com.BaiTapLab.Repository.DonHangRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class RestControllerDonHang {

	@Autowired
	DonHangRepository donhangrepo;

	@ResponseBody
	@GetMapping("getalldonhang")
	public List<DonHang> getMethodName() {
		List<DonHang> list = donhangrepo.findAll();
		List<DonHang> listDonHang = new ArrayList<DonHang>();
		for (DonHang donHang : list) {
			if (donHang.getTrang_thai().equalsIgnoreCase("Đang xử lý")) {
				listDonHang.add(donHang);
			}
		}

		return listDonHang;
	}

}
