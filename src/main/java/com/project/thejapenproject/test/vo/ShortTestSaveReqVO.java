package com.project.thejapenproject.test.vo;

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

    @NotBlank(message = "유저아이디는 필수입니다.")
    private String username;

    @NotNull(message = "총 점수는 필수입니다.")
    private Integer strAnswerPoint;

    @NotNull(message = "전체 문제 수는 필수입니다.")
    private Integer strTotalCount;

    @NotNull(message = "맞춘 문제 수는 필수입니다.")
    private Integer strAnswerCount;

    @NotNull(message = "오답 문제 수는 필수입니다.")
    private Integer strInAnswerCount;

    @NotNull(message = "풀이 시간은 필수입니다.")
    private Integer strTime;

    @NotBlank(message = "테스트 종류는 필수입니다.")
    private String strType;

    @NotNull(message = "문제 정보는 필수입니다.")
    private ArrayList<ShortTestDetailVO> strdContent;



    private Integer strNum;
}
