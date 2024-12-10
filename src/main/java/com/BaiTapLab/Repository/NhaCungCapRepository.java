package com.BaiTapLab.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.BaiTapLab.Entity.DanhMuc;
import com.BaiTapLab.Entity.NhaCungCap;

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
}
