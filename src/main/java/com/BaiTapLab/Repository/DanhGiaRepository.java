package com.BaiTapLab.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.BaiTapLab.Entity.DanhGia;

public interface DanhGiaRepository extends JpaRepository<DanhGia, Integer> {

//	@Query("SELECT COUNT(d) > 0 FROM DanhGia d WHERE d.sanpham.san_phamId = :sanPhamId AND d.users.accountID = :userId")
//	boolean existsBySanPhamIdAndUserId(@Param("sanPhamId") String sanPhamId, @Param("userId") String userId);

}