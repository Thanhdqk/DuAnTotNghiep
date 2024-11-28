package com.BaiTapLab.Entity;

import jakarta.persistence.CascadeType;
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

import java.time.LocalDate;

@Data
@Entity
@Table(name = "feedback")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto-increment ID
    private Integer feedbackID;

    @Column(columnDefinition = "NVARCHAR(255)")
    private String loai_yeu_cau;

    @Column(columnDefinition = "NVARCHAR(255)")
    private String noi_dung;

    private String hinh_anh;

    @Column(columnDefinition = "NVARCHAR(255)")
    private String trang_thai;

    @Column(name = "ngay_tao") // Creation date field
    private LocalDate ngayTao; // Chỉ lưu trữ ngày mà không có thời gian


    @OneToOne(mappedBy = "feedback", cascade = CascadeType.ALL)
    private Respone respone;

    @ManyToOne
    @JoinColumn(name = "accountID")
    private Users users;

	public Integer getFeedbackID() {
		return feedbackID;
	}

	public void setFeedbackID(Integer feedbackID) {
		this.feedbackID = feedbackID;
	}

	public String getLoai_yeu_cau() {
		return loai_yeu_cau;
	}

	public void setLoai_yeu_cau(String loai_yeu_cau) {
		this.loai_yeu_cau = loai_yeu_cau;
	}

	public String getNoi_dung() {
		return noi_dung;
	}

	public void setNoi_dung(String noi_dung) {
		this.noi_dung = noi_dung;
	}

	public String getHinh_anh() {
		return hinh_anh;
	}

	public void setHinh_anh(String hinh_anh) {
		this.hinh_anh = hinh_anh;
	}

	public String getTrang_thai() {
		return trang_thai;
	}

	public void setTrang_thai(String trang_thai) {
		this.trang_thai = trang_thai;
	}

	public LocalDate getNgayTao() {
		return ngayTao;
	}

	public void setNgayTao(LocalDate ngayTao) {
		this.ngayTao = ngayTao;
	}

	public Respone getRespone() {
		return respone;
	}

	public void setRespone(Respone respone) {
		this.respone = respone;
	}

	public Users getUsers() {
		return users;
	}

	public void setUsers(Users users) {
		this.users = users;
	}
    
}
