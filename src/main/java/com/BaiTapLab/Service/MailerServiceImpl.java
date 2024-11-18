package com.BaiTapLab.Service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import com.BaiTapLab.Entity.MailInfo;

import freemarker.cache.FileTemplateLoader;
import freemarker.template.Configuration;
import freemarker.template.Template;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.ServletContext;

@Service
public class MailerServiceImpl implements MailerService {
	List<MailInfo> listEmails = new ArrayList<>();
	@Autowired
	JavaMailSender sender;
	@Autowired
	public Configuration config;
	@Autowired
	ServletContext context;

	@Override
	public void send(MailInfo mail) throws MessagingException {
		MimeMessage message = sender.createMimeMessage();
		// Sử dụng Helper để thiết lập các thông tin cần thiết cho message
		MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");
		helper.setFrom(mail.getFrom());
		helper.setTo(mail.getTo());
		helper.setSubject(mail.getSubject());
		helper.setText(mail.getBody(), true);
		helper.setReplyTo(mail.getFrom());

		String[] cc = mail.getCc();
		// Kiểm tra mảng cc có tồn tại hay không
		if (cc != null && cc.length > 0) {
			helper.setCc(cc);
		}

		String[] bcc = mail.getBcc();
		// Kiểm tra mảng bcc có tồn tại hay không
		if (bcc != null && bcc.length > 0) {
			helper.setBcc(bcc);
		}
		// Mảng file
		List<File> files = mail.getFiles();
		if (files.size() > 0) {
			for (File file : files) {
				helper.addAttachment(file.getName(), file);
			}
		}
		// Gửi message đến SMTP server
		sender.send(message);
	}

	@Override
	public void send(String to, String subject, String body) throws MessagingException {
		this.send(new MailInfo(to, subject, body));
	}

	@Override
	public void queue(MailInfo mail) {
		listEmails.add(mail);
	}

	@Override
	public void queue(String to, String subject, String body) {
		queue(new MailInfo(to, subject, body));
	}

	@Scheduled(fixedDelay = 1000)
	public void run() {
		while (!listEmails.isEmpty()) {
			MailInfo mail = listEmails.remove(0);
			try {
				this.send(mail);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	@Override
	public String bodyTemplate(Map<String, Object> model) {
		String html = "";
		try {
			MimeMessage message = sender.createMimeMessage();
			// Sử dụng Helper để thiết lập các thông tin cần thiết cho message
			MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");

			// add attachment
			File img = new File("/logo.png");
			helper.addAttachment("logo.png", img);
			String opt = "";
//			 model = new HashMap();

//			opt = (String) context.getAttribute("optset");
//			String mail = (String) context.getAttribute("mail");
//			model.put("myProperty", opt);
//			model.put("mail", mail);
			FileTemplateLoader templateLoader = new FileTemplateLoader(
					new File("D:\\FPT Polytechnic Learning Materials\\totnghiep_workspace\\backend2\\DuAnTotNghiep\\src\\main\\resources"));
			config.setTemplateLoader(templateLoader);
			Template t = config.getTemplate("email.ftl");
			html = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return html;
	}

	@Override
	public String bodyTemplate1() {
		// TODO Auto-generated method stub
		return null;
	}
}
