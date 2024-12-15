package com.BaiTapLab.RestController;

import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.MailInfo;
import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Repository.UserRepository;
import com.BaiTapLab.Service.MailerService;

import jakarta.mail.MessagingException;
import jakarta.servlet.ServletContext;

@RestController
public class ForgotPasswordRestController {

    @Autowired
    UserRepository userdao;
    @Autowired 
    MailerService mailservice;
    @Autowired 
    ServletContext context;

    @PostMapping("/sendemail")
    public ResponseEntity<String> sendOtp(@RequestParam("accountID") String accountID) {
        Users u = userdao.findByAccountID(accountID);

        if (u != null) {
            Random random = new Random(); 
            String otp = String.format("%04d", random.nextInt(10000)); // Tạo OTP 4 chữ số

            context.setAttribute("otp", otp);  // Lưu OTP với tên "otp"
            context.setAttribute("accountID", accountID); // Lưu email với tên "email"

            MailInfo mail = new MailInfo(accountID, "Mã OTP của bạn", "Mã OTP của bạn là: " + otp);
            try {
                mailservice.send(mail);
            } catch (MessagingException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Không thể gửi email");
            }

            return ResponseEntity.ok("OTP đã được gửi thành công!");
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email không tồn tại");
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@RequestParam("otp") String otp, @RequestParam("accountID") String accountID) {
        String savedOtp = (String) context.getAttribute("otp"); // Đọc OTP đã lưu
        String savedEmail = (String) context.getAttribute("accountID"); // Đọc email đã lưu

        if (savedOtp == null || savedEmail == null) {
            return ResponseEntity.badRequest().body("OTP hoặc email không tồn tại. Vui lòng thử lại.");
        }

        if (accountID.equals(savedEmail) && otp.equals(savedOtp)) {
            return ResponseEntity.ok("Xác thực thành công!");
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("OTP không hợp lệ hoặc email không khớp.");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> requestBody) {
        String accountID = requestBody.get("accountID");
        String newPassword = requestBody.get("password");

        Users user = userdao.findByAccountID(accountID);

        if (user != null) {
            user.setPassword(newPassword); // Không mã hóa mật khẩu
            userdao.save(user);
            return ResponseEntity.ok("Đặt lại mật khẩu thành công!");
        }
        return ResponseEntity.badRequest().body("Email không tồn tại trong hệ thống.");
    }
}
