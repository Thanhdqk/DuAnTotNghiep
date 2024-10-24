package com.BaiTapLab.Entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "respone")
public class Respone {
	@Id
	public String responseID;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String loai_yeu_cau;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String noi_dung;
	
	public LocalDate ngay_tao;
	
	@OneToOne
    @JoinColumn(name = "feedbackID", referencedColumnName = "feedbackID")
    private Feedback feedback;
	
	@ManyToOne
	@JoinColumn(name = "accountID")
	public Users users;
}
