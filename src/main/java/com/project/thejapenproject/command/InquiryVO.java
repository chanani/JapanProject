package com.project.thejapenproject.command;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class InquiryVO {
    private int inquiry_num;
    private String inquiry_title;
    private String inquiry_content;
    private String inquiry_writer;
    private String inquiry_password;
    private String inquiry_secret;
    private String inquiry_comment;
    private Timestamp inquiry_regdate;
    private Timestamp inquiry_comment_regdate;
    private String inquiry_email;
    private String inquiry_state;
}
