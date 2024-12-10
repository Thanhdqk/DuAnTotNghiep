package com.BaiTapLab.DTO;

import com.BaiTapLab.Entity.DanhMuc;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HanhDongDTO {

    private String tenHanhDong;
    private DanhMuc danhMuc;

   
    
}