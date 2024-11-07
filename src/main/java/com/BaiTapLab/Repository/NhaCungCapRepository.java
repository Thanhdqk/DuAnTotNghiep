package com.BaiTapLab.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.BaiTapLab.Entity.NhaCungCap;

public interface NhaCungCapRepository extends JpaRepository<NhaCungCap, String>{
	@Query("SELECT n FROM NhaCungCap n WHERE n.nha_cung_capID = :nha_cung_capID")
    NhaCungCap findByNha_cung_capID(@Param("nha_cung_capID") String nha_cung_capID);
}
