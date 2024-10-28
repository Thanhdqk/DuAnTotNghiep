package com.BaiTapLab.Service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.BaiTapLab.Entity.DiaChi;

public interface DiachiService extends JpaRepository<DiaChi, Integer> {
	@Query("Select d from DiaChi d where d.users.accountID like ?1  ")
	DiaChi findbyUserid(String userid);
}
