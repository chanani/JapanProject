package com.project.thejapenproject.test.vo.param;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

/**
 * 단어 단답형 테스트 목록 요청 VO
 *
 * @author chanhan
 * @class ShortTestListReqVO
 * @since 2024-10-31 오후 10:16
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ShortTestListReqVO {

    @Schema(description = "문제 수", example = "10")
    @NotNull(message = "문제 수는 필수입니다.")
    private Integer questionNum;


}
