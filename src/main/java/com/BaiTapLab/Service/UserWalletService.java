package com.BaiTapLab.Service;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.BaiTapLab.Entity.UserWallet;
import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Repository.UserWalletRepository;
import com.BaiTapLab.Repository.UsersRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.paypal.base.rest.APIContext;

import jakarta.transaction.Transactional;

@Service
public class UserWalletService {
	@Autowired
    private UserWalletRepository userWalletRepository;

    @Autowired
    private UsersRepository usersRepository;
    
    @Autowired
    private APIContext apiContext;

    private final String accessToken = "A21AAIAtu2yiB4Ess-ZJs9YPEtlX89yF7IfXGhTpptO87q6jdVxZpt0IleFNTjVUNQSnw0vms518emDlV_6PEHGIriN1Q1NHA";

    public String fetchBalanceFromPayPal() {
        try {
            // Tạo kết nối HTTP với PayPal API để lấy số dư tài khoản
            String url = "https://api-m.sandbox.paypal.com/v1/reporting/balances";
            HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Authorization", "Bearer " + accessToken);
            connection.setRequestProperty("Content-Type", "application/json");

            // Kiểm tra mã phản hồi từ API
            if (connection.getResponseCode() == 200) {
                // Đọc phản hồi JSON từ PayPal API
                InputStream responseStream = connection.getInputStream();
                String jsonResponse = new BufferedReader(new InputStreamReader(responseStream))
                        .lines().collect(Collectors.joining("\n"));

                // In phản hồi ra console để kiểm tra
                System.out.println("Phản hồi từ PayPal API: " + jsonResponse);

                return jsonResponse; // Trả về chuỗi JSON chứa thông tin số dư
            } else {
                System.out.println("Lỗi khi kết nối đến PayPal API: " + connection.getResponseCode());
                return "Không thể kết nối với PayPal API. Mã lỗi: " + connection.getResponseCode();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Lỗi khi kết nối với PayPal API: " + e.getMessage();
        }
    }
}
