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

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSo_tai_khoan() {
		return so_tai_khoan;
	}

	public void setSo_tai_khoan(String so_tai_khoan) {
		this.so_tai_khoan = so_tai_khoan;
	}

	public double getSo_du() {
		return so_du;
	}

	public void setSo_du(double so_du) {
		this.so_du = so_du;
	}

	public Users getUsers() {
		return users;
	}

	public void setUsers(Users users) {
		this.users = users;
	}

}