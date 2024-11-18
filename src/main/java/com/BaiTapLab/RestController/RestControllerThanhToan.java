package com.BaiTapLab.RestController;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.DonHang;
import com.BaiTapLab.Entity.DonHangChiTiet;
import com.BaiTapLab.Entity.GioHang;
import com.BaiTapLab.Entity.MailInfo;
import com.BaiTapLab.Entity.SanPham;
import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Repository.DiaChiRepository;
import com.BaiTapLab.Repository.DonHangChiTietRepository;
import com.BaiTapLab.Repository.DonHangRepository;
import com.BaiTapLab.Repository.GioHangRepository;
import com.BaiTapLab.Repository.SanphamRepository;
import com.BaiTapLab.Repository.UsersRepository;
import com.BaiTapLab.Service.DiaChiService;
import com.BaiTapLab.Service.MailerService;
import com.BaiTapLab.Service.SanPhamService;
import com.BaiTapLab.Service.ajaxServlet;

import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

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

	@Autowired
	MailerService mailerService;
	@Autowired
	ServletContext context;
	@Autowired
	UsersRepository userrepo;

	@RequestMapping(value = "/createpayment", method = RequestMethod.POST, produces = "application/json; charset=utf-8", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public DonHang postMethodName(@RequestBody DonHang donhang, @RequestParam("userid") String userid,
			@RequestParam("spid") List<String> productids, @RequestParam("quantity") List<String> quantity,
			@RequestParam("total") String totalfee, @RequestParam("method") String paymentmethod,
			@RequestParam("paypalid") String paypalid) throws UnsupportedEncodingException {

//		if (paymentmethod.equals("2")) {
//			donhang.setDon_hangid("dh-" + paypalid);
//		} else {
//			donhang.setDon_hangid(getnew_donhangId() != null ? getnew_donhangId() : "dh001");
//			donhang.setTrang_thai("Đang xử lý");
//		}
		donhang.setOnline_payment_id(paypalid);
		System.out.println("ma voucher: "+donhang);
		

		ajaxServlet vnpay = new ajaxServlet();

		donhang.setDiachi(diaChiRepository.findbyUserid(userid));

		System.out.println("userid : " + userid);
		System.out.println(donhang.getPhuongthuctt().getPhuong_thucTTID());
		System.out.println("dh : " + donhang.toString());

		Users user = userrepo.findByAccountID(userid);

		System.out.println(user.getAccountID());

		List<DonHangChiTiet> list_dhct = new ArrayList<DonHangChiTiet>();
		for (int i = 0; i < productids.size(); i++) {
			DonHangChiTiet dhct = new DonHangChiTiet();
			dhct.setDonhang(donhang);
			dhct.setSo_luong(Integer.parseInt(quantity.get(i)));
			dhct.setSanpham(spService.FindProductByID(productids.get(i)));
			dhct.setTong_tien(Double.parseDouble(totalfee));
			list_dhct.add(dhct);
		}

//		System.out.println(vnpay.createPayment(servletRequest, servletContext, httpSession, totalfee));
//		String url = vnpay.createPayment(servletRequest, servletContext, httpSession, totalfee);
		System.out.println(list_dhct.get(0).getId());
		System.out.println("Đơn hàng" + donhang.getDon_hangid());
		System.out.println(productids);
		System.out.println(quantity);
		try {
			donHangRepository.save(donhang);
			Map<String, Object> model = new HashMap();
			model.put("donhangid", donhang.getDon_hangid());
			model.put("tongtien", donhang.getTong_tien());

			for (DonHangChiTiet donHangChiTiet : list_dhct) {
				donHangChiTietService.save(donHangChiTiet);
			}
			for (int i = 0; i < productids.size(); i++) {
				SanPham sp = spService.FindProductByID(productids.get(i));
				model.put("tensp " + i, sp.getTen_san_pham());
				model.put("spquantity " + i, sp.getSo_luong());

				sp.setSo_luong(sp.getSo_luong() - Integer.parseInt(quantity.get(i)));
				GioHang gh = gioHangRepository.findByUserIdAndSanPhamId(userid, productids.get(i));
//				System.out.println("giỏ hang " + gh.getId() +" "+ gh.getGioHangChiTiet().get(i).getId() + " "+ gh.getGioHangChiTiet().get(i).getSanPham().getTen_san_pham());
//				gioHangRepository.delete(gioHangRepository.findByUserIdAndSanPhamId(userid, productids.get(i)));
				gioHangRepository.removeProductFromGioHang(userid, productids.get(i));

				SanphamRepository.save(sp);
			}
			try {
				MailInfo mail1 = new MailInfo(user.getAccountID(), "Mã OPT cho đơn thanh toán ",
						mailerService.bodyTemplate(model));
				mailerService.send(mail1);
				System.out.println("mail sent");
			} catch (Exception e) {
				e.printStackTrace();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return donhang;
	}

//	public String getnew_donhangId() {
//		String idtemp = "dh00";
//		int id = 0;
//		try {
//			if (donHangRepository.findlastedDH() == null) {
//				return "dh001";
//			} else {
//				DonHang dh = donHangRepository.findlastedDH();
//				String substring = dh.getDon_hangid().substring(Math.max(dh.getDon_hangid().length() - 1, 0));
//				id = Integer.parseInt(substring) + 1;
//				String.valueOf(id).length();
//				String newid = dh.getDon_hangid().substring(Math
//						.max(dh.getDon_hangid().length() - String.valueOf(id).length(), String.valueOf(id).length()))
//						+ String.valueOf(id);
//			}
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		return idtemp + String.valueOf(id);
//	}

	@PutMapping("updatestatus")
	public void UpdateStatus(@RequestParam("id") String paypalid) {
		try {
			System.out.println("id :" + paypalid);
			DonHang dh = donHangRepository.findbypaymentid(paypalid);
			System.out.println("find dh" + dh);
			dh.setTrang_thai("Đang xử lý");
			donHangRepository.save(dh);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@ResponseBody
	@GetMapping("getgiohang")
	public DonHang getgiohang() {
		DonHang dh = donHangRepository.findlastedDH();
		return dh;
	}

}
