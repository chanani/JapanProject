package com.project.thejapenproject.utils;

import javax.mail.*;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.Properties;

public class MailSend {
    private String authNum;
    public String getAuthNum() {
        return authNum;
    }

    public void setAuthNum(String authNum) {
        this.authNum = authNum;
    }

    public String welcomeMailSend(String emailInput, String authNum ) {

        Properties prop = System.getProperties();

        // 로그인시 TLS를 사용할 것인지 설정
        prop.put("mail.smtp.starttls.enable", "true");

        // 이메일 발송을 처리해줄 SMTP서버
        prop.put("mail.smtp.host", "smtp.gmail.com");

        // SMTP 서버의 인증을 사용한다는 의미
        prop.put("mail.smtp.auth", "true");

        // TLS의 포트번호는 587이며 SSL의 포트번호는 465이다.
        prop.put("mail.smtp.port", "587");

        prop.put("mail.smtp.ssl.protocols", "TLSv1.2");

        Authenticator auth = new MailAuth();

        Session session = Session.getDefaultInstance(prop, auth);

        MimeMessage msg = new MimeMessage(session);

        try {
            // 보내는 날짜 지정
            msg.setSentDate(new Date());

            // 발송자를 지정한다. 발송자의 메일, 발송자명
            msg.setFrom(new InternetAddress("ohohuniverse9@gmail.com", "The Japan"));

            // 수신자의 메일을 생성한다.
            InternetAddress to = new InternetAddress(emailInput);

            // Message 클래스의 setRecipient() 메소드를 사용하여 수신자를 설정한다. setRecipient() 메소드로 수신자, 참조,
            // 숨은 참조 설정이 가능하다.
            // Message.RecipientType.TO : 받는 사람
            // Message.RecipientType.CC : 참조
            // Message.RecipientType.BCC : 숨은 참조
            msg.setRecipient(Message.RecipientType.TO, to);

            // 메일의 제목 지정
            msg.setSubject("The Japan에서 인증번호가 발송되었습니다.", "UTF-8");

            // Transport는 메일을 최종적으로 보내는 클래스로 메일을 보내는 부분이다.
            msg.setText("비밀번호 초기화를 위해 인증번호를 발송합니다. \n인증번호 : " + authNum, "UTF-8");

            Transport.send(msg);
            System.out.println(authNum);
            return "인증번호 발송에 성공하였습니다.";
        } catch (AddressException ae) {
            System.out.println("AddressException : " + ae.getMessage());
            return "인증번호 발송에 실패하였습니다.";
        } catch (MessagingException me) {
            System.out.println("MessagingException : " + me.getMessage());
            return "인증번호 발송에 실패하였습니다.";
        } catch (UnsupportedEncodingException e) {
            System.out.println("UnsupportedEncodingException : " + e.getMessage());
            return "인증번호 발송에 실패하였습니다.";
        }
    }
}
