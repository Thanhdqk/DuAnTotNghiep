package com.BaiTapLab.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.BaiTapLab.Entity.TestWallet;

public interface TestWalletRepository extends JpaRepository<TestWallet, Integer>{
	@Query("select t from TestWallet t \r\n"
			+ "  where t.so_tai_khoan = :so_tai_khoan") 
	TestWallet findSoTaiKhoan(@Param("so_tai_khoan") String so_tai_khoan);
}
