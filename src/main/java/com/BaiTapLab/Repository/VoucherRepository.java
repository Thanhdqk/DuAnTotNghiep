package com.BaiTapLab.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.BaiTapLab.Entity.Voucher;

@Repository
public interface VoucherRepository extends JpaRepository<Voucher, String> {

	/**
	 * Truy vấn để tìm các voucher không được sử dụng hoặc không nằm trong các trạng
	 * thái: - "Đã giao" - "Đang chờ xử lý" - "Đang chuẩn bị" - "Đang giao" Với một
	 * người dùng cụ thể, hoặc thuộc trạng thái "Đã Hủy".
	 * 
	 * @param userId ID của tài khoản người dùng.
	 * @return Danh sách các voucher thỏa mãn điều kiện.
	 */
	@Query(value = """
			    SELECT *
			    FROM voucher
			    WHERE
			        voucherid NOT IN (
			            SELECT voucherid
			            FROM donhang
			            WHERE trang_thai IN (N'Đã giao', N'Đang chờ xử lý', N'Đang chuẩn bị', N'Đang giao')
			            AND accountid = :userId
			            AND voucherid IS NOT NULL
			        )
			        OR voucherid IN (
			            SELECT voucherid
			            FROM donhang
			            WHERE trang_thai = N'Đã Hủy'
			            AND accountid = :userId
			        )
			""", nativeQuery = true)
	List<Voucher> findUnusedOrNotDeliveredVouchers(@Param("userId") String userId);
}
