package com.BaiTapLab.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.BaiTapLab.Entity.DonHang;
import com.BaiTapLab.Entity.DonHangChiTiet;

public interface DonHangChiTietRepository  extends JpaRepository<DonHangChiTiet, Integer>{
}
