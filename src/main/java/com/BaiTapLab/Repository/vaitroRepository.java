package com.BaiTapLab.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.BaiTapLab.Entity.Roles;

public interface vaitroRepository  extends JpaRepository<Roles, Integer>{

	@Query("SELECT v FROM Roles v WHERE v.users.accountID = ?1 AND v.ten_vai_tro = ?2")
	Roles findRoleByUserANDIdRole(String id,String nameRole);
}
