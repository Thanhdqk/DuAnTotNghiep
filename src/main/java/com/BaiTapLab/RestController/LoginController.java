//package com.BaiTapLab.RestController;
//
//
//
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.client.RestTemplate;
//
//import com.google.gson.JsonObject;
//import com.google.gson.JsonParser;
//
//@RestController
//@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
//@RequestMapping("/api")
//public class LoginController {
//
//    private final String GOOGLE_USER_INFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo";
//
//    @PostMapping("/login")
//    public ResponseEntity<String> loginWithGoogle(@RequestBody String token) {
//        try {
//            // Gửi request để lấy thông tin người dùng từ Google
//            RestTemplate restTemplate = new RestTemplate();
//            String url = GOOGLE_USER_INFO_URL + "?access_token=" + token;
//
//            String response = restTemplate.getForObject(url, String.class);
//            JsonObject userInfo = JsonParser.parseString(response).getAsJsonObject();
//
//            // Trả về thông tin người dùng
//            return ResponseEntity.ok(userInfo.toString());
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body("Error: " + e.getMessage());
//        }
//    }
//}
