package com.BaiTapLab.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.BaiTapLab.Entity.DonHang;

import java.util.List;
import java.util.Optional;

@Repository
public interface DonHangRepository extends JpaRepository<DonHang, String> {
    @Query("SELECT dh FROM DonHang dh LEFT JOIN dh.diachi dc WHERE dh.users.accountID = :accountID")
    List<DonHang> findByUserIdWithAddress(@Param("accountID") String accountID);

	

//    @Query("SELECT dh FROM DonHang dh WHERE dh.don_hangid = :orderId AND dh.users.accountID = :userId")
//    DonHang findByIdAndUserId(@Param("orderId") String orderId, @Param("userId") String userId);
}
