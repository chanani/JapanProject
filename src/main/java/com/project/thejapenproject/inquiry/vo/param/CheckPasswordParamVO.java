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
public class CheckPasswordParamVO {

    @Schema(description = "문의사항 번호", example = "1")
    @NotNull(message = "문의사항 번호는 필수입니다.")
    private Integer inquiryNum;

    @Schema(description = "문의사항 비밀번호", example = "1234")
    @NotNull(message = "문의사항 비밀번호는 필수입니다.")
    private String inquiryPassword;
}
