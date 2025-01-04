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
public class InquiryRegisterReqVO {

    @Schema(description = "제목", example = "문의합니다.")
    @NotBlank(message = "제목은 필수입니다.")
    private String inquiryTitle;

    @Schema(description = "내용", example = "문의내용입니다.")
    @NotBlank(message = "내용은 필수입니다.")
    private String inquiryContent;

    @Schema(description = "작성자", example = "chan")
    @NotBlank(message = "작성자는 필수입니다.")
    private String inquiryWriter;

    @Schema(description = "이메일", example = "aa@aa.aa")
    @NotBlank(message = "이메일은 필수입니다.")
    private String inquiryEmail;

    @Schema(description = "비밀번호", example = "1234")
    @NotBlank(message = "비밀번호는 필수입니다.")
    private String inquiryPassword;

}
