package com.BaiTapLab.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.BaiTapLab.Entity.UserWallet;
import com.BaiTapLab.Entity.Users;

public interface UserWalletRepository extends JpaRepository<UserWallet, Integer>{
	UserWallet findByUsers(Users users);
	
	Optional<UserWallet> findByUsers_AccountID(String accountID);

	@Query(value = "select accountid from users  where accountid  in ( select user_id  from user_wallets) ", nativeQuery = true)
	List<String>  getuserthathavewallet();
}
