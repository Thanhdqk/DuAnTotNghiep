package com.BaiTapLab.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.BaiTapLab.Entity.YeuThich;

public interface YeuthichRepository extends JpaRepository<YeuThich, Integer> {
	
	@Query("SELECT y FROM YeuThich y WHERE y.users.accountID = ?1")
	List<YeuThich> FindAllByid(String id);
	
	@Query("SELECT y FROM YeuThich y WHERE y.sanpham.san_phamId = ?1 AND y.users.accountID = ?2")
	YeuThich Check(String idsp,String iduser);
}
