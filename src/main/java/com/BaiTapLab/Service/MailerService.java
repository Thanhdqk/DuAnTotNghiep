package com.BaiTapLab.Service;
import java.util.Map;
import com.BaiTapLab.Entity.MailInfo;

import jakarta.mail.MessagingException;

public interface MailerService {
	/** 
	  * Gửi email 
	  * @param mail thông tin email 
	  * @throws MessagingException lỗi gửi email 
	  */ 
	 void send(MailInfo mail) throws MessagingException; 
	 /** 
	  * Gửi email đơn giản 
	  * @param to email người nhận 
	  * @param subject tiêu đề email 
	  * @param body nội dung email 
	  * @throws MessagingException lỗi gửi email 
	  */ 
	 void send(String to, String subject, String body) throws MessagingException; 
	 
	 void queue(MailInfo mail);
	 
	 void queue(String to, String subject, String body);
	 
	 String bodyTemplate1();
	String bodyTemplate(Map<String, Object> model);
}