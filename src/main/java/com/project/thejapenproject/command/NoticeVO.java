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

    private Integer noticeNum;
    private String noticeContent;
    private String noticeTitle;
    private Timestamp noticeRegdate;
    private Integer totalElements;

}
