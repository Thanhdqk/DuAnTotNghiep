package com.BaiTapLab.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.BaiTapLab.Entity.Roles;
import com.BaiTapLab.Entity.Users;

public interface UsersRepository extends JpaRepository<Users, String> {
	Optional<Users> findByAccountIDAndPassword(String accountID, String password);
	Users findByAccountID(String accountID);
	@Query("SELECT u FROM Users u LEFT JOIN u.roles r WHERE u.accountID = :accountID")
	Optional<Users> findUserWithRolesByAccountId(@Param("accountID") String accountID);
}
