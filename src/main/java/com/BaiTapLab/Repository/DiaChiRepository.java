package com.BaiTapLab.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.BaiTapLab.Entity.DiaChi;
import com.BaiTapLab.Entity.Users;

import jakarta.transaction.Transactional;

public interface DiaChiRepository extends JpaRepository<DiaChi, Integer> {
	
	@Query("SELECT d FROM DiaChi d WHERE d.users.accountID = ?1")
	List<DiaChi> getDiaChiByIdUser(String id);

	
	@Query("SELECT d FROM DiaChi d WHERE d.users.accountID = ?1 order by dia_chiID limit 1 ")
	DiaChi findbyUserid(String id);
	

	@Query("SELECT d FROM DiaChi d WHERE d.users.accountID = ?1")
	DiaChi getDiaChiByIdUser1(String id);


	
	@Modifying
    @Transactional
	@Query("DELETE FROM  DiaChi d WHERE d.dia_chiID = ?1 ")
	void DeleteDiaChiById(String id);

	List<DiaChi> findByUsers(Users users);
}
//{"dia_chiID":2,"dia_chi":"456 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP Hồ Chí Minh","users":{"accountID":"Account_1","password":"123","hovaten":"Nguyễn Văn Lợi","hinh_anh":"image.png","so_dien_thoai":"0365440096","email":"admin@gmail.com","vi_pham":""}}