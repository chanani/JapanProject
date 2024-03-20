package com.project.thejapenproject.command;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NoticeVO {

    private Integer notice_num;
    private String notice_content;
    private String notice_title;
    private Timestamp notice_regdate;

}
