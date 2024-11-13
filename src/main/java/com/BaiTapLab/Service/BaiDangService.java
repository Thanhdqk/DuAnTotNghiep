package com.BaiTapLab.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BaiTapLab.Entity.BaiDang;
import com.BaiTapLab.Repository.BaiDangRepository;

@Service
public class BaiDangService {
	@Autowired
	BaiDangRepository baiDangRepository;
	
	public BaiDang createBaiDang(BaiDang baidang) {
		return baiDangRepository.save(baidang);
	}
	
	public BaiDang findByBaiDangID(String bai_dangID) {
	    return baiDangRepository.findById(bai_dangID)
	            .orElseThrow();
	}
	
	public BaiDang updateBaiDang(BaiDang updatedBaiDang) throws Exception {
        // Kiểm tra xem voucher có tồn tại không
        if (!baiDangRepository.existsById(updatedBaiDang.getBai_dangID())) {
            throw new Exception("BaiDang not found with ID: " + updatedBaiDang.getBai_dangID());
        }

        // Cập nhật voucher trong cơ sở dữ liệu
        return baiDangRepository.save(updatedBaiDang);
    }
	
	public void deleteBaiDang(String bai_dangID) throws Exception {
	    // Kiểm tra xem voucher có tồn tại không trước khi xóa
	    if (!baiDangRepository.existsById(bai_dangID)) {
	        throw new Exception("BaiDang not found with ID: " + bai_dangID);
	    }
	    // Thực hiện xóa voucher
	    baiDangRepository.deleteById(bai_dangID);
	}
	

	public boolean deleteBaiDangById(String bai_dangID) {
        int result = baiDangRepository.markAsDeleted(bai_dangID);
        return result > 0; // Trả về true nếu cập nhật thành công
    }
	
	public boolean reloadBaiDangById(String bai_dangID) {
        int result = baiDangRepository.reloadBaiDangID(bai_dangID);
        return result > 0; // Trả về true nếu cập nhật thành công
    }
}
