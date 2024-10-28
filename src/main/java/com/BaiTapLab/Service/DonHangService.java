package com.BaiTapLab.Service;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.BaiTapLab.Entity.DonHang;

public interface DonHangService extends JpaRepository<DonHang, String>{
	@Query("Select p from DonHang p order by p.thoi_gianXN DESC limit 1 ")
	DonHang findlastedDH();
}
