package com.BaiTapLab.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BaiTapLab.Entity.TestWallet;
import com.BaiTapLab.Repository.TestWalletRepository;

@Service
public class TestWalletService {
	@Autowired
	TestWalletRepository testwalletRepository;
	
	public TestWallet saveTransaction(TestWallet testWallet) {
	    TestWallet existingWallet = testwalletRepository.findSoTaiKhoan(testWallet.getSo_tai_khoan());
	    if (existingWallet != null) {
	        existingWallet.setSo_tien(existingWallet.getSo_tien() + testWallet.getSo_tien());
	        existingWallet.setEmail(testWallet.getEmail()); 
	        return testwalletRepository.save(existingWallet); 
	    } else {
	        return testwalletRepository.save(testWallet);
	    }
	}
	
	public TestWallet saveTestWallet(TestWallet testWallet) {
        return testwalletRepository.save(testWallet);
    }
	
	public TestWallet findBySoTaiKhoan(String so_tai_khoan) {
        return testwalletRepository.findSoTaiKhoan(so_tai_khoan);
    }
	
	

}
