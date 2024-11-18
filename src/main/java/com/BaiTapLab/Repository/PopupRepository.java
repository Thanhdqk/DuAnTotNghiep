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

	@Query("Select e from Popup e where e.trang_thai_xoa='1'")
	List<Popup> finddeletedrecod();

}
