package com.BaiTapLab.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BaiTapLab.Entity.NhaCungCap;
import com.BaiTapLab.Repository.NhaCungCapRepository;

@Service
public class NhaCungCapService {

    @Autowired
    private NhaCungCapRepository nhaCungCapRepository;

//    public List<NhaCungCap> getAllNhaCungCap() {
//        return nhaCungCapRepository.findAll();
//    }
    
    public List<NhaCungCap> getActiveNhaCungCap() {
        return nhaCungCapRepository.findActiveNhaCungCap();
    }
}