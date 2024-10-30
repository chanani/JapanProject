package com.project.thejapenproject.mypage.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ChoiceRecordListResVO {

    private String ctrNum;
    private String userName;
    private String ctrTotalCount;
    private String ctrAnswerCount;
    private String ctrInAnswerCount;
    private Integer ctrTime;
    private String createdAt;
    private Integer totalElements;

}
