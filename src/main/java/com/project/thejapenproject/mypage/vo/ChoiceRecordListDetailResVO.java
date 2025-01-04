package com.project.thejapenproject.mypage.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ChoiceRecordListDetailResVO {

    @Schema(description = "단어 선택 테스트 번호")
    private Integer ctrdNum;

    @Schema(description = "단어 번호")
    private Integer wordNum;

    @Schema(description = "보기 1번")
    private String ctrdQuestionOne;

    @Schema(description = "보기 2번")
    private String ctrdQuestionTwo;

    @Schema(description = "보기 3번")
    private String ctrdQuestionThree;

    @Schema(description = "보기 4번")
    private String ctrdQuestionFour;

    @Schema(description = "정답 번호")
    private String ctrdQuestionAnswer;

    @Schema(description = "선택한 번호")
    private String ctrdChoiceNum;

    @Schema(description = "정답 내용")
    private String ctrdAnswerContent;

    @Schema(description = "정답 뜻")
    private String ctrdAnswerMeaning;

    @Schema(description = "정답 한자")
    private String ctrdAnswerChinese;

    @Schema(description = "정답 여부")
    private String ctrdResult;

    @Schema(description = "등록일")
    private String createdAt;

}
