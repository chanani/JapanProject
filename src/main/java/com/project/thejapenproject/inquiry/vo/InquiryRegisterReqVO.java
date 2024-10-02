package com.project.thejapenproject.inquiry.vo;

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

    @NotBlank(message = "제목은 필수입니다.")
    private String inquiryTitle;
    @NotBlank(message = "내용은 필수입니다.")
    private String inquiryContent;
    @NotBlank(message = "작성자는 필수입니다.")
    private String inquiryWriter;
    @NotBlank(message = "이메일은 필수입니다.")
    private String inquiryEmail;
    @NotBlank(message = "비밀번호는 필수입니다.")
    private String inquiryPassword;

}
