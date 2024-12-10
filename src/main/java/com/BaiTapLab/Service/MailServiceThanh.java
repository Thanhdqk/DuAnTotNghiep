package com.BaiTapLab.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;


@Service
public class MailServiceThanh {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String to, String subject, String text) throws MessagingException {
        // Tạo một email mới
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

        // Thiết lập thông tin email
        helper.setFrom("thanh02062004@gmail.com");   // Thay bằng email của bạn
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(text, true);

        // Gửi email
        mailSender.send(mimeMessage);
        System.out.println("Email đã được gửi thành công!");
    }
}
