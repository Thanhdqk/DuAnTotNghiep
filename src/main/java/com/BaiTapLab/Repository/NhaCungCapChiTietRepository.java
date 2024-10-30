package com.BaiTapLab.Repository;

import com.BaiTapLab.Entity.NhaCungCapChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NhaCungCapChiTietRepository extends JpaRepository<NhaCungCapChiTiet, Integer> {
    // You can define custom query methods here if needed
}