package com.project.thejapenproject.test.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChoiceTestDetailVO {

    @NotNull(message = "단어 번호는 필수입니다.")
    private Integer wordNum;

    @NotBlank(message = "보기 1번은 필수입니다.")
    private String ctrdQuestionOne;

    @NotBlank(message = "보기 2번은 필수입니다.")
    private String ctrdQuestionTwo;

    @NotBlank(message = "보기 3번은 필수입니다.")
    private String ctrdQuestionThree;

    @NotBlank(message = "보기 4번은 필수입니다.")
    private String ctrdQuestionFour;

    @NotNull(message = "정답 번호는 필수입니다.")
    private Integer ctrdQuestionAnswer;

    @NotNull(message = "선택한 번호는 필수입니다.")
    private Integer ctrdChoiceNum;

    @NotBlank(message = "정답 여부는 필수 입니다.")
    private String ctrdResult;

    @NotBlank(message = "정답 내용은 필수입니다.")
    private String ctrdAnswerContent;

    @NotBlank(message = "정답 뜻은 필수입니다.")
    private String ctrdAnswerMeaning;

    @NotBlank(message = "정답 한자는 필수입니다.")
    private String ctrdAnswerChinese;


}
