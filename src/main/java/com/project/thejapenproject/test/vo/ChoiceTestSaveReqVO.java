package com.project.thejapenproject.test.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChoiceTestSaveReqVO {

    @Schema(description = "아이디", example = "chanhan")
    @NotBlank(message = "유저아이디는 필수입니다.")
    private String username;

    @Schema(description = "총 점수", example = "100")
    @NotNull(message = "총 점수는 필수입니다.")
    private Integer ctrAnswerPoint;

    @Schema(description = "전체 문제 수", example = "10")
    @NotNull(message = "전체 문제 수는 필수입니다.")
    private Integer ctrTotalCount;

    @Schema(description = "맞춘 문제 수", example = "10")
    @NotNull(message = "맞춘 문제 수는 필수입니다.")
    private Integer ctrAnswerCount;

    @Schema(description = "오답 문제 수", example = "0")
    @NotNull(message = "오답 문제 수는 필수입니다.")
    private Integer ctrInAnswerCount;

    @Schema(description = "풀이 시간", example = "10")
    @NotNull(message = "풀이 시간은 필수입니다.")
    private Integer ctrTime;

    @Schema(description = "문제 정보")
    @NotNull(message = "문제 정보는 필수입니다.")
    private ArrayList<ChoiceTestDetailVO> ctrdContent;

    @Schema(description = "단어 선택 테스트 번호", example = "1")
    private Integer ctrNum;
}
