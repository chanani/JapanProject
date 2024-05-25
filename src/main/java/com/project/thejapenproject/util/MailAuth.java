package com.project.thejapenproject.util;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;

public class MailAuth extends Authenticator {
    PasswordAuthentication pa;

    public MailAuth() {
        String mail_id = "ohohuniverse9@gmail.com";
        String mail_pw = "agxkwgiqzprljlzo";

        pa = new PasswordAuthentication(mail_id, mail_pw);
    }

    public PasswordAuthentication getPasswordAuthentication() {
        return pa;
    }


}
