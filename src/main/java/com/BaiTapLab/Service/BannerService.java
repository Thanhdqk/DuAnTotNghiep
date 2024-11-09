package com.BaiTapLab.Service;

import com.BaiTapLab.Entity.Banner;
import com.BaiTapLab.Repository.BannerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BannerService {

    @Autowired
    private BannerRepository bannerRepository;

    // Tạo mới Banner
    public Banner createBanner(Banner banner) {
        // Đặt ngày tạo
        banner.setNgay_tao(LocalDate.now());
        return bannerRepository.save(banner);
    }

    // Cập nhật Banner
    public Banner updateBanner(String bannerId, Banner bannerDetails) {
        // Tìm Banner hiện có
        Banner existingBanner = bannerRepository.findById(bannerId)
                .orElseThrow(() -> new RuntimeException("Banner not found"));

        // Cập nhật các trường cần thiết
        existingBanner.setHinh_anh(bannerDetails.getHinh_anh());
        existingBanner.setHoat_dong(bannerDetails.getHoat_dong());
        existingBanner.setNgay_het_han(bannerDetails.getNgay_het_han());
        existingBanner.setDanhmuc(bannerDetails.getDanhmuc());
        existingBanner.setUsers(bannerDetails.getUsers());

        return bannerRepository.save(existingBanner);
    }

    // Lấy tất cả các Banner
    public List<Banner> getAllBanners() {
        return bannerRepository.findAll();
    }

    // Lấy Banner theo ID
    public Banner getBannerById(String bannerId) {
        return bannerRepository.findById(bannerId)
                .orElseThrow(() -> new RuntimeException("Banner not found"));
    }

    // Xóa Banner
    public void deleteBanner(String bannerId) {
        bannerRepository.deleteById(bannerId);
    }
}
