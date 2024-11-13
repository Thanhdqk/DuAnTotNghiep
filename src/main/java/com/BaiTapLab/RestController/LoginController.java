package com.BaiTapLab.RestController;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Repository.UsersRepository;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("api/users")
public class LoginController {

    @Autowired
    UsersRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> saveUser(
            @RequestParam("accountID") String accountID,
            @RequestParam("hovaten") String hovaten,
            @RequestParam("hinh_anh") String hinhAnh,
            @RequestParam("so_dien_thoai") String soDienThoai,
            @RequestParam("hoat_dong") String hoatDong,
            @RequestParam("email") String email) {

        Users user = new Users();
        user.setAccountID(accountID);
        user.setHovaten(hovaten);
        user.setHinh_anh(hinhAnh);
        user.setSo_dien_thoai(soDienThoai);
        user.setHoat_dong(hoatDong);
        user.setAccountID(email);

        if (!userRepository.existsById(user.getAccountID())) {
            Users savedUser = userRepository.save(user);
            return ResponseEntity.ok(savedUser);
        }
        return ResponseEntity.ok("User already exists");
    }
}
