package com.project.thejapenproject.test.vo;

import io.swagger.v3.oas.annotations.media.Schema;
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

    @Schema(description = "단어 번호", example = "1")
    @NotNull(message = "단어 번호는 필수입니다.")
    private Integer wordNum;

    @Schema(description = "보기 1번", example = "보기1")
    @NotBlank(message = "보기 1번은 필수입니다.")
    private String ctrdQuestionOne;

    @Schema(description = "보기 2번", example = "보기2")
    @NotBlank(message = "보기 2번은 필수입니다.")
    private String ctrdQuestionTwo;

    @Schema(description = "보기 3번", example = "보기3")
    @NotBlank(message = "보기 3번은 필수입니다.")
    private String ctrdQuestionThree;

    @Schema(description = "보기 4번", example = "보기4")
    @NotBlank(message = "보기 4번은 필수입니다.")
    private String ctrdQuestionFour;

    @Schema(description = "정답 번호", example = "3")
    @NotNull(message = "정답 번호는 필수입니다.")
    private Integer ctrdQuestionAnswer;

    @Schema(description = "선택한 번호", example = "2")
    @NotNull(message = "선택한 번호는 필수입니다.")
    private Integer ctrdChoiceNum;

    @Schema(description = "정답 여부", example = "N")
    @NotBlank(message = "정답 여부는 필수 입니다.")
    private String ctrdResult;

    @Schema(description = "정답 내용", example = "ねこ")
    @NotBlank(message = "정답 내용은 필수입니다.")
    private String ctrdAnswerContent;

    @Schema(description = "정답 뜻", example = "고양이")
    @NotBlank(message = "정답 뜻은 필수입니다.")
    private String ctrdAnswerMeaning;

    @Schema(description = "정답 한자", example = "猫")
    @NotBlank(message = "정답 한자는 필수입니다.")
    private String ctrdAnswerChinese;


}
