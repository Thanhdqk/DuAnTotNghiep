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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.DonHang;
import com.BaiTapLab.Entity.DonHangChiTiet;
import com.BaiTapLab.Entity.SanPham;

import com.BaiTapLab.Repository.DonHangChiTietRepository;

import com.BaiTapLab.Repository.DiaChiRepository;

import com.BaiTapLab.Repository.GioHangRepository;
import com.BaiTapLab.Repository.SanphamRepository;

import com.BaiTapLab.Repository.DonHangRepository;
import com.BaiTapLab.Repository.UsersRepository;

import com.BaiTapLab.Service.DiaChiService;

import com.BaiTapLab.Service.SanPhamService;

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
	DonHangRepository donHangRepository;
	@Autowired
	UsersRepository usersRepository;
	@Autowired
	DiaChiRepository diaChiRepository;
	@Autowired
	DiaChiService diachiService;

	@Autowired
	DonHangChiTietRepository donHangChiTietService;
	@Autowired
	SanPhamService spService;
	@Autowired
	SanphamRepository SanphamRepository;
	@Autowired
	GioHangRepository gioHangRepository;

	@Autowired
	HttpServletRequest servletRequest;
	@Autowired
	ServletContext servletContext;
	@Autowired
	HttpSession httpSession;

	@RequestMapping(value = "/createpayment", method = RequestMethod.POST, produces = "application/json; charset=utf-8", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public String postMethodName(@RequestBody DonHang donhang, @RequestParam("userid") String userid,
			@RequestParam("spid") List<String> productids, @RequestParam("quantity") List<String> quantity,
			@RequestParam("total") String totalfee, @RequestParam("method") String paymentmethod,@RequestParam("paypalid")String paypalid)
			throws UnsupportedEncodingException {
		if (paymentmethod.equals("2")) {
			donhang.setDon_hangid("dh-"+paypalid);
		} else {
			donhang.setDon_hangid(getnew_donhangId() != null ? getnew_donhangId() : "dh001");
		}
		
		ajaxServlet vnpay = new ajaxServlet();
		
		donhang.setDiachi(diaChiRepository.findbyUserid(userid));
		System.out.println(donhang.getPhuongthuctt().getPhuong_thucTTID());

		System.out.println("dh: " + donhang.toString());

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
		String url = vnpay.createPayment(servletRequest, servletContext, httpSession, totalfee);
		System.out.println(list_dhct.get(0));
		System.out.println("Đơn hàng" + donhang.toString());
		System.out.println(productids);
		System.out.println(quantity);
		try {
			donHangRepository.save(donhang);
			for (DonHangChiTiet donHangChiTiet : list_dhct) {
				donHangChiTietService.save(donHangChiTiet);
			}
			for (int i = 0; i < productids.size(); i++) {
				SanPham sp = spService.FindProductByID(productids.get(i));
				sp.setSo_luong(sp.getSo_luong() - Integer.parseInt(quantity.get(i)));
				gioHangRepository.delete(gioHangRepository.findByUserIdAndSanPhamId(userid, productids.get(i)));
				SanphamRepository.save(sp);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}

	public String getnew_donhangId() {
		String idtemp = "dh0";
		int id = 0;
		try {
			if (donHangRepository.findlastedDH() == null) {
				return "dh001";
			} else {
				DonHang dh = donHangRepository.findlastedDH();
				String substring = dh.getDon_hangid().substring(Math.max(dh.getDon_hangid().length() - 1, 0));
				id = Integer.parseInt(substring) + 1;
				String.valueOf(id).length();
				String newid = dh.getDon_hangid().substring(Math
						.max(dh.getDon_hangid().length() - String.valueOf(id).length(), String.valueOf(id).length()))
						+ String.valueOf(id);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return idtemp + String.valueOf(id);
	}
	@PutMapping("updatestatus")
	public void UpdateStatus(@RequestParam("id")String paypalid) {
	    try {
	    	System.out.println("id :"+paypalid);
			DonHang dh = donHangRepository.findById(paypalid).get();
			System.out.println("find dh"+dh);
			dh.setTrang_thai("Đã thanh toán");
			donHangRepository.save(dh);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
