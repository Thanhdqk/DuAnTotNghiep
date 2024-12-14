package com.BaiTapLab.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.BaiTapLab.Entity.DanhGia;
import com.BaiTapLab.Repository.DanhGiaRepository;

@Service
public class DanhGiaService {
	@Autowired
	private DanhGiaRepository danhGiaRepository;

	public DanhGia saveReview(DanhGia danhGia) {
		return danhGiaRepository.save(danhGia);
	}

//	public boolean checkReviewExists(String sanPhamId, String accountId) {
//		return danhGiaRepository.existsReviewBySanPhamAndAccount(sanPhamId, accountId);
//	}

}
