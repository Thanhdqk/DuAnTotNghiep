package com.BaiTapLab.DTO;

import java.time.LocalDate;

import com.BaiTapLab.Entity.Banner;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BannerDTO {
 String tenHanhDong;
 LocalDate ngayhanhdong;
 Banner banner;
}
