package com.BaiTapLab.Entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "lichsutimkiem")
public class LichSuTimKiem {
	@Id
	@Column(columnDefinition = "NVARCHAR(255)")
	public String ten_san_phamTK;
	
	public int so_lanTK;
	
	public LocalDate ngay_tao;
	
	@ManyToOne
	public Users users;
}
