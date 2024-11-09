package com.BaiTapLab.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BaiTapLab.Entity.Voucher;
import com.BaiTapLab.Repository.VoucherRepository;

@Service
public class VoucherService {
	@Autowired
	VoucherRepository voucherRepository;
	
	public Voucher createVoucher(Voucher voucher) {
		return voucherRepository.save(voucher);
	}
	
	public Voucher findByVoucherID(String voucherID) {
	    return voucherRepository.findByVoucherID(voucherID)
	            .orElseThrow();
	}
	
	public Voucher updateVoucher(Voucher updatedVoucher) throws Exception {
        // Kiểm tra xem voucher có tồn tại không
        if (!voucherRepository.existsById(updatedVoucher.getVoucherID())) {
            throw new Exception("Voucher not found with ID: " + updatedVoucher.getVoucherID());
        }

        // Cập nhật voucher trong cơ sở dữ liệu
        return voucherRepository.save(updatedVoucher);
    }
	
	public void deleteVoucher(String voucherID) throws Exception {
	    // Kiểm tra xem voucher có tồn tại không trước khi xóa
	    if (!voucherRepository.existsById(voucherID)) {
	        throw new Exception("Voucher not found with ID: " + voucherID);
	    }
	    // Thực hiện xóa voucher
	    voucherRepository.deleteById(voucherID);
	}
	

	public boolean deleteVoucherById(String voucherID) {
        int result = voucherRepository.markAsDeleted(voucherID);
        return result > 0; // Trả về true nếu cập nhật thành công
    }
	
	public boolean reloadVoucherById(String voucherID) {
        int result = voucherRepository.reloadVoucherID(voucherID);
        return result > 0; // Trả về true nếu cập nhật thành công
    }

}