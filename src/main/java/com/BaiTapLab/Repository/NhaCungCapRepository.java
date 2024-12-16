package com.BaiTapLab.Repository;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.BaiTapLab.Entity.DanhMuc;
import com.BaiTapLab.Entity.NhaCungCap;
import com.BaiTapLab.Entity.Users;

import jakarta.transaction.Transactional;

public interface NhaCungCapRepository extends JpaRepository<NhaCungCap, String>{
	//Liệt kê tên nhà cung cấp theo tên sản phẩm
	@Query(value = "SELECT DISTINCT ncc.ten_nhacc FROM nhacungcap ncc " +
            "JOIN nhacungcapchitiet nccct ON nccct.nha_cung_capid = ncc.nha_cung_capid " +
            "JOIN sanpham sp ON sp.san_pham_id = nccct.san_pham_id " +
            "WHERE :tenSanPham LIKE CONCAT('%', ncc.ten_mat_hang, '%') ", nativeQuery = true)
	List<Object[]> findNhaCungCapTheoSanPham(@Param("tenSanPham") String tenSanPham);

//	@Query("select ncc from NhaCungCap ncc\r\n"
//			+ "  where ncc.ten_nhaCC = :tenNhaCC")
//	NhaCungCap findByTenNhaCC(@Param("tenNhaCC") String tenNhaCC);
	
	@Query(value = "select * from nhacungcap\r\n"
			+ "	where ten_nhacc = :tenNhaCC", nativeQuery = true)
	NhaCungCap findByTenNhaCC(@Param("tenNhaCC") String tenNhaCC);
	
	// Khánh
	@Query("SELECT u FROM NhaCungCap u WHERE u.trang_thai_xoa = ?1")
	List<Users> findUserByTrangThaideleted(String tt);
    
    @Modifying
	@Transactional
	@Query("UPDATE NhaCungCap u SET u.trang_thai_xoa = 'Xóa' WHERE u.nha_cung_capID = ?1")
	public void markAsDeleted(String userid);
    
    @Modifying
	@Transactional
	@Query("UPDATE NhaCungCap u SET u.trang_thai_xoa = NULL WHERE u.nha_cung_capID = ?1")
	public void back(String userid);
	
	@Modifying
    @Transactional
    @Query("UPDATE NhaCungCap u SET u.trang_thai_xoa = NULL WHERE u.nha_cung_capID = ?1")
    int reloadThuongHieuID(String thuong_hieuID);
	
	@Query("SELECT u FROM  NhaCungCap u WHERE u.trang_thai_xoa is NULL")
	List<Users> findUserByTrangThai();
	
	@Query("SELECT b.nha_cung_capID FROM NhaCungCap b ORDER BY b.nha_cung_capID DESC")
	List<String> findLatestBannerId(PageRequest pageRequest);

}
