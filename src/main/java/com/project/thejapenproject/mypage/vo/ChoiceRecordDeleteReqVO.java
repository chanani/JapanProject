package com.project.thejapenproject.mypage.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

/**
 * 단어 선택 테스트 목록 삭제 요청 VO
 *
 * @author chanhan
 * @class : choiceRecordDeleteReqVO
 * @since 2024-10-30 오후 04:43
 */
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ChoiceRecordDeleteReqVO {

    @Schema(description = "단어 선택 테스트 고유번호", example = "1")
    @NotNull(message = "테스트 번호는 필수입니다.")
    private Integer ctrNum;
}
