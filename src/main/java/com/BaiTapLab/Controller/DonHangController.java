package com.BaiTapLab.Controller;

import java.util.List;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.BaiTapLab.Entity.DonHang;
import com.BaiTapLab.Entity.Voucher;
import com.BaiTapLab.Repository.DonHangRepository;
import com.BaiTapLab.Repository.DonhangChiTietRepository;
import com.BaiTapLab.Service.DonHangService;
import com.BaiTapLab.Repository.VoucherRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class DonHangController {
	@Autowired
	private DonHangService donHangService;
	@Autowired
	private VoucherRepository voucherRepository;
	@Autowired
	private DonHangRepository donHangRepository;

	@GetMapping("/api/donhang")
	public List<DonHang> getDonHang(@RequestParam(required = false) String userId) {
		if (userId != null) {
			return donHangService.getDonHangByUserId(userId);
		}
		return donHangService.getAllDonHang();
	}

	@PutMapping("/api/donhang/cancel/{orderId}")
	public ResponseEntity<String> cancelOrder(@PathVariable String orderId,
			@RequestParam(required = false) String lyDo) {
		boolean canceled = donHangService.cancelOrder(orderId, lyDo);
		if (canceled) {
			return ResponseEntity.ok("Order canceled successfully.");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found or cannot be canceled.");
		}
	}
//	@PutMapping("/donhang/cancel/{orderId}")
//	public ResponseEntity<Void> cancelOrder(
//	    @PathVariable String orderId,
//	    @RequestParam String lyDo) {
//	    DonHang donHang = donHangRepository.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Order not found"));
//	    
//	    if (!donHang.getTrang_thai().equals("Đã Giao")) {
//	        donHang.setTrang_thai("Đã Hủy");
//	        donHang.setLy_do(lyDo);
//
//	        // Nếu đơn hàng có sử dụng voucher, cập nhật trạng thái voucher (nếu cần)
//	        if (donHang.getVoucher() != null) {
//	            Voucher voucher = donHang.getVoucher();
//	            voucherRepository.markAsUnused(voucher.getVoucherID());
//	        }
//
//	        donHangRepository.save(donHang);
//	    } else {
//	        throw new BadRequestException("Không thể hủy đơn hàng đã giao");
//	    }
//
//	    return ResponseEntity.noContent().build();
//	}

}
