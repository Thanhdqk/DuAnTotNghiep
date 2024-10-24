package com.BaiTapLab.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.BaiDang;
import com.BaiTapLab.Repository.BaiDangRepo;

@RestController
@CrossOrigin
@RequestMapping("baidang")
public class testbaidang {

	@Autowired
	BaiDangRepo baidangrepo;

	@GetMapping("filltable")
	public List<BaiDang> filltable() {
		List<BaiDang> listbaidang = baidangrepo.findAll();
		return listbaidang;
	}
	

}
