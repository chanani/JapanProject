package com.project.thejapenproject.inquiry.vo;

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
public class GetInquiryListReqVO {

    @Schema(description = "페이지 수", example = "1")
    @NotNull(message = "페이지 수는 필수입니다.")
    private Integer page = 1;

    @Schema(description = "목록 수", example = "10")
    @NotNull(message = "목록 수는 필수입니다.")
    private Integer size = 10;

    @Schema(description = "검색 키워드", example = "문의")
    private String keyword;

    @Schema(description = "offset", hidden = true)
    private Integer offset;


}
