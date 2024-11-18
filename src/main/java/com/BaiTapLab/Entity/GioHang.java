package com.BaiTapLab.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "giohang")
public class GioHang {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    public int id;
	
	
	
	@ManyToOne
    @JoinColumn(name = "accountID")
    @JsonManagedReference
    private Users users;

    @OneToMany(mappedBy = "gioHang", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<GioHangChiTiet> gioHangChiTiet;

}