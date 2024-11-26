package com.BaiTapLab;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Cho phép tất cả các đường dẫn
                .allowedOrigins("http://localhost:3000", "http://localhost:19000", "http://172.16.73.12:8080", 
                		"https://Thanhdqk.github.io", "https://thanhnehihi.as.r.appspot.com") // Địa chỉ frontend của bạn
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Các phương thức HTTP cho phép
                .allowedHeaders("*") // Cho phép tất cả các header
                .allowCredentials(true); // Cho phép gửi cookie nếu cần
        
    }

    
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Cấu hình để truy cập ảnh trong src/main/resources/images
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:uploads/images/");
    }
    
}
