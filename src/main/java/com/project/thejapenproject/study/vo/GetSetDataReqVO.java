package com.project.thejapenproject.study.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;


/**
 * 세트 단어 목록 조회 요청 VO
 *
 * @author chanhan
 * @class : GetSetDataReqVO
 * @since 2024-11-27 오후 07:37
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetSetDataReqVO {

    @Schema(description = "페이지수", example = "1")
    @NotNull(message = "페이지 수는 필수입니다.")
    @Builder.Default
    private Integer page = 1;

    @Schema(description = "목록 수", example = "10")
    @NotNull(message = "목록 수는 필수입니다.")
    @Builder.Default
    private Integer size = 10;

    @Schema(description = "offset", hidden = true)
    private Integer offset;

    @Schema(description = "아이디", example = "chanhan")
    @NotNull(message = "아이디는 필수입니다.")
    private String username;


}
