package com.BaiTapLab.Service;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.BaiTapLab.Entity.DonHang;
import com.BaiTapLab.Entity.Voucher;
import com.BaiTapLab.Repository.DonHangRepository;
import com.BaiTapLab.Repository.VoucherRepository;

@Service
public class DonHangService {
    @Autowired
    private DonHangRepository donHangRepository;

    @Autowired
    private VoucherRepository voucherRepository;

    public DonHang applyVoucherToOrder(String don_hangid, String voucherID) {
        DonHang donHang = donHangRepository.findById(don_hangid)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng!"));

        Voucher voucher = voucherRepository.findById(voucherID)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy voucher!"));

        // Kiểm tra nếu tổng tiền nhỏ hơn don_hang_toi_thieu
        if (donHang.getTong_tien() < voucher.getDon_hang_toi_thieu()) {
            throw new RuntimeException("Tổng tiền đơn hàng không đủ để áp dụng voucher!");
        }

        if (voucher.getHan_su_dung().isBefore(LocalDate.now()) || voucher.getSo_luot_SD() <= 0) {
            throw new RuntimeException("Voucher không còn hiệu lực hoặc đã hết lượt sử dụng!");
        }

        // Sử dụng kiểu int cho giamGia
        int giamGia = voucher.getSo_tien_giam();
        
        // Cập nhật phí ship, không để phí ship < 0
        donHang.setPhi_ship(Math.max(donHang.getPhi_ship() - giamGia, 0));
        donHang.setVoucher(voucher);

        // Cập nhật lượt sử dụng và số lượng voucher
        voucher.setSo_luot_SD(voucher.getSo_luot_SD() - 1);
        voucher.setSo_luong(voucher.getSo_luong() - 1);
        
        // Lưu voucher và đơn hàng
        voucherRepository.save(voucher);
        return donHangRepository.save(donHang);
    }
    
    public DonHang cancelVoucher(String don_hangid) {
        DonHang donHang = donHangRepository.findById(don_hangid)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng!"));

        // Nếu có voucher đang áp dụng, trả phí ship về giá trị ban đầu
        if (donHang.getVoucher() != null) {
            int giamGia = donHang.getVoucher().getSo_tien_giam(); // lấy giá trị giảm giá là int
            double phiShipBanDau = donHang.getPhi_ship() + giamGia; // sử dụng kiểu int cho giamGia
            donHang.setPhi_ship(phiShipBanDau);
            donHang.setVoucher(null); // Reset voucher đã áp dụng
        }

        return donHangRepository.save(donHang);
    }

    public DonHang findByID(String don_hangid) {
        Optional<DonHang> th = donHangRepository.findById(don_hangid);
        return th.orElseThrow(() -> new RuntimeException("Không tồn tại!"));
    }
}
