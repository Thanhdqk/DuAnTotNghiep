package com.BaiTapLab;

import java.util.Arrays;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.BaiTapLab.Entity.Role;
import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Repository.UsersRepository;

@Configuration
@EnableWebSecurity
public class SercurityConfig {
	@Autowired 
	UsersRepository userRepository;
	
	@Autowired
	BCryptPasswordEncoder pe;

	
	//Cung cấp nguồn dữ liệu đăng nhập
	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception{
		auth.userDetailsService(username -> {
			try {
				Users user = userRepository.findByAccountID(username);
//				Users user = userRepository.findUserWithRolesByAccountId(username)
//		                .orElseThrow(() -> new UsernameNotFoundException(username));
				String password = user.getPassword();
				String[] roles = user.getRoles().stream()
	                    .map(Role::getTen_vai_tro)
	                    .toArray(String[]::new);
				return User.withUsername(username).password(password).roles(roles).build();				
			} catch (NoSuchElementException e) {
				throw new UsernameNotFoundException(username+ e);
			}
		}).passwordEncoder(pe);
		
	}
	
	public void saveUser(Users user) {
	    String rawPassword = user.getPassword();
	    String encodedPassword = pe.encode(rawPassword);
	    user.setPassword(encodedPassword);
	    userRepository.save(user); // Lưu vào cơ sở dữ liệu với mật khẩu đã mã hóa
	}
	// Phân quyền sử dụng
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
		http.csrf(csrf -> csrf.disable())
        .cors(cors -> cors.disable());
		
		http.authorizeHttpRequests()
			//.requestMatchers("/dashboard").authenticated()
			.requestMatchers("/dashboard").hasRole("Admin")
			.requestMatchers("/rest/authorities").hasRole("DIRE")
			.anyRequest().permitAll();
		
//		http.formLogin(form -> form
//			.loginPage("/security/login/form")
//			.loginProcessingUrl("/security/login")
//			.defaultSuccessUrl("/security/login/success", false)
//			.failureUrl("/security/login/error")
//		);
		
		http.formLogin(form -> form
			    .loginPage("/login") // Địa chỉ URL của trang đăng nhập
			    .loginProcessingUrl("/sfasf/login")// URL mà Spring Security sẽ gửi thông tin đăng nhập đến để xử lý
			    .defaultSuccessUrl("/dashboard", true) // Địa chỉ URL chuyển hướng sau khi đăng nhập thành công
			    .failureUrl("/dsfdsfds/login") // Địa chỉ URL chuyển hướng khi đăng nhập thất bại
			);

		http.rememberMe(rememberMe ->
		rememberMe.tokenValiditySeconds(86400));
		
		http.exceptionHandling(exception ->
		exception.accessDeniedPage("/security/unauthoried"));
		
		http.logout(logout ->
		logout.logoutUrl("/security/logoff")
		.logoutSuccessUrl("/security/logoff/success"));
		return http.build();
	}
	
	// Cơ chế mã hóa mật khẩu
	/*
	 * @Bean public BCryptPasswordEncoder getPasswordEncoder() { return new
	 * BCryptPasswordEncoder(); }
	 * 
	 * // Cho phép truy xuất Rest API từ bên ngoài (domain khác) public void
	 * configure(WebSecurity web) throws Exception{
	 * web.ignoring().requestMatchers(HttpMethod.OPTIONS,"/**"); }
	 */
}
