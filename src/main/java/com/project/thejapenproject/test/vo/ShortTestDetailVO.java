package com.project.thejapenproject.test.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * 단어 단답형 테스트 상세 목록 VO
 *
 * @author chanhan
 * @class ShortTestSaveReqVO
 * @since 2024-11-03 오후 05:29
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ShortTestDetailVO {

    @NotNull(message = "단어 번호는 필수입니다.")
    private Integer wordNum;

    @NotBlank(message = "입력 내용는 필수입니다.")
    private String strdChoiceWord;

    @NotBlank(message = "정답 여부는 필수 입니다.")
    private String strdResult;

    @NotBlank(message = "정답 내용은 필수입니다.")
    private String strdAnswerContent;

    @NotBlank(message = "정답 뜻은 필수입니다.")
    private String strdAnswerMeaning;

    @NotBlank(message = "정답 한자는 필수입니다.")
    private String strdAnswerChinese;

}
