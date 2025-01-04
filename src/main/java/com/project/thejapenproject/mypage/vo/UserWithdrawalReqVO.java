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
public class UserWithdrawalReqVO {

    @Schema(description = "아이디", example = "chanhan")
    @NotBlank(message = "회원 아이디는 필수입니다.")
    private String username;

}
