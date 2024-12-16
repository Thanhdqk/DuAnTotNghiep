package com.BaiTapLab.Service;

import com.BaiTapLab.Entity.NhaCungCapChiTiet;
import com.BaiTapLab.Repository.NhaCungCapChiTietRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NhaCungCapChiTietService {

    @Autowired
    private NhaCungCapChiTietRepository nhaCungCapChiTietRepository;

    public List<NhaCungCapChiTiet> findAll() {
        return nhaCungCapChiTietRepository.findAll();
    }

    public Optional<NhaCungCapChiTiet> findById(int id) {
        return nhaCungCapChiTietRepository.findById(id);
    }

    public NhaCungCapChiTiet save(NhaCungCapChiTiet nhaCungCapChiTiet) {
        return nhaCungCapChiTietRepository.save(nhaCungCapChiTiet);
    }

    public void deleteById(int id) {
        nhaCungCapChiTietRepository.deleteById(id);
    }

    // Additional custom methods can be added here
}