package com.BaiTapLab.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.BaiTapLab.Entity.Popup;

public interface PopupRepository extends JpaRepository<Popup, String> {
	@Query("SELECT e FROM Popup e WHERE e.popupID <> ?1")
	List<Popup> findAllByIdNot(String id);

	@Query("Select e from Popup e order by e.popupID desc limit 1")
	Popup findnewestrecord();

	@Query("Select e from Popup e ")
	List<Popup> findnewestrecord2();
//
//	@Query("Select e from Popup e where e.trang_thai_xoa='1'")
//	List<Popup> finddeletedrecod();

//	@Query("SELECT new com.BaiTapLab.DTO.PopUpDTO2(popup.popupID, popup.ngay_tao,popup.han_su_dung,"
//			+ "popup.hoat_dong,popup.trang_thai_xoa,popup.users,popup.popupchitiet ) FROM Popup popup  ")
//	List<PopUpDTO2> findHanhDongRespone();

//	@Query("SELECT b.popupID, b.ngay_tao, b.han_su_dung, b.hoat_dong, b.trang_thai_xoa,"
//			+ "s.san_phamId,s.ten_san_pham, s.users.accountID  FROM PopupChiTiet p  JOIN p.sanpham s join p.popup b where b.trang_thai_xoa is null ")
//	List<Object[]> findallpopup();
//
//	@Query("select b.popupID ,s.san_phamId FROM PopupChiTiet p  JOIN p.sanpham s join p.popup b ")
//	List<Object[]> findallpopup2();

//	@Query("SELECT b.popupID, b.ngay_tao, b.han_su_dung, b.hoat_dong, b.trang_thai_xoa,"
//			+ "s.san_phamId,s.ten_san_pham, s.users.accountID  FROM PopupChiTiet p JOIN p.sanpham s join p.popup b where b.trang_thai_xoa is null ")
//	List<Object[]> findallpopupnotdeleted();

	@Query("Select e from Popup e  where e.trang_thai_xoa is null ")
	List<Popup> findallpopupnotdeleted();

	@Query("Select e from Popup e  where e.trang_thai_xoa is not null ")
	List<Popup> findallpopupdeleted();

//	@Query("SELECT b.popupID, b.ngay_tao, b.han_su_dung, b.hoat_dong, b.trang_thai_xoa,"
//			+ "s.san_phamId,s.ten_san_pham, s.users.accountID  FROM PopupChiTiet p JOIN p.sanpham s join p.popup b where b.trang_thai_xoa is not null ")
//	List<Object[]> findallpopupdeleted();
}
