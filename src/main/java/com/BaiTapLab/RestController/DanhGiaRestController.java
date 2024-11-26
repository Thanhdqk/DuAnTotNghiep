package com.BaiTapLab.RestController;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.DTO.DanhGiaDTO;
import com.BaiTapLab.DTO.SanPhamDTO;
import com.BaiTapLab.Entity.DanhGia;
import com.BaiTapLab.Entity.SanPham;
import com.BaiTapLab.Repository.DanhGiaRepository;

@RestController
@RequestMapping("/api/danhgia")
@CrossOrigin(origins = "http://localhost:3000")
public class DanhGiaRestController {
	@Autowired
	DanhGiaRepository danhgiaRepository;
	
//	@GetMapping("/list/chuaphanhoi")
//	public ResponseEntity<List<DanhGia>> getListChuaPhanHoi(){
//		List<DanhGia> danhgia = danhgiaRepository.findAll();
//		return ResponseEntity.ok(danhgia);
//	}
	
	@GetMapping("/list")
	public ResponseEntity<List<DanhGiaDTO>> getListChuaPhanHoi() {
	    List<DanhGia> listDanhgia = danhgiaRepository.findAll();

	    List<DanhGiaDTO> listDanhGiaDTO = listDanhgia.stream()
	        .map(danhgia -> new DanhGiaDTO(
	            danhgia.getDanh_giaID(),
	            danhgia.getNoi_dung(),
	            danhgia.getSo_sao(),
	            danhgia.getHinh_anh(),
	            danhgia.getNgay_tao(),
	            danhgia.getTrang_thaiPH(),
	            danhgia.getUsers() != null ? String.valueOf(danhgia.getUsers().getAccountID()) : null,
	            danhgia.getSanpham() != null ? String.valueOf(danhgia.getSanpham().getSan_phamId()) : null
	        ))
	        .collect(Collectors.toList());

	    return ResponseEntity.ok(listDanhGiaDTO);
	}

	
//	@GetMapping("/list/chuaphanhoi")
//	public ResponseEntity<List<DanhGiaDTO>> getListChuaPhanHoi(){
//		List<DanhGia> listDanhGia = danhgiaRepository.findAll();
//		
//		List<DanhGiaDTO> listDanhGiaDTO = listDanhGia.stream()
//				.map(danhgia -> new DanhGiaDTO(
//						danhgia.get))
//	}
	
	
	
}
