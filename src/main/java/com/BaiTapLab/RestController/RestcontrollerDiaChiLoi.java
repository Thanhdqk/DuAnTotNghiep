
package com.BaiTapLab.RestController;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.DiaChi;
import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Repository.DiaChiRepository;
import com.BaiTapLab.Repository.UsersRepository;
import com.BaiTapLab.Service.DiaChiServiceLoi;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class RestcontrollerDiaChiLoi {

	@Autowired
	DiaChiServiceLoi DiaChiService;

	@Autowired
	UsersRepository UsersRepository;
	@Autowired
	DiaChiRepository diaChiRepository;

	@GetMapping("FindDiaChiByID")
	public List<DiaChi> FindDiaChiByID(@RequestParam("id") String id) {

		return DiaChiService.FindDiaChiByID(id);
	}

	@PostMapping("DiaChi/Add")
	public DiaChi addAddress(@RequestParam String name, @RequestParam String phone, @RequestParam String address,
			@RequestParam String iduser, @RequestParam String district, @RequestParam String ward) {
		Users user = UsersRepository.findByAccountID(iduser);
		DiaChi diachi = new DiaChi();
		List<DiaChi> list = new ArrayList<DiaChi>();
		try {
			
			list = diaChiRepository.getDiaChiByIdUser2(iduser);
					
			if (list.size() > 0) {
				System.out.println(list.size());
				System.out.println("cc");
				diachi.setBeingselected(false);
			} else {
				diachi.setBeingselected(true);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		diachi.setDia_chi(address);
		diachi.setQuan(district);
		diachi.setPhuong(ward);
		diachi.setThanh_pho("202");
		diachi.setUsers(user);

		return DiaChiService.AddDiaChi(diachi);
	}

	@PostMapping("Diachi/SelectThis")
	public String selectthis(@RequestParam("account_id") String account_id,
			@RequestParam("address_id") Integer address_id) {
		diaChiRepository.selectthisaddress(address_id, account_id);

		List<DiaChi> address = diaChiRepository.notselect(address_id, account_id);
		for (DiaChi diaChi : address) {
			diaChi.setBeingselected(false);
			diaChiRepository.save(diaChi);
		}

		return "ok";
	}

	@GetMapping("FindUserByid")
	public Users getMethodName(@RequestParam String id) {
		return UsersRepository.findByAccountID(id);
	}

	@DeleteMapping("DiaChi/Delete/{id}")
	public void DeleteDiaChi(@PathVariable("id") String id) {
		DiaChiService.Delete_DiaChi(id);
	}
}