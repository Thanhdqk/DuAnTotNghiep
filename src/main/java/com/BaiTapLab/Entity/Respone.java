package com.BaiTapLab.Entity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	public int responseID;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String loai_yeu_cau;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String noi_dung;
	
	public LocalDate ngay_tao;
	
	@OneToOne
	@JsonManagedReference
    @JoinColumn(name = "feedbackID", referencedColumnName = "feedbackID")
    private Feedback feedback;
	
	@ManyToOne
	@JoinColumn(name = "accountID")
	@JsonProperty(value = "user",access = Access.READ_ONLY)
	public Users users;
}
