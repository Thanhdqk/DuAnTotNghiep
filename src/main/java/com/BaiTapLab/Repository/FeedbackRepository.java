package com.BaiTapLab.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.BaiTapLab.Entity.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
    List<Feedback> findByUsers_AccountID(String accountID); // Assuming Users has a method getAccountID()
}
