package com.project.thejapenproject.mainpage.vo;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginReqVO {

    @Schema(description = "아이디", example = "chanahn")
    @NotBlank(message = "유저 아이디는 필수입니다.")
    private String username;

    @Schema(description = "비밀번호", example = "1234")
    @NotBlank(message = "비밀번호는 필수입니다.")
    private String password;



}
