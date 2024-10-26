package com.BaiTapLab.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.BaiTapLab.Entity.DonHang;
import com.BaiTapLab.Service.DonHangService;

@RestController
@CrossOrigin("*")
public class DonHangRestController {
    @Autowired
    private DonHangService donhangService;

    @GetMapping("/api/orders/{don_hangid}")
    public DonHang getOrderById(@PathVariable String don_hangid) {
        return donhangService.findByID(don_hangid);
    }

    // Phương thức áp dụng voucher vào đơn hàng
    @PostMapping("/api/orders/applyVoucher")
    public DonHang applyVoucher(@RequestParam String donHangId, @RequestParam String voucherId) {
        return donhangService.applyVoucherToOrder(donHangId, voucherId);
    }
    
    @PostMapping("/api/orders/cancelVoucher")
    public DonHang cancelVoucher(@RequestParam String donHangId) {
        return donhangService.cancelVoucher(donHangId);
    }
}
