package com.BaiTapLab.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.BaiTapLab.Entity.DanhMuc;

public interface DanhmucRepository extends JpaRepository<DanhMuc, String> {
	@Query("SELECT d.danh_mucId FROM DanhMuc d")
	List<String> FindALLNAME();
}
