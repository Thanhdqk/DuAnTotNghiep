package com.BaiTapLab.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.PhuongThucTT;
import com.BaiTapLab.Service.ThanhToanService;

@RestController
@CrossOrigin("*")
public class ThanhToanRestController {
	@Autowired
	private ThanhToanService thanhtoanService;
	
	@GetMapping("/loadTable")
    public List<PhuongThucTT> loadTable() {
        return thanhtoanService.findAll();
    }

    @PostMapping("/addThanhToan")
    public PhuongThucTT addThanhToan(@RequestBody PhuongThucTT thanhToan) {
        return thanhtoanService.save(thanhToan);
    }

    @PutMapping("/thanhtoan/update/{phuong_thucTTID}")
    public PhuongThucTT updateThanhToan(@PathVariable("phuong_thucTTID") String phuong_thucTTID, @RequestBody PhuongThucTT thanhToan) {
    	PhuongThucTT existingTH = thanhtoanService.findByID(phuong_thucTTID);
        // Update fields here if necessary
        return thanhtoanService.save(thanhToan);
    }


    @DeleteMapping("/thanhtoan/delete/{phuong_thucTTID}")
    public void deleteThanhToan(@PathVariable("phuong_thucTTID") String phuong_thucTTID) {
        thanhtoanService.deleteByID(phuong_thucTTID);
    }
}
