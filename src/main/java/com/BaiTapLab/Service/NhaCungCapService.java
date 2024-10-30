package com.BaiTapLab.Service;

import com.BaiTapLab.Entity.NhaCungCap;
import com.BaiTapLab.Repository.NhaCungCapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NhaCungCapService {

    @Autowired
    private NhaCungCapRepository nhaCungCapRepository;

    public List<NhaCungCap> findAll() {
        return nhaCungCapRepository.findAll();
    }

    public Optional<NhaCungCap> findById(String id) {
        return nhaCungCapRepository.findById(id);
    }

    public NhaCungCap save(NhaCungCap nhaCungCap) {
        return nhaCungCapRepository.save(nhaCungCap);
    }

    public void deleteById(String id) {
        nhaCungCapRepository.deleteById(id);
    }
}