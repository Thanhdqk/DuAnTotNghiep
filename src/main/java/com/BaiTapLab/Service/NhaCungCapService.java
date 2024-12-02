package com.BaiTapLab.Service;

import com.BaiTapLab.Entity.HanhDong;
import com.BaiTapLab.Entity.NhaCungCap;
import com.BaiTapLab.Repository.HanhDongReopository;
import com.BaiTapLab.Repository.NhaCungCapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NhaCungCapService {

    @Autowired
    private NhaCungCapRepository nhaCungCapRepository;
    @Autowired
    HanhDongReopository HanhDongReopository;

    public List<NhaCungCap> findAll() {
        return nhaCungCapRepository.findAll();
    }

    public Optional<NhaCungCap> findById(String id) {
        return nhaCungCapRepository.findById(id);
    }

    public NhaCungCap createNhaCungCap(NhaCungCap nhaCungCap) {
    	 NhaCungCap nhaCungCap2 = nhaCungCapRepository.save(nhaCungCap);
    	HanhDong hd = new HanhDong();
		hd.setNhacungcap(nhaCungCap);
		hd.setTen_hanh_dong("Thêm");
		HanhDongReopository.save(hd);
    	
        return nhaCungCap2;
      
    }

    public void deleteById(String id) {
        nhaCungCapRepository.deleteById(id);
    }
}