package com.BaiTapLab.RestController;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.BaiTapLab.Entity.Banner;
import com.BaiTapLab.Service.BannerService;

@RestController
@RequestMapping("/api/banners")
@CrossOrigin(origins = { "http://localhost:3000" })
public class BannerRestController {

    private static final Logger logger = LoggerFactory.getLogger(BannerRestController.class);
    private static final String IMAGE_DIR = "C:\\Users\\DELL\\Downloads\\LoiFrontend\\public\\images";

    @Autowired
    private BannerService bannerService;

    @GetMapping
    public List<Banner> getAllBanners() {
        return bannerService.getAllBanners();
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createBanner(
            @RequestParam("bannerId") String bannerId,
            @RequestParam("hoat_dong") String hoatDong,
            @RequestParam("ngay_tao") String ngayTao,
            @RequestParam("trang_thai_xoa") String trangThaiXoa,
            @RequestParam("ngay_het_han") String ngayHetHan,
            @RequestParam(value = "hinh_anh", required = false) MultipartFile hinhFile) {

        Map<String, Object> response = new HashMap<>();

        // Kiểm tra các trường bắt buộc
        if (bannerId == null || hoatDong == null || trangThaiXoa == null || ngayHetHan == null || ngayTao == null ||
                bannerId.trim().isEmpty() || hoatDong.trim().isEmpty() || trangThaiXoa.trim().isEmpty() || ngayHetHan.trim().isEmpty() || ngayTao.trim().isEmpty()) {
            response.put("message", "Tất cả các trường là bắt buộc!");
            return ResponseEntity.badRequest().body(response);
        }

        // Tạo đối tượng Banner
        Banner banner = new Banner();
        banner.setBannerId(bannerId);
        banner.setHoat_dong(hoatDong);
        banner.setTrang_thai_xoa(trangThaiXoa);
        banner.setNgay_het_han(LocalDate.parse(ngayHetHan));
        banner.setNgay_tao(LocalDate.parse(ngayTao));

        // Xử lý lưu ảnh nếu có
        if (hinhFile != null && !hinhFile.isEmpty()) {
            String filePath = IMAGE_DIR + File.separator + hinhFile.getOriginalFilename();
            try {
                hinhFile.transferTo(new File(filePath));
                banner.setHinh_anh(hinhFile.getOriginalFilename());
            } catch (IOException e) {
                logger.error("Lỗi khi lưu hình ảnh cho banner ID {}: {}", bannerId, e.getMessage());
                response.put("message", "Không thể lưu hình ảnh!");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
            }
        }

        // Lưu banner
        try {
            Banner createdBanner = bannerService.createBanner(banner);
            response.put("message", "Banner đã được tạo thành công!");
            response.put("banner", createdBanner);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("Lỗi khi lưu banner: {}", e.getMessage());
            response.put("message", "Không thể lưu banner!");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/{bannerId}")
    public ResponseEntity<Map<String, Object>> updateBanner(
            @PathVariable String bannerId,
            @RequestParam("hoat_dong") String hoatDong,
            @RequestParam("trang_thai_xoa") String trangThaiXoa,
            @RequestParam("ngay_het_han") String ngayHetHan,
            @RequestParam("ngay_tao") String ngayTao,
            @RequestParam(value = "hinh_anh", required = false) MultipartFile hinhFile) {

        Map<String, Object> response = new HashMap<>();

        // Tìm banner theo ID
        Optional<Banner> existingBannerOpt = bannerService.getBannerById(bannerId);
        if (existingBannerOpt.isEmpty()) {
            response.put("message", "Banner không tồn tại!");
            return ResponseEntity.notFound().build();
        }

        // Cập nhật thông tin banner
        Banner banner = existingBannerOpt.get();
        banner.setHoat_dong(hoatDong);
        banner.setTrang_thai_xoa(trangThaiXoa);
        banner.setNgay_het_han(LocalDate.parse(ngayHetHan));
        banner.setNgay_tao(LocalDate.parse(ngayTao));

        // Xử lý lưu ảnh nếu có
        if (hinhFile != null && !hinhFile.isEmpty()) {
            String filePath = IMAGE_DIR + File.separator + hinhFile.getOriginalFilename();
            try {
                hinhFile.transferTo(new File(filePath));
                banner.setHinh_anh(hinhFile.getOriginalFilename());
            } catch (IOException e) {
                logger.error("Lỗi khi lưu hình ảnh cho banner ID {}: {}", bannerId, e.getMessage());
                response.put("message", "Không thể lưu hình ảnh!");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
            }
        }

        // Cập nhật banner
        try {
            Banner updatedBanner = bannerService.updateBanner(bannerId, banner);
            response.put("message", "Banner đã được cập nhật thành công!");
            response.put("banner", updatedBanner);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Lỗi khi cập nhật banner: {}", e.getMessage());
            response.put("message", "Không thể cập nhật banner!");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    @DeleteMapping("/{bannerId}")
    public ResponseEntity<Void> deleteBanner(@PathVariable String bannerId) {
        // Check if the banner exists
        if (!bannerService.getBannerById(bannerId).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        bannerService.deleteBanner(bannerId);
        return ResponseEntity.noContent().build();
    }
}