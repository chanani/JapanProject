package com.project.thejapenproject.mypage.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class UserInfoModifyReqVO {

    @NotBlank(message = "회원 아이디는 필수입니다.")
    private String username;
    @NotBlank(message = "회원 이메일은 필수입니다.")
    private String userEmail;
    @NotBlank(message = "회원 연락처는 필수입니다.")
    private String userPhone;


}
