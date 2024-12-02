package com.BaiTapLab.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.BaiTapLab.Entity.Roles;
import com.BaiTapLab.Entity.Users;

import jakarta.transaction.Transactional;

public interface UsersRepository extends JpaRepository<Users, String> {
	Optional<Users> findByAccountIDAndPassword(String accountID, String password);
	Users findByAccountID(String accountID);
	@Query("SELECT u FROM Users u LEFT JOIN u.roles r WHERE u.accountID = :accountID")
	Optional<Users> findUserWithRolesByAccountId(@Param("accountID") String accountID);
	
	@Query("SELECT us.accountID, us.hovaten, us.so_dien_thoai, us.hoat_dong, dc.dia_chi, dc.dia_chiID " +
	           "FROM Users us " +
	           "JOIN us.diachi dc")
	List<Object[]> findAllUserWithAddress();
	
	
    @Query("SELECT u FROM Users u WHERE u.trang_thai_xoa = ?1")
	List<Users> findUserByTrangThaideleted(String tt);
    
    @Modifying
	@Transactional
	@Query("UPDATE Users u SET u.trang_thai_xoa = 'Xóa' WHERE u.accountID = ?1")
	void markAsDeleted(String userid);
    
    @Modifying
	@Transactional
	@Query("UPDATE Users u SET u.trang_thai_xoa = NULL WHERE u.accountID = ?1")
	void back(String userid);
	
    @Modifying
    @Transactional
    @Query("UPDATE Users u SET u.trang_thai_xoa = NULL WHERE u.accountID = ?1" )
    int reloadThuongHieuID(String thuong_hieuID);
    
    @Modifying
    @Transactional
    @Query("UPDATE Users u SET u.vi_pham = NULL WHERE u.accountID = ?1" )
    void reloadViPham(String userid);
    
    @Modifying
  	@Transactional
  	@Query("UPDATE Users u SET u.trang_thai_xoa = 'Ban' WHERE u.accountID = ?1")
  	void mark(String userid);
    
    
    

	
	@Query("SELECT u FROM  Users u WHERE u.trang_thai_xoa is NULL")
	List<Users> findUserByTrangThai();
 
	@Query("SELECT u FROM Users u WHERE u.vi_pham > 0")
	List<Users> findUserByViPham();
	
	@Query("SELECT u FROM  Users u WHERE u.trang_thai_xoa = 'Ban' ")
	List<Users> findUserByVP();
	
}