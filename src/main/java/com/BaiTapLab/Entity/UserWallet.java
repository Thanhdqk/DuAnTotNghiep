package com.BaiTapLab.Entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "user_wallets")
public class UserWallet {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	 public String so_tai_khoan;
	 
	 private double so_du;
	 
	 @OneToOne
	 @JoinColumn(name = "user_id", referencedColumnName = "accountID") // Sử dụng accountID thay vì ID
	 private Users users;

}
