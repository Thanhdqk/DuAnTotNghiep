package com.BaiTapLab.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.BaiTapLab.Entity.DiaChi;
import com.BaiTapLab.Entity.Users;

import jakarta.transaction.Transactional;

public interface DiaChiRepository extends JpaRepository<DiaChi, Integer> {
	@Query("SELECT d FROM DiaChi d WHERE d.users.accountID = :accountID")
	DiaChi lietKeDiaChiTheoAccountID(@Param("accountID") String accountID);

	// Phát
	@Query("SELECT d FROM DiaChi d WHERE d.users.accountID = ?1")
	List<DiaChi> getDiaChiByIdUser(String id);

	@Query("SELECT d FROM DiaChi d WHERE d.users.accountID = ?1 order by dia_chiID limit 1 ")
	DiaChi findbyUserid(String id);

	@Query("SELECT d FROM DiaChi d WHERE d.users.accountID = ?1")
	DiaChi getDiaChiByIdUser1(String id);
	@Query("SELECT d FROM DiaChi d WHERE d.users.accountID = ?1")
	List<DiaChi> getDiaChiByIdUser2(String id);

	@Modifying
	@Transactional
	@Query("DELETE FROM  DiaChi d WHERE d.dia_chiID = ?1 ")
	void DeleteDiaChiById(String id);

	List<DiaChi> findByUsers(Users users);

//chọn địa chỉ hiện tại
	@Modifying
	@Transactional
	@Query(value = "update diachi set beingselected = 1 where dia_chiid =?1 and accountid= ?2", nativeQuery = true)
	void selectthisaddress(Integer diachiId, String accountid);

	@Query(value = "select * from diachi where dia_chiid not in (select dia_chiid from diachi where dia_chiid =?1  and accountid =?2)  and accountid =?2 ", nativeQuery = true)
	List<DiaChi> notselect(Integer diachiId, String accountid);
}
