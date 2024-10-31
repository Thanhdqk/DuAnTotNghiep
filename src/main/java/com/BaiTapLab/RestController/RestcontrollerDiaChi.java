package com.BaiTapLab.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.DiaChi;
import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Repository.UsersRepository;
import com.BaiTapLab.Service.DiaChiService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class RestcontrollerDiaChi {
	
	@Autowired
	DiaChiService DiaChiService;
	
	@Autowired
	UsersRepository UsersRepository;
	
	@GetMapping("FindDiaChiByID")
	public List<DiaChi> FindDiaChiByID(@RequestParam("id") String id) {
		
		
		return  DiaChiService.FindDiaChiByID(id);
	}
	
	
	 @PostMapping("DiaChi/Add")
	    public DiaChi addAddress(@RequestParam String name,@RequestParam String phone,@RequestParam String address,@RequestParam String iduser) {
	       
		 Users user = UsersRepository.findByAccountID(iduser);
	      DiaChi diachi = new DiaChi();
	      diachi.setDia_chi(address);
	      diachi.setUsers(user);

	        return DiaChiService.AddDiaChi(diachi);
	    }
	 
	 @GetMapping("FindUserByid")
		public Users getMethodName(@RequestParam String id) {
			return UsersRepository.findByAccountID(id);
		}
}
