package com.BaiTapLab.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.BaiTapLab.Entity.PopupChiTiet;

import jakarta.transaction.Transactional;

public interface PopupchitietRepository extends JpaRepository<PopupChiTiet, Integer> {
	@Modifying
	@Transactional
	@Query("DELETE FROM PopupChiTiet p WHERE p.popup.popupID =:idPopup AND p.sanpham.san_phamId =:idSanPham")
	void removePopupchitiet(@Param("idPopup") String idPopup, @Param("idSanPham") String idSanPham);

}