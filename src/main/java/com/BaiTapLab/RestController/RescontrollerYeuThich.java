package com.BaiTapLab.RestController;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.SanPham;
import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Entity.YeuThich;
import com.BaiTapLab.Repository.SanphamRepository;
import com.BaiTapLab.Repository.UsersRepository;
import com.BaiTapLab.Repository.YeuthichRepository;
import com.BaiTapLab.Service.YeuThichService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class RescontrollerYeuThich {
	
	@Autowired
	YeuThichService YeuThichService;
	
	
	@Autowired
	UsersRepository UsersRepository;
	
	@Autowired
	SanphamRepository SanphamRepository;
	@GetMapping("FindALL/{id}")
	public List<YeuThich> FindALL(@PathVariable("id") String id) {
		return YeuThichService.ListALLByid(id);
	}
	
	@GetMapping("checkyeuthich/{idsp}/{iduser}")
	public YeuThich check(@PathVariable("idsp") String idsp,@PathVariable("iduser") String iduser) {
		
		return YeuThichService.Check(idsp, iduser);
		
	}
	
	@PostMapping("ADD/Yeuthich")
	public YeuThich add(@RequestParam("idsp") String idsp,@RequestParam("iduser")String iduser) {
		
		System.out.println("id"+idsp);
		System.out.println("id"+iduser);
		SanPham sp = SanphamRepository.findSanPhamById(idsp);
		Users us = UsersRepository.findByAccountID(iduser);
		YeuThich existYeuThich  = YeuThichService.Check(idsp, iduser);
		YeuThich yt = new YeuThich();
		if(existYeuThich != null)
		{
			System.out.println(" tồn tài");
			return null;
		}
		else {
			
			
			yt.setSanpham(sp);
			yt.setUsers(us);
			return YeuThichService.ADD(yt);
			
		}
		
	}
	
	@GetMapping("DELETE/Yeuthich")
	public void getMethodName(@RequestParam("idyt")int id) {
		System.out.println("cccc"+id);
		YeuThichService.deleteBYID(id);
		
	}
	
	
	
}
