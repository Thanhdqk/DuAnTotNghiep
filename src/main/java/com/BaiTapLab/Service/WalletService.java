package com.BaiTapLab.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BaiTapLab.Entity.UserWallet;
import com.BaiTapLab.Repository.UserWalletRepository;

@Service
public class WalletService {

    @Autowired
    private UserWalletRepository walletRepository;

    public Optional<UserWallet> getWalletByUserId(String userId) {
        return walletRepository.findByUsers_AccountID(userId);
    }
}