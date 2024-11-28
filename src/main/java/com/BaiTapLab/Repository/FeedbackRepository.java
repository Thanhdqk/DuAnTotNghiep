package com.BaiTapLab.Repository;

import com.BaiTapLab.Entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
    List<Feedback> findByUsers_AccountID(String accountID); // Assuming Users has a method getAccountID()
}
