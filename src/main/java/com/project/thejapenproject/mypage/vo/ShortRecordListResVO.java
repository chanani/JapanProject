package com.project.thejapenproject.mypage.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ShortRecordListResVO {

    private String strNum;
    private Integer strAnswerPoint;
    private String userName;
    private String strTotalCount;
    private String strAnswerCount;
    private String strInAnswerCount;
    private Integer strTime;
    private String createdAt;
    private Integer totalElements;

}
