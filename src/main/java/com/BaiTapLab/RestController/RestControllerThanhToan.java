package com.BaiTapLab.RestController;



import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.DonHang;
import com.BaiTapLab.Entity.DonHangChiTiet;
import com.BaiTapLab.Entity.SanPham;
import com.BaiTapLab.Repository.DiaChiRepository;
import com.BaiTapLab.Repository.GioHangRepository;
import com.BaiTapLab.Repository.SanphamRepository;
import com.BaiTapLab.Service.DiaChiService;
import com.BaiTapLab.Service.DonHangChiTietService;
import com.BaiTapLab.Service.DonHangService;
import com.BaiTapLab.Service.SanPhamService;
import com.BaiTapLab.Service.UsersService;
import com.BaiTapLab.Service.ajaxServlet;
import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import ch.qos.logback.core.joran.sanity.SanityChecker;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class RestControllerThanhToan {
	@Autowired
	DonHangService donhangService;
	@Autowired
	UsersService uservice;
	@Autowired
	DiaChiService diachiService;
	@Autowired
	DonHangChiTietService donHangChiTietService;
	@Autowired
	SanPhamService spService;
	@Autowired
	SanphamRepository SanphamRepository;
	@Autowired
	GioHangRepository gioHangRepository;
	@Autowired
	DiaChiRepository diaChiRepository;


	@Autowired
	HttpServletRequest servletRequest;
	@Autowired
	ServletContext servletContext;
	@Autowired
	HttpSession httpSession;
	

	@RequestMapping(value = "/createpayment", method = RequestMethod.POST, produces = "application/json; charset=utf-8", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public DonHang postMethodName(@RequestBody DonHang donhang, @RequestParam("userid") String userid,
			@RequestParam("spid") List<String> productids, @RequestParam("quantity") List<String> quantity,
			@RequestParam("total") String totalfee) throws UnsupportedEncodingException {

		ajaxServlet vnpay = new ajaxServlet();
		
		donhang.setDon_hangid(getnew_donhangId());
		donhang.setDiachi(diaChiRepository.getDiaChiByIdUser1(userid));
		List<DonHangChiTiet> list_dhct = new ArrayList<DonHangChiTiet>();
		for (int i = 0; i < productids.size(); i++) {
			DonHangChiTiet dhct = new DonHangChiTiet();
			dhct.setDonhang(donhang);
			dhct.setSo_luong(Integer.parseInt(quantity.get(i)));
			dhct.setSanpham(spService.FindProductByID(productids.get(i)));
			dhct.setTong_tien(Double.parseDouble(totalfee));
			list_dhct.add(dhct);
		}

		System.out.println(vnpay.createPayment(servletRequest, servletContext, httpSession, totalfee));
		
		System.out.println(list_dhct.get(0));
		System.out.println("Đơn hàng" + donhang.toString());
		System.out.println(productids);
		System.out.println(quantity);
		
		
//
//		try {
//			donhangService.save(donhang);
//			for (DonHangChiTiet donHangChiTiet : list_dhct) {
//				donHangChiTietService.save(donHangChiTiet);
//			}
//			for (int i = 0; i < productids.size(); i++) {
//				SanPham sp = spService.FindProductByID(productids.get(i));
//				sp.setSo_luong(sp.getSo_luong() - Integer.parseInt(quantity.get(i)));
//				gioHangRepository.delete(gioHangRepository.findByUserIdAndSanPhamId(userid, productids.get(i)));
//				SanphamRepository.save(sp);
//			}
//		} catch (Exception e) {
//			e.printStackTrace();
//		}

		return null;
	}

	public String getnew_donhangId() {
		DonHang dh = donhangService.findlastedDH();
		String substring = dh.getDon_hangid().substring(Math.max(dh.getDon_hangid().length() - 1, 0));
		int id = Integer.parseInt(substring) + 1;
		String.valueOf(id).length();
		String newid = dh.getDon_hangid().substring(
				Math.max(dh.getDon_hangid().length() - String.valueOf(id).length(), String.valueOf(id).length()))
				+ String.valueOf(id);
		String idtemp = "dh0";
		return idtemp + String.valueOf(id);
	}

}
