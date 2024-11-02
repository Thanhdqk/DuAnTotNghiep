package com.BaiTapLab.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.UserWallet;
import com.BaiTapLab.Repository.UserWalletRepository;
import com.BaiTapLab.Repository.UsersRepository;
import com.BaiTapLab.Service.UserWalletService;
import com.paypal.base.rest.APIContext;

@RestController
@RequestMapping("/api/paypal")
@CrossOrigin(origins = "http://localhost:3000")
public class PaypalRestController {
//	@Autowired
//    private APIContext apiContext;
//	
//	@Autowired
//	UserWalletService userWalletService;
//	
//	@Autowired
//	UserWalletRepository userwalletRepository;
//	
//	@GetMapping("/test-connection")
//    public String testConnection() {
//        try {
//            // Kiểm tra kết nối với PayPal bằng cách gọi một API đơn giản
//            // Ví dụ: Lấy thông tin tài khoản
//            String accessToken = apiContext.getAccessToken();
//            return "Kết nối thành công, Access Token: " + accessToken;
//        } catch (Exception e) {
//            e.printStackTrace();
//            return "Kết nối thất bại: " + e.getMessage();
//        }
//    }
//	
//	@PostMapping("/save/sotaikhoan")
//	public ResponseEntity<String> saveAccountId(@RequestBody UserWallet sotaikhoan) {
//	    try {
//	        userwalletRepository.save(sotaikhoan);
//	        return ResponseEntity.ok("Account ID saved successfully!");
//	    } catch (Exception e) {
//	        e.printStackTrace(); // Log lỗi để biết nguyên nhân
//	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving account ID: " + e.getMessage());
//	    }
//	}


//	
//	@Value("${paypal.client.id}")
//    private String clientId;
//
//    @Value("${paypal.client.secret}")
//    private String clientSecret;
//    
//    @PostMapping("/link-account")
//    public ResponseEntity<String> linkAccount(@RequestParam String userAccountId, @RequestParam String paypalAccountId) {
//        // Logic để lưu thông tin tài khoản PayPal vào UserWallet
//        // Giả sử bạn có một dịch vụ để lưu thông tin vào DB
//    	System.out.println("userAccountId: " + userAccountId);
//        System.out.println("paypalAccountId: " + paypalAccountId);
//        userWalletService.linkPaypalAccount(userAccountId, paypalAccountId);
//
//        return ResponseEntity.ok("Tài khoản PayPal đã được liên kết.");
//    }
    
    
}
