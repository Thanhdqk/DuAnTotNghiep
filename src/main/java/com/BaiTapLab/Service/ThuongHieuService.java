package com.BaiTapLab.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BaiTapLab.Entity.ThuongHieu;
import com.BaiTapLab.Repository.ThuongHieuRepository;

@Service
public class ThuongHieuService {
	// Của Tuấn
	@Autowired
	ThuongHieuRepository thRepository;
	
	
	public ThuongHieu createThuongHieu(ThuongHieu thuonghieu) {
		return thRepository.save(thuonghieu);
	}
	
	public ThuongHieu findByThuongHieuID(String thuong_hieuID) {
	    return thRepository.findById(thuong_hieuID)
	            .orElseThrow();
	}
	
	public ThuongHieu updateThuongHieu(ThuongHieu updatedThuongHieu) throws Exception {
        // Kiểm tra xem thương hiệu có tồn tại không
        if (!thRepository.existsById(updatedThuongHieu.getThuong_hieuID())) {
            throw new Exception("Thương hiệu not found with ID: " + updatedThuongHieu.getThuong_hieuID());
        }

        // Cập nhật voucher trong cơ sở dữ liệu
        return thRepository.save(updatedThuongHieu);
    }
	
	

	public boolean deleteThuongHieuById(String thuong_hieuID) {
        int result = thRepository.markAsDeleted(thuong_hieuID);
        return result > 0; // Trả về true nếu cập nhật thành công
    }
	
	public boolean reloadThuongHieuById(String thuong_hieuID) {
        int result = thRepository.reloadThuongHieuID(thuong_hieuID);
        return result > 0; // Trả về true nếu cập nhật thành công
    }
	
	public List<ThuongHieu> FINDALL()
	{
		 return thRepository.findAll();
	}
}
