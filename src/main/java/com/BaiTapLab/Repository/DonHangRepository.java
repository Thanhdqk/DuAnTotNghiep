package com.BaiTapLab.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.BaiTapLab.Entity.DonHang;

public interface DonHangRepository extends JpaRepository<DonHang, String>{
	@Query("Select p from DonHang p order by p.thoi_gianXN DESC limit 1 ")
	DonHang findlastedDH();
}