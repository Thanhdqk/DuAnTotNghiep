package com.BaiTapLab;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.filter.OncePerRequestFilter;

import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Repository.UsersRepository;
import com.BaiTapLab.Security.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UsersRepository usersRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        final String authorizationHeader = request.getHeader("Authorization");

        String accountID = null;
        String jwt = null;

        // Kiểm tra header Authorization
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7); // Lấy token
            accountID = jwtUtil.extractUsername(jwt); // Lấy accountID từ token
        }

        // Xác thực token
        if (accountID != null) {
            Optional<Users> user = Optional.ofNullable(usersRepository.findByAccountID(accountID));
            if (user.isPresent() && jwtUtil.validateToken(jwt, accountID)) {
                // Token hợp lệ, có thể thêm thông tin người dùng vào request
                request.setAttribute("currentUser", user.get());
            } else {
                // Token không hợp lệ, có thể trả về thông báo lỗi hoặc ghi log
            }
        }
        chain.doFilter(request, response);
    }
}
