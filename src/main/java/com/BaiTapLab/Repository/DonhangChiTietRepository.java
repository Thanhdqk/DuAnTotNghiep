package com.BaiTapLab.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.BaiTapLab.Entity.DonHangChiTiet;

public interface DonhangChiTietRepository extends JpaRepository<DonHangChiTiet, Integer> {
	@Query("SELECT d FROM DonHangChiTiet d WHERE d.donhang.don_hangid = ?1")
	List<DonHangChiTiet> getDonhangChiTiet(String id);
	
}
