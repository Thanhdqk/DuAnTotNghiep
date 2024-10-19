package com.BaiTapLab.Entity;


import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@jakarta.persistence.Entity
@Table(name = "users")
public class Users {
    @Id
    private String accountID;

    
    private String password;

    @Column(columnDefinition = "NVARCHAR(255)")
    private String hovaten;

    private String hinh_anh;

    @Column(columnDefinition = "NVARCHAR(255)")
    private String vai_tro;

    private String so_dien_thoai;
    private String email;

    @Column(columnDefinition = "NVARCHAR(255)")
    private String dia_chi;
}
