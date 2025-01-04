package com.project.thejapenproject.test.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;

/**
 * 단어 단답형 테스트 목록 저장 요청 VO
 *
 * @author chanhan
 * @class ShortTestSaveReqVO
 * @since 2024-11-03 오후 05:27
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ShortTestSaveReqVO {

    @Schema(description = "아이디", example = "chanhan")
    @NotBlank(message = "유저아이디는 필수입니다.")
    private String username;

    @Schema(description = "총 점수", example = "100")
    @NotNull(message = "총 점수는 필수입니다.")
    private Integer strAnswerPoint;

    @Schema(description = "전체 문제 수", example = "10")
    @NotNull(message = "전체 문제 수는 필수입니다.")
    private Integer strTotalCount;

    @Schema(description = "맞춘 문제 수", example = "10")
    @NotNull(message = "맞춘 문제 수는 필수입니다.")
    private Integer strAnswerCount;

    @Schema(description = "오답 문제 수", example = "0")
    @NotNull(message = "오답 문제 수는 필수입니다.")
    private Integer strInAnswerCount;

    @Schema(description = "풀이 시간", example = "10")
    @NotNull(message = "풀이 시간은 필수입니다.")
    private Integer strTime;

    @Schema(description = "테스트 종류", example = "meaning")
    @NotBlank(message = "테스트 종류는 필수입니다.")
    private String strType;

    @Schema(description = "문제 정보")
    @NotNull(message = "문제 정보는 필수입니다.")
    private ArrayList<ShortTestDetailVO> strdContent;

    @Schema(description = "단답형 단어 테스트 번호", example = "2")
    private Integer strNum;

}
