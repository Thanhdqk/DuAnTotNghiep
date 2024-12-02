package com.BaiTapLab.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.NhaCungCap;
import com.BaiTapLab.Service.NhaCungCapService;

@RestController
@CrossOrigin("*")
public class NhaCungCapRestController {

    @Autowired
    private NhaCungCapService nhaCungCapService;

    @GetMapping("nhacungcap/all")
    public List<NhaCungCap> getAllNhaCungCap() {
        return nhaCungCapService.getActiveNhaCungCap();
    }
}
