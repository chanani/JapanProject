package com.project.thejapenproject.inquiry.vo.param;

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
public class GetInquiryKeywordParamVO {

    @Schema(description = "검색 키워드", example = "")
    @NotBlank(message = "검색 키워드는 필수입니다.")
    private String keyword;

}
