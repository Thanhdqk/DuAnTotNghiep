package com.BaiTapLab.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.BaiTapLab.Entity.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
	List<Feedback> findByUsers_AccountID(String accountID); // Assuming Users has a method getAccountID()

	@Query("Select p from Feedback p where p.trang_thai like ?1")
	List<Feedback> findallwithsentstatus(String trang_thai);
}