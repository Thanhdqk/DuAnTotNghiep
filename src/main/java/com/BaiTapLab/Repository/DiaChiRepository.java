package com.BaiTapLab.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.BaiTapLab.Entity.DiaChi;

public interface DiaChiRepository extends JpaRepository<DiaChi, Integer> {
	
	@Query("SELECT d FROM DiaChi d WHERE d.users.accountID = ?1")
	List<DiaChi> getDiaChiByIdUser(String id);

}
//{"dia_chiID":2,"dia_chi":"456 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP Hồ Chí Minh","users":{"accountID":"Account_1","password":"123","hovaten":"Nguyễn Văn Lợi","hinh_anh":"image.png","so_dien_thoai":"0365440096","email":"admin@gmail.com","vi_pham":""}}