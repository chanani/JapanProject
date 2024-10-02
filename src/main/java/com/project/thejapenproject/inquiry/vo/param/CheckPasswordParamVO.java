package com.project.thejapenproject.inquiry.vo.param;

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

    @NotNull(message = "문의사항 번호는 필수입니다.")
    private Integer inquiryNum;
    @NotNull(message = "문의사항 비밀번호는 필수입니다.")
    private String inquiryPassword;
}
