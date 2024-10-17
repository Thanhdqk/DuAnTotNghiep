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
@Table(name = "feedback")
public class Feedback {
	@Id
	public String feedbackID;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String loai_yeu_cau;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String noi_dung;
	
	public String hinh_anh;
	
	@ManyToOne
	public Users users;
}
