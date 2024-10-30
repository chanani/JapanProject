package com.project.thejapenproject.mypage.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ChoiceRecordListDetailResVO {

    private Integer ctrdNum;
    private Integer wordNum;
    private String ctrdQuestionOne;
    private String ctrdQuestionTwo;
    private String ctrdQuestionThree;
    private String ctrdQuestionFour;
    private String ctrdQuestionAnswer;
    private String ctrdChoiceNum;
    private String ctrdAnswerContent;
    private String ctrdAnswerMeaning;
    private String ctrdAnswerChinese;
    private String ctrdResult;
    private String createdAt;

}
