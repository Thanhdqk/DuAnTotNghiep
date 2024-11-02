package com.BaiTapLab.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.TestWallet;
import com.BaiTapLab.Service.TestWalletService;

@RestController
@RequestMapping("/api/wallet")
@CrossOrigin(origins = "http://localhost:3000")
public class TestWalletRescontroller {
	@Autowired
    private TestWalletService testWalletService;

	@PostMapping("/save")
	public ResponseEntity<TestWallet> saveWallet(@RequestBody TestWallet testWallet) {
	    TestWallet savedWallet = testWalletService.saveTransaction(testWallet);
	    return new ResponseEntity<>(savedWallet, HttpStatus.CREATED);
	}
    
    @PostMapping("/transfer")
    public ResponseEntity<String> transferFunds(@RequestBody TestWallet transferRequest) {
        // Tìm kiếm ví người dùng theo số tài khoản
        TestWallet wallet = testWalletService.findBySoTaiKhoan(transferRequest.getSo_tai_khoan());

        if (wallet == null) {
            return new ResponseEntity<>("Ví không tồn tại.", HttpStatus.NOT_FOUND);
        }

        // Cập nhật số dư
        wallet.setSo_tien(wallet.getSo_tien() + transferRequest.getSo_tien());
        testWalletService.saveTestWallet(wallet);

        return new ResponseEntity<>("Đã chuyển tiền vào ví thành công.", HttpStatus.OK);
    }
}
