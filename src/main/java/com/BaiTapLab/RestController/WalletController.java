package com.BaiTapLab.RestController;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.UserWallet;
import com.BaiTapLab.Service.WalletService;

@RestController
@RequestMapping("/wallets")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST,
		RequestMethod.PUT, RequestMethod.DELETE })
public class WalletController {

	@Autowired
	private WalletService walletService;

	// API để lấy thông tin ví của người dùng theo ID
	@GetMapping("/{userId}")
	public ResponseEntity<UserWallet> getWalletByUserId(@PathVariable String userId) {
		Optional<UserWallet> wallet = walletService.getWalletByUserId(userId);
		return wallet.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
	}
}