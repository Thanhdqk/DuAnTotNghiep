package com.BaiTapLab.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.BaiTapLab.Entity.ThuongHieu;

public interface ThuongHieuRepository extends JpaRepository<ThuongHieu, String>{
//	Optional<ThuongHieu> findBythuong_hieuID(String thuong_hieuID);
//	void deleteByID(String thuong_hieuID);
}
