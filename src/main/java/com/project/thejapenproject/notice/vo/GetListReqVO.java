package com.project.thejapenproject.notice.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetListReqVO {

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
}
