package com.BaiTapLab.Service;

import com.BaiTapLab.Entity.Banner;
import com.BaiTapLab.Entity.HanhDong;
import com.BaiTapLab.Repository.BannerRepository;
import com.BaiTapLab.Repository.HanhDongReopository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BannerService {

    @Autowired
    private BannerRepository bannerRepository;

    @Autowired
    HanhDongReopository  HanhDongReopository;
    // Tạo mới Banner
    public Banner createBanner(Banner banner) {
        // Đặt ngày tạo
        banner.setNgay_tao(LocalDate.now());
        HanhDong hd = new HanhDong();
		hd.setBanner(banner);
		hd.setTen_hanh_dong("Thêm");
//		HanhDongReopository.save(hd);
	
        return bannerRepository.save(banner);
        

        
    }

    // Cập nhật Banner
    public Banner updateBanner(String bannerId, Banner banner) {
        // Tìm Banner hiện có
        Banner existingBanner = bannerRepository.findById(bannerId)
                .orElseThrow(() -> new RuntimeException("Banner not found"));

        // Cập nhật các trường cần thiết
        existingBanner.setHinh_anh(banner.getHinh_anh());
        existingBanner.setHoat_dong(banner.getHoat_dong());
        existingBanner.setNgay_het_han(banner.getNgay_het_han());
        existingBanner.setDanhmuc(banner.getDanhmuc());
        existingBanner.setUsers(banner.getUsers());
        
        HanhDong hd = new HanhDong();
   		hd.setBanner(banner);
   		hd.setTen_hanh_dong("Thêm");
//   		HanhDongReopository.save(hd);
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
