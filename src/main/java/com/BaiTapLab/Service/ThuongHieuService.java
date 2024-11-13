package com.BaiTapLab.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BaiTapLab.Entity.ThuongHieu;
import com.BaiTapLab.Repository.ThuongHieuRepository;

@Service
public class ThuongHieuService {
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
        // Kiểm tra xem voucher có tồn tại không
        if (!thRepository.existsById(updatedThuongHieu.getThuong_hieuID())) {
            throw new Exception("Voucher not found with ID: " + updatedThuongHieu.getThuong_hieuID());
        }

        // Cập nhật voucher trong cơ sở dữ liệu
        return thRepository.save(updatedThuongHieu);
    }
	
	public void deleteThuongHieu(String thuong_hieuID) throws Exception {
	    // Kiểm tra xem voucher có tồn tại không trước khi xóa
	    if (!thRepository.existsById(thuong_hieuID)) {
	        throw new Exception("ThuongHieu not found with ID: " + thuong_hieuID);
	    }
	    // Thực hiện xóa voucher
	    thRepository.deleteById(thuong_hieuID);
	}
	

	public boolean deleteThuongHieuById(String thuong_hieuID) {
        int result = thRepository.markAsDeleted(thuong_hieuID);
        return result > 0; // Trả về true nếu cập nhật thành công
    }
	
	public boolean reloadThuongHieuById(String thuong_hieuID) {
        int result = thRepository.reloadThuongHieuID(thuong_hieuID);
        return result > 0; // Trả về true nếu cập nhật thành công
    }
}
