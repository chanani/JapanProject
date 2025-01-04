package com.project.thejapenproject.mypage.vo;

import io.swagger.v3.oas.annotations.media.Schema;
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

    @Schema(description = "아이디", example = "chanhan")
    @NotBlank(message = "회원 아이디는 필수입니다.")
    private String username;

    @Schema(description = "이메일", example = "aa@aa.aa")
    @NotBlank(message = "회원 이메일은 필수입니다.")
    private String userEmail;

    @Schema(description = "연락처", example = "010-0000-0000")
    @NotBlank(message = "회원 연락처는 필수입니다.")
    private String userPhone;


}
