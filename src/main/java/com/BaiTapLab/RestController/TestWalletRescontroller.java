package com.BaiTapLab.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.TestWallet;
import com.BaiTapLab.Service.TestWalletService;

@RestController
@RequestMapping("/api/wallet")
@CrossOrigin(origins = "http://localhost:3000")
public class TestWalletRescontroller {
	@Autowired
    private TestWalletService testWalletService;

	@PostMapping("/save")
	public ResponseEntity<TestWallet> saveWallet(@RequestBody TestWallet testWallet) {
	    TestWallet savedWallet = testWalletService.saveTransaction(testWallet);
	    return new ResponseEntity<>(savedWallet, HttpStatus.CREATED);
	}
}