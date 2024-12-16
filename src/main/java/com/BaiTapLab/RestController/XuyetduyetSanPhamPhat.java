package com.BaiTapLab.RestController;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.HanhDong;
import com.BaiTapLab.Entity.NhapXuatSanPham;
import com.BaiTapLab.Entity.SanPham;
import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Repository.HanhDongRepository;
import com.BaiTapLab.Repository.NhaCungCapChiTietRepository;
import com.BaiTapLab.Repository.NhapXuatRepository;
import com.BaiTapLab.Repository.SanPhamRepository;
import com.BaiTapLab.Repository.UsersRepository;
import com.BaiTapLab.Service.SanPhamServiceLoi;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class XuyetduyetSanPhamPhat {

	@Autowired
	SanPhamServiceLoi  SanPhamService;
	@Autowired
	SanPhamRepository repository;
	@Autowired
	HanhDongRepository hanhDongRepository;
	@Autowired
	NhapXuatRepository nhapXuatSanPhamRepository;
	@Autowired
	NhaCungCapChiTietRepository nhaCungCapRepository;
	@Autowired
	UsersRepository usersRepository;
	

	@PostMapping("approveproduct")
	public SanPham approveproduct(@RequestParam String productid,@RequestParam String accountId) {
		
		Users user = usersRepository.findById(accountId).get();
		
		HanhDong hd = new HanhDong();
		SanPham sp = SanPhamService.FindProductByID(productid);
		sp.setNhap_hang("Đã nhập hàng");
		sp.setTrang_thai_kho("Đã vào kho");
		sp.setPhe_duyet("Đã phê duyệt");
		sp.setHoat_dong("On");
		repository.save(sp);
		
		NhapXuatSanPham nxsp = new NhapXuatSanPham();
		nxsp.setSanpham(sp);
		nxsp.setSo_luong(sp.getSo_luong());
		nxsp.setTrang_thai_nhap("Nhập hàng");
		nhapXuatSanPhamRepository.save(nxsp);
		
		hd.setSanpham(sp);
		hd.setTen_hanh_dong("Chấp nhận phê duyệt sản phẩm");
		hd.setNgay_hanh_dong(LocalDate.now());
		hd.setUsers(user);
		hanhDongRepository.save(hd); 
		
		return sp;
	}

	@PostMapping("notapprove")
	public SanPham notApprove(@RequestParam String productid,@RequestParam String ghichu,@RequestParam String accountId) {
		
		Users user = usersRepository.findById(accountId).get();
		
		SanPham sp = SanPhamService.FindProductByID(productid);
		sp.setGhi_chu(ghichu);
		System.out.println(ghichu);
		sp.setPhe_duyet("Bị từ chối");
		sp.setHoat_dong("Off");
		repository.save(sp);
		
		HanhDong hd = new HanhDong();
		hd.setSanpham(sp);
		hd.setTen_hanh_dong("Từ chối duyệt sản phẩm");
		hd.setNgay_hanh_dong(LocalDate.now());
		hd.setUsers(user);
		hanhDongRepository.save(hd);
		
		nhaCungCapRepository.removeFromNhaCungCapChiTiet(productid);
		
		return sp;
	}

}