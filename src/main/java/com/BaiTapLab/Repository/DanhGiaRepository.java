package com.BaiTapLab.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.BaiTapLab.Entity.DanhGia;

@Repository
public interface DanhGiaRepository extends JpaRepository<DanhGia, Integer> {
    @Query("SELECT d.sanpham.san_phamId FROM DanhGia d WHERE d.users.accountID = :userId")
    List<String> findSanPhamIdsByUserId(@Param("userId") String userId);
}

