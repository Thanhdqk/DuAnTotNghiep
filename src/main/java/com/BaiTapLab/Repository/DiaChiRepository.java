package com.BaiTapLab.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.BaiTapLab.Entity.DiaChi;
import com.BaiTapLab.Entity.Users;

import java.util.List;

public interface DiaChiRepository extends JpaRepository<DiaChi, Integer> {
	List<DiaChi> findByUsers(Users users);
}
