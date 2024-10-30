package com.BaiTapLab.Service;

import com.BaiTapLab.Entity.Banner;
import com.BaiTapLab.Repository.BannerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BannerService {

    @Autowired
    private BannerRepository bannerRepository;

    // Create a new Banner
    public Banner createBanner(Banner banner) {
        // Set the creation date
        banner.setNgay_tao(LocalDate.now());
        return bannerRepository.save(banner);
    }

    // Update an existing Banner
    public Banner updateBanner(String bannerId, Banner bannerDetails) {
        // Retrieve the existing banner
        Banner existingBanner = bannerRepository.findById(bannerId)
                .orElseThrow(() -> new RuntimeException("Banner not found"));

        // Update fields
        existingBanner.setHinh_anh(bannerDetails.getHinh_anh());
        existingBanner.setHoat_dong(bannerDetails.getHoat_dong());
        existingBanner.setTrang_thai_xoa(bannerDetails.getTrang_thai_xoa());
        existingBanner.setNgay_het_han(bannerDetails.getNgay_het_han());
        existingBanner.setDanhmuc(bannerDetails.getDanhmuc());
        existingBanner.setUsers(bannerDetails.getUsers());

        return bannerRepository.save(existingBanner);
    }

    // Get all Banners
    public List<Banner> getAllBanners() {
        return bannerRepository.findAll();
    }

    // Get a Banner by ID
    public Optional<Banner> getBannerById(String bannerId) {
        return bannerRepository.findById(bannerId);
    }

    // Delete a Banner
    public void deleteBanner(String bannerId) {
        bannerRepository.deleteById(bannerId);
    }
}