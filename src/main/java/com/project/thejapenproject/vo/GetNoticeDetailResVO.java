package com.project.thejapenproject.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetNoticeDetailResVO {

    private String noticeNum;
    private String noticeTitle;
    private String noticeContent;
    private String noticeRegDate;
    private Integer position;


}
