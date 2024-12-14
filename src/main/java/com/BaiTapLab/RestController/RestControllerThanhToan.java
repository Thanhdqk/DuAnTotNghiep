package com.BaiTapLab.RestController;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
import com.BaiTapLab.Entity.NhapXuatSanPham;
import com.BaiTapLab.Entity.SanPham;
import com.BaiTapLab.Entity.UserWallet;
import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Entity.Voucher;
import com.BaiTapLab.Repository.DiaChiRepository;
import com.BaiTapLab.Repository.DonHangChiTietRepository;
import com.BaiTapLab.Repository.DonHangRepository;
import com.BaiTapLab.Repository.GioHangRepository;
import com.BaiTapLab.Repository.NhapXuatSanPhamRepository;
import com.BaiTapLab.Repository.SanphamRepository;
import com.BaiTapLab.Repository.UserWalletRepository;
import com.BaiTapLab.Repository.UsersRepository;
import com.BaiTapLab.Repository.VoucherRepository;
import com.BaiTapLab.Service.DiaChiService;
import com.BaiTapLab.Service.MailerService;
import com.BaiTapLab.Service.SanPhamService;
import com.BaiTapLab.Service.ajaxServlet;

import jakarta.mail.MessagingException;
import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
//@RequestMapping("api/Pay")
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
	@Autowired
	NhapXuatSanPhamRepository nhapXuatSanPhamRepository;
	@Autowired
	UserWalletRepository userWalletRepository;
	@Autowired
	VoucherRepository voucherRepository;

	@RequestMapping(value = "/createpayment", method = RequestMethod.POST, produces = "application/json; charset=utf-8", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public String postMethodName(@RequestBody DonHang donhang, @RequestParam("userid") String userid,
			@RequestParam("spid") List<String> productids, @RequestParam("quantity") List<String> quantity,
			@RequestParam("total") String totalfee, @RequestParam("method") String paymentmethod,
			@RequestParam("paypalid") String paypalid) throws UnsupportedEncodingException {

		ajaxServlet vnpay = new ajaxServlet();
		String date = new java.text.SimpleDateFormat("MM/dd/yyyy")
				.format(new java.util.Date(Long.parseLong(donhang.thoi_gian_du_kien) * 1000));
		System.out.println("du kien : " + new java.util.Date(Long.parseLong(donhang.thoi_gian_du_kien) * 1000));
		System.out.println("du kien : " + Integer.parseInt(donhang.thoi_gian_du_kien));
		String status = "OK";
//		if (paymentmethod.equals("2")) {
//			donhang.setDon_hangid("dh-" + paypalid);
//		} else {
//			donhang.setDon_hangid(getnew_donhangId() != null ? getnew_donhangId() : "dh001");
//			donhang.setTrang_thai("Đang xử lý");
//		}'
		donhang.setOnline_payment_id(paypalid);
		donhang.setDiachi(diaChiRepository.findbyUserid(userid));
		donhang.setUsers(userrepo.findById(userid).get());
//		System.out.println("userid : " + userid);
//		System.out.println(donhang.getPhuongthuctt().getPhuong_thucTTID());
//		System.out.println("dh : " + donhang.toString());
		NhapXuatSanPham nhapXuatSanPham = new NhapXuatSanPham();
		List<NhapXuatSanPham> listnhapXuatSanPham = new ArrayList<NhapXuatSanPham>();
		Users user = userrepo.findByAccountID(userid);
		System.out.println(user.getAccountID());
		List<DonHangChiTiet> list_dhct = new ArrayList<DonHangChiTiet>();
		for (int i = 0; i < productids.size(); i++) {
			DonHangChiTiet dhct = new DonHangChiTiet();
			dhct.setDonhang(donhang);
			dhct.setSo_luong(Integer.parseInt(quantity.get(i)));
			dhct.setSanpham(spService.FindProductByID(productids.get(i)));
			nhapXuatSanPham.setSanpham(spService.FindProductByID(productids.get(i)));
			nhapXuatSanPham.setSo_luong(Integer.parseInt(quantity.get(i)));
			nhapXuatSanPham.setTrang_thai_xuat("Xuất hàng");
			listnhapXuatSanPham.add(nhapXuatSanPham);
			dhct.setTong_tien(Double.parseDouble(totalfee));
			list_dhct.add(dhct);
		}
//		System.out.println(vnpay.createPayment(servletRequest, servletContext, httpSession, totalfee));
		String url = vnpay.createPayment(servletRequest, servletContext, httpSession, totalfee);
		System.out.println(list_dhct.get(0).getId());
		System.out.println("Đơn hàng" + donhang.getDon_hangid());
		System.out.println(productids);
		System.out.println(quantity);
		Map<String, Object> model = new HashMap();
		model.put("donhangid", donhang.getDon_hangid());
		model.put("tongtien", donhang.getTong_tien());
		try {
			System.out.println("lưu");
			donHangRepository.save(donhang);
			Voucher usedvoucher = new Voucher();
			if (donhang.getVoucher() != null) {
				System.out.println("found voucher !");
				usedvoucher = voucherRepository.findById(donhang.getVoucher().getVoucherID()).get();
				usedvoucher.setSo_luot_SD(usedvoucher.getSo_luot_SD() - 1);
				voucherRepository.save(usedvoucher);
			}
			List<String> sp1 = new ArrayList<String>();
			List<Integer> sp2 = new ArrayList<Integer>();
			for (DonHangChiTiet donHangChiTiet : list_dhct) {
				donHangChiTietService.save(donHangChiTiet);
			}
			for (int i = 0; i < productids.size(); i++) {
				SanPham sp = spService.FindProductByID(productids.get(i));
				nhapXuatSanPhamRepository.save(listnhapXuatSanPham.get(i));
				sp1.add(sp.getTen_san_pham() + " ------ Số lượng: " + quantity.get(i) + " ------ Thành tiền :  "
						+ Integer.parseInt(quantity.get(i)) * (sp.phantram_GG > 0 ? sp.getGia_km() : sp.getGia_goc())
						+ " VND");
				sp2.add(sp.getSo_luong());
//				model.put("tensp " + i, sp.getTen_san_pham());
//				model.put("spquantity " + i, sp.getSo_luong());
				sp.setSo_luong(sp.getSo_luong() - Integer.parseInt(quantity.get(i)));
				GioHang gh = gioHangRepository.findByUserIdAndSanPhamId(userid, productids.get(i));
//				System.out.println("giỏ hang " + gh.getId() +" "+ gh.getGioHangChiTiet().get(i).getId() + " "+ gh.getGioHangChiTiet().get(i).getSanPham().getTen_san_pham());
//				gioHangRepository.delete(gioHangRepository.findByUserIdAndSanPhamId(userid, productids.get(i)));
				gioHangRepository.removeProductFromGioHang(userid, productids.get(i));
				SanphamRepository.save(sp);
			}
			model.put("products", sp1);
			model.put("estimateddate", String.valueOf(date));
			model.put("PayMentMethod", paymentmethod.equals("1") ? "Thanh toán khi nhận hàng"
					: paymentmethod.equals("2") ? "Thanh toán thông qua paypal" : "Thanh toán thông qua VNpay");
			model.put("shippingfee", donhang.getPhi_ship());
			context.setAttribute("model", model);
			status = "all set";
			if (paymentmethod.equals("3")) {
				return url;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return status;
	}

	@PostMapping("sendmail")
	public ResponseEntity<MailInfo> sendmailmethod(@RequestParam("accountid") String accountid) {
		MailInfo mail1 = new MailInfo(accountid, "Thông báo thanh toán đơn hàng",
				mailerService.bodyTemplate((Map<String, Object>) context.getAttribute("model")));
		try {
			mailerService.send(mail1);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
		System.out.println("mail sent");
		return new ResponseEntity<MailInfo>(HttpStatus.OK);
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
	public void UpdateStatus1(@RequestParam("id") String paypalid) {
		try {
			System.out.println("id :" + paypalid);
			DonHang dh = donHangRepository.findbypaymentid(paypalid);
			System.out.println("find dh" + dh);
			dh.setTrang_thai("Đang chờ xử lý");
			donHangRepository.save(dh);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@PutMapping("updatastatusvnpay")
	public void UpdateStatus2(@RequestParam("id") String id) {
		try {
			System.out.println("id :" + id);
			DonHang dh = donHangRepository.findById(id).get();
			dh.setOnline_payment_id((String) context.getAttribute("vnpaycode"));
//			System.out.println("vnpay id: " + context.getAttribute("vnpaycode"));
//			System.out.println("find dh" + dh);
			dh.setTrang_thai("Đang xử lý");
			donHangRepository.save(dh);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@PostMapping("saveuserwallet")
	public UserWallet savewalletinfo(@RequestParam String userid, @RequestParam String walletid) {
		List<String> userids = userWalletRepository.getuserthathavewallet();
	
		UserWallet userWallet = new UserWallet();
		for (String string : userids) {
			if (!userid.equals(string)) {
				Users u = userrepo.findByAccountID(userid);
				userWallet.setUsers(u);
				userWallet.setSo_tai_khoan(walletid);
				userWallet.setSo_du(0);
				userWalletRepository.save(userWallet);
				return userWallet;
			}
		}
		return null;
	}

	@ResponseBody
	@GetMapping("getgiohang")
	public DonHang getgiohang() {
		DonHang dh = donHangRepository.findlastedDH();
		return dh;
	}

	@PostMapping("repayVNpay")
	public String payVNpay(@RequestParam("total") String totalfee) throws UnsupportedEncodingException {
		ajaxServlet vnpay = new ajaxServlet();
		String url = vnpay.createPayment(servletRequest, servletContext, httpSession, totalfee);
		return url;
	}

}
