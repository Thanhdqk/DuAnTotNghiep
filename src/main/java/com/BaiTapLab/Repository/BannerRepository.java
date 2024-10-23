package com.BaiTapLab.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.BaiTapLab.Entity.Banner;

public interface BannerRepository extends JpaRepository<Banner, String> {
	
}
