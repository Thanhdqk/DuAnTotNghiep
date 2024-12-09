package com.BaiTapLab.DTO;


import java.time.LocalDate;

import com.BaiTapLab.Entity.NhaCungCap;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class NhaCungCapDTO {
 String tenHanhDong;
 LocalDate ngayhanhdong;
 NhaCungCap nhacungcap;

}
