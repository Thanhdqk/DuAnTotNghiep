package com.BaiTapLab.Repository;

import com.BaiTapLab.Entity.Banner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BannerRepository extends JpaRepository<Banner, String> {
    // Add any custom query methods here if needed
}