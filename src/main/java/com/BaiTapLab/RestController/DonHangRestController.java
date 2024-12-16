package com.BaiTapLab.RestController;

import java.io.File;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.BaiTapLab.Entity.DonHang;
import com.BaiTapLab.Entity.SanPham;
import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Repository.DonHangRepository;
import com.BaiTapLab.Repository.UsersRepository;
import com.BaiTapLab.Service.DonHangService;
import com.BaiTapLab.Service.MailServiceThanh;
import com.BaiTapLab.Service.UsersService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000, http://localhost:19006"})
public class DonHangRestController {
	@Autowired
	DonHangService donhangService;
	
	@Autowired
	DonHangRepository donhangRepository;
	
	@Autowired
	UsersRepository usersRepository;
	
	@Autowired
	UsersService usersService;
	
	@Autowired
    private MailServiceThanh mailService;

	// Đơn hàng của Thành
	@PostMapping("/send")
    public String sendEmail(@RequestParam String to, @RequestParam String subject, @RequestParam String text) {
        try {
            mailService.sendEmail(to, subject, text);
            return "Email đã được gửi thành công!";
        } catch (Exception e) {
            return "Lỗi khi gửi email: " + e.getMessage();
        }
    }
	
	@GetMapping("/testne")
	public ResponseEntity<List<Object[]>> listtestne(){
		List<Object[]> listTestNe = donhangRepository.findSanPhamTheoThang11();
		return ResponseEntity.ok(listTestNe);
	}
	
	@GetMapping("/list/bestSeller/dashboard")
	public ResponseEntity<List<Map<String, Object>>> getAllBestSeller(@RequestParam(required = false) Integer thang,
	                                                                   @RequestParam(required = false) Integer nam) {
	    // Kiểm tra nếu tham số tháng và năm không được truyền thì sử dụng mặc định (ví dụ tháng 10, năm 2024)
	    if (thang == null) {
	        thang = 10;  // Tháng mặc định là 10
	    }
	    if (nam == null) {
	        nam = 2024;  // Năm mặc định là 2024
	    }

	    // Lấy danh sách sản phẩm bán chạy
	    List<Object[]> bestSeller = donhangRepository.listSanPhamBestSeller(thang, nam);

	    // Xử lý kết quả để trả về định dạng dễ đọc hơn
	    List<Map<String, Object>> response = new ArrayList<>();
	    for (Object[] row : bestSeller) {
	        Map<String, Object> item = new HashMap<>();
	        item.put("thang", row[0]);
	        item.put("nam", row[1]);
	        item.put("sanPhamId", row[2]);
	        item.put("tenSanPham", row[3]);
	        item.put("giaGoc", row[4]);
	        item.put("tenHinh", row[5]);
	        item.put("tongSoLuong", row[6]);
	        response.add(item);
	    }
	    return ResponseEntity.ok(response);
	}

	@GetMapping("/donhang/getAll")
	public ResponseEntity<List<Map<String, Object>>> getAllList(){
		List<Object[]> donhang = donhangRepository.listAllDonHang();
		List<Map<String, Object>> result = new ArrayList<>();
		for (Object[] obj : donhang) {
            Map<String, Object> map = new HashMap<>();
            map.put("don_hangid", obj[0]);
            map.put("accountID", obj[1]);
            map.put("so_dien_thoai", obj[2]);
            map.put("ngay_tao", obj[3]);
            map.put("thoi_gianXN", obj[4]);
            map.put("trang_thai", obj[5]);
            map.put("tong_tien", obj[6]);
            map.put("phuong_thucTT", obj[7]);
            map.put("online_payment_id", obj[8]);
            result.add(map);
        }
		return ResponseEntity.ok(result);
	}
	
	@PutMapping("/donhang/hoantien")
    public ResponseEntity<?> updateTrangThai(@RequestParam String online_payment_id) {
        int rowsUpdated = donhangRepository.updateHoanTien("Đã hoàn tiền", online_payment_id);
        if (rowsUpdated > 0) {
            return ResponseEntity.ok("Cập nhật trạng thái thành công.");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy đơn hàng.");
    }
	
	@GetMapping("/getTotal")
	public ResponseEntity<Integer> getTotal() {
		Integer total = donhangService.getTotalDonHang();
		return ResponseEntity.ok(total);
	}
	
	@GetMapping("/getDoanhThu")
	public ResponseEntity<Double> getDoanhThu() {
		Double total = donhangService.getDoanhThu();
		return ResponseEntity.ok(total);
	}
	
	@GetMapping("/getKhachHang")
	public ResponseEntity<Integer> getKhachHang() {
		Integer total = donhangService.getKhachHang();
		return ResponseEntity.ok(total);
	}
	
	@GetMapping("/getLoiNhuan")
	public ResponseEntity<Double> getLoiNhuan() {
		Double total = donhangService.getLoiNhuan();
		return ResponseEntity.ok(total);
	}
	
	@GetMapping("/getDoanhThuChart")
	public ResponseEntity<Double[]> getDoanhThuChart(@RequestParam("year") int year) {
	    Double[] monthlyRevenues = new Double[12];
	    String trangThai = "Đã giao";
	    // Lặp qua từng tháng để lấy doanh thu
	    for (int month = 1; month <= 12; month++) {
	        monthlyRevenues[month - 1] = donhangRepository.getDoanhThuByMonthAndYear(month, year, trangThai);
	    }
	    
	    return ResponseEntity.ok(monthlyRevenues);
	}

	@GetMapping("/getTrangThaiDonHang")
	public ResponseEntity<Map<String, Long>> getTrangThaiDonHang(
	        @RequestParam int month, 
	        @RequestParam int year) {
	    try {
	        List<Object[]> results = donhangRepository.countByTrangThaiAndMonthAndYear(month, year);
	        Map<String, Long> statusCount = new HashMap<>();
	        
	        for (Object[] result : results) {
	            String status = (String) result[0];
	            Long count = (Long) result[1];
	            statusCount.put(status, count);
	        }
	        
	        return ResponseEntity.ok(statusCount);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	    }
	}
	
	@GetMapping("/getDoanhThuDateToDate")
	public ResponseEntity<List<Map<String, Object>>> getDoanhThu(
	        @RequestParam("startDate") LocalDate startDate,
	        @RequestParam("endDate") LocalDate endDate,
	        @RequestParam("trangThai") String trangThai) {
	    List<Map<String, Object>> doanhThuList = donhangRepository.getDoanhThuByDateRange(startDate, endDate, trangThai);
	    return ResponseEntity.ok(doanhThuList);
	}
	
	@GetMapping("/edit/donhang/{don_hangid}")
	public List<Object[]> getDonHangDetailsById(@PathVariable("don_hangid") String don_hangid) {
        return donhangRepository.getDonHangDetailById(don_hangid);
	}
	
	@PutMapping("/update/trangthai/{don_hangid}")
	public ResponseEntity<String> updateTrangThaiDonHang(
	        @PathVariable String don_hangid,
	        @RequestBody Map<String, String> requestBody) {
	    String trang_thai = requestBody.get("trang_thai"); // Lấy giá trị trang_thai từ request body

	    int result = donhangRepository.updateTrangThaiDonHang(trang_thai, don_hangid);

	    if (result > 0) {
	        return ResponseEntity.ok("Cập nhật trạng thái đơn hàng thành công");
	    } else {
	        return ResponseEntity.status(404).body("Không tìm thấy đơn hàng");
	    }
	}
	
	@PutMapping("/update/trangthai/ngayXacNhan/{don_hangid}")
	public ResponseEntity<String> updateTrangThaiDonHangNgayXacNhan(
	        @PathVariable String don_hangid,
	        @RequestBody Map<String, String> requestBody) {
	    String trang_thai = requestBody.get("trang_thai");
	    String thoi_gianXNStr = requestBody.get("thoi_gianXN");

	    LocalDate thoi_gianXN = null ;
	    if ("Đã xác nhận".equals(trang_thai) && thoi_gianXNStr != null && !thoi_gianXNStr.isEmpty()) {
	        try {
	            thoi_gianXN = LocalDate.parse(thoi_gianXNStr);
	            System.out.println("Ngày xác nhận: " + thoi_gianXN);
	        } catch (DateTimeParseException e) {
	            System.err.println("Lỗi khi phân tích ngày xác nhận: " + e.getMessage());
	            return ResponseEntity.badRequest().body("Ngày xác nhận không hợp lệ");
	        }
	    }

	    int result = donhangRepository.updateTrangThaiDonHangDaXacNhan(trang_thai, thoi_gianXN, don_hangid);

	    if (result > 0) {
	        return ResponseEntity.ok("Cập nhật trạng thái đơn hàng thành công");
	    } else {
	        return ResponseEntity.status(404).body("Không tìm thấy đơn hàng");
	    }
	}
	
	@GetMapping("/list/donHangChuaNhan")
	public ResponseEntity<List<Object[]>> listDonChuaNhan(){
		List<Object[]> listDonHangChuaNhan = donhangRepository.danhSachChuaNhanDon("Đã xác nhận");
		return ResponseEntity.ok(listDonHangChuaNhan);
	}
	
	@GetMapping("/list/donHangDaNhan")
	public ResponseEntity<List<Object[]>> listDonDaNhan(
			@RequestParam("shipperid") String shipperid){
		List<Object[]> listDonHangDaNhan = donhangRepository.findDonHangByShipperId(shipperid, "Đã nhận đơn");
		return ResponseEntity.ok(listDonHangDaNhan);
	}
	
	@GetMapping("/list/donHangDaGiao")
	public ResponseEntity<List<Object[]>> listDonDaGiao(
			@RequestParam("shipperid") String shipperid){
		List<Object[]> listDonHangDaNhan = donhangRepository.findDaGiaoByShipperID(shipperid, "Đã hoàn thành đơn");
		return ResponseEntity.ok(listDonHangDaNhan);
	}
	
	@GetMapping("/list/count/donHangChuaNhan")
	public ResponseEntity<Integer> listCountDonChuaNhan(){
		int listDonHangDaNhan = donhangRepository.soLuongHangChuaNhan();
		return ResponseEntity.ok(listDonHangDaNhan);
	}
	
	@GetMapping("/list/count/donHangDaNhan")
	public ResponseEntity<Integer> listCountDonDaNhan(@RequestParam("shipperid") String shipperid){
		int listDonHangDaNhan = donhangRepository.soLuongHangDaNhan(shipperid);
		return ResponseEntity.ok(listDonHangDaNhan);
	}
	
	@GetMapping("/list/count/donHangDaGiao")
	public ResponseEntity<Integer> listCountDonDaGiao(@RequestParam("shipperid") String shipperid){
		int listDonHangDaNhan = donhangRepository.soLuongHangDaGiao(shipperid);
		return ResponseEntity.ok(listDonHangDaNhan);
	}
	
	
	@GetMapping("/detail/donhang/{donhangid}")
	public ResponseEntity<List<Object[]>> getDonHangDetails(@PathVariable String donhangid) {
		//System.out.println("Ma don hang nhan duoc tu request: " + donhangid);
	    List<Object[]> donHangDetails = donhangService.getDonHangDetails(donhangid);
	    // In ra console để kiểm tra dữ liệu
//	    if (donHangDetails != null && !donHangDetails.isEmpty()) {
//	        System.out.println("Dữ liệu chi tiết đơn hàng: ");
//	        for (Object[] detail : donHangDetails) {
//	            System.out.println("Ma don hang: " + detail[0]);
//	        }
//	    } else {
//	        System.out.println("Không có dữ liệu cho đơn hàng với mã: " + donhangid);
//	    }
	    
	    // Trả về ResponseEntity chứa dữ liệu
	    return ResponseEntity.ok(donHangDetails);
	}
	
	@PutMapping("/update/shipper/nhandon")
	public ResponseEntity<String> updateDonHang(
	        @RequestParam("shipperid") String shipperid,
	        @RequestParam("don_hangid") String don_hangid) {
		System.out.println("ShipperID: " + shipperid);
		System.out.println("DonHangID: " + don_hangid);
	    try {
	        // Gọi phương thức cập nhật từ repository
	        int rowsUpdated = donhangRepository.updateDonHangShipper("Đang giao", shipperid, "Đã nhận đơn", don_hangid);
	        System.out.println("ShipperID: " + shipperid);
	        System.out.println("DonHangID: " + don_hangid);
	        if (rowsUpdated > 0) {
	            return ResponseEntity.ok("Cập nhật trạng thái đơn hàng thành công!");
	        } else {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                    .body("Không tìm thấy đơn hàng với ID: " + don_hangid);
	        }
	    } catch (Exception ex) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Lỗi khi cập nhật đơn hàng: " + ex.getMessage());
	    }
	}
	
	@PutMapping("/update/shipper/hoanthanh")
	public ResponseEntity<String> updateDonHangHoanThanh(
	        @RequestParam("don_hangid") String don_hangid) {
		System.out.println("DonHangID: " + don_hangid);
	    try {
	        // Gọi phương thức cập nhật từ repository
	        int rowsUpdated = donhangRepository.updateDonHangHoanThanhShipper("Đã giao", "Đã hoàn thành đơn", don_hangid);
	        System.out.println("DonHangID: " + don_hangid);
	        if (rowsUpdated > 0) {
	            return ResponseEntity.ok("Cập nhật trạng thái đơn hàng thành công!");
	        } else {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                    .body("Không tìm thấy đơn hàng với ID: " + don_hangid);
	        }
	    } catch (Exception ex) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Lỗi khi cập nhật đơn hàng: " + ex.getMessage());
	    }
	}

	
	@PutMapping("/update/shipper/huydonhang/tructiep")
	public ResponseEntity<String> updateHuyDonHang(
	        @RequestParam("don_hangid") String don_hangid,
	        @RequestParam("ly_do") String ly_do,
	        @RequestParam("accountID") String accountID) {
		System.out.println("DonHangID: " + don_hangid + ", Lý do: " + ly_do);
		
	    try {
	        int rowsUpdated = donhangRepository.updateDonHangBiHuyShipper("Đã hủy", "Khách không nhận đơn", ly_do, don_hangid);
	        System.out.println("DonHangID: " + don_hangid);
	        Users users = usersService.findByAccountID(accountID);
	        if (users != null) {
	            // Kiểm tra giá trị vi_pham
	            Integer viPhamHienTai = users.getVi_pham();
	            if (viPhamHienTai == null) {
	                users.setVi_pham(1); // Nếu chưa có, gán bằng 1
	            } else {
	                users.setVi_pham(viPhamHienTai + 1); // Nếu đã có, tăng thêm 1
	            }
	            usersRepository.save(users); // Lưu cập nhật vào cơ sở dữ liệu
	        } else {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                    .body("Không tìm thấy người dùng với ID: " + accountID);
	        }
	        if (rowsUpdated > 0) {
	            return ResponseEntity.ok("Cập nhật trạng thái đơn hàng thành công!");
	        } else {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                    .body("Không tìm thấy đơn hàng với ID: " + don_hangid);
	        }
	    } catch (Exception ex) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Lỗi khi cập nhật đơn hàng: " + ex.getMessage());
	    }
	}
	
	@PutMapping("/update/shipper/huydonhang/tructuyen")
	public ResponseEntity<String> updateHuyDonHang(
	        @RequestParam("don_hangid") String don_hangid,
	        @RequestParam("ly_do") String ly_do) {
		System.out.println("DonHangID: " + don_hangid + ", Lý do: " + ly_do);
		
	    try {
	        int rowsUpdated = donhangRepository.updateDonHangBiHuyShipper("Đã hủy", "Khách không nhận đơn", ly_do, don_hangid);
	        System.out.println("DonHangID: " + don_hangid);
	        if (rowsUpdated > 0) {
	            return ResponseEntity.ok("Cập nhật trạng thái đơn hàng thành công!");
	        } else {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                    .body("Không tìm thấy đơn hàng với ID: " + don_hangid);
	        }
	    } catch (Exception ex) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Lỗi khi cập nhật đơn hàng: " + ex.getMessage());
	    }
	}
	
	@PutMapping("/update/shipper/hinhanh")
	public ResponseEntity<String> updateDonHangHinhAnh(
	        @RequestParam("don_hangid") String don_hangid,
	        @RequestParam("hinh_anh") MultipartFile hinh_anh) {
	    System.out.println("DonHangID: " + don_hangid);

	    // Kiểm tra hình ảnh
	    if (hinh_anh == null || hinh_anh.isEmpty()) {
	        return ResponseEntity.badRequest().body("Không có hình ảnh nào được tải lên!");
	    }

	    try {
	        // Đường dẫn lưu ảnh
	        String uploadDir = System.getProperty("user.dir") + "/uploads/images/";

	        // Kiểm tra và tạo thư mục nếu chưa có
	        File uploadDirectory = new File(uploadDir);
	        if (!uploadDirectory.exists()) {
	            uploadDirectory.mkdirs();
	        }

	        // Lấy tên ảnh từ MultipartFile
	        String imageName = hinh_anh.getOriginalFilename();
	        if (imageName == null || imageName.isEmpty()) {
	            return ResponseEntity.badRequest().body("Tên ảnh không hợp lệ!");
	        }

	        // Lưu ảnh vào thư mục với tên mới
	        File imageFile = new File(uploadDir + imageName);
	        hinh_anh.transferTo(imageFile);

	        // URL truy cập ảnh (thay đổi phù hợp với môi trường của bạn)
	        String imageUrl = "http://localhost:8080/images/" + imageName;

	        // Cập nhật đường dẫn ảnh vào cơ sở dữ liệu
	        int rowsUpdated = donhangRepository.updateDonHangHinhAnhShipper(imageName, don_hangid);

	        if (rowsUpdated > 0) {
	            return ResponseEntity.ok("Cập nhật hình ảnh đơn hàng thành công!");
	        } else {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                    .body("Không tìm thấy đơn hàng với ID: " + don_hangid);
	        }

	    } catch (Exception ex) {
	        ex.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Lỗi khi cập nhật hình ảnh đơn hàng: " + ex.getMessage());
	    }
	}
	
	@GetMapping("/donhang/hinhanh/{donhangid}")
    public ResponseEntity<String> getHinhAnh(@PathVariable String donhangid) {
        String hinhAnh = donhangRepository.findHinhAnhByDonHangId(donhangid);
        return ResponseEntity.ok(hinhAnh);
    }

}
