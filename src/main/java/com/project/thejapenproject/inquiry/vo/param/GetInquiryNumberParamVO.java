package com.project.thejapenproject.inquiry.vo.param;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetInquiryNumberParamVO {

    @Schema(description = "문의사항 번호", example = "")
    @NotNull(message = "문의사항 번호는 필수입니다.")
    private Integer inquiryNum;

}
