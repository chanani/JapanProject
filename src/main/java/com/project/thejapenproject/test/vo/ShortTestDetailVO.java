package com.project.thejapenproject.test.vo;

import io.swagger.v3.oas.annotations.media.Schema;
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

    @Schema(description = "단어 번호", example = "1")
    @NotNull(message = "단어 번호는 필수입니다.")
    private Integer wordNum;

    @Schema(description = "입력 내용", example = "고양이")
    @NotBlank(message = "입력 내용는 필수입니다.")
    private String strdChoiceWord;

    @Schema(description = "정답 여부", example = "Y")
    @NotBlank(message = "정답 여부는 필수 입니다.")
    private String strdResult;

    @Schema(description = "정답 내용", example = "고양이")
    @NotBlank(message = "정답 내용은 필수입니다.")
    private String strdAnswerContent;

    @Schema(description = "정답 뜻", example = "ねこ")
    @NotBlank(message = "정답 뜻은 필수입니다.")
    private String strdAnswerMeaning;

    @Schema(description = "정답 한자", example = "猫")
    @NotBlank(message = "정답 한자는 필수입니다.")
    private String strdAnswerChinese;

}
