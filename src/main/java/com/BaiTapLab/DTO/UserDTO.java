package com.BaiTapLab.DTO;

import java.time.LocalDate;

import com.BaiTapLab.Entity.Users;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDTO {
 String tenHanhDong;
 LocalDate ngayhanhdong;
 Users user;
}
