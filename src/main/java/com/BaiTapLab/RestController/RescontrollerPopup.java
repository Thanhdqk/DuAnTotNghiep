package com.BaiTapLab.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.Popup;
import com.BaiTapLab.Repository.PopupRepository;
import com.BaiTapLab.Service.PopupService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class RescontrollerPopup {
	@Autowired
	PopupService PopupService;
	
	@GetMapping("FindAllPopUp")
	public List<Popup> getMethodName() {
		return PopupService.FindALL();
	}
	
	@GetMapping("FindAllPopUpSpare")
	public List<Popup> sparegetMethodName(@RequestParam("id") String id) {
		return PopupService.FindALLSpare("PopUp_1");
	}
	

}
