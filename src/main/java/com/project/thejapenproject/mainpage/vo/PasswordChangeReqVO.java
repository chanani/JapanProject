package com.project.thejapenproject.mainpage.vo;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PasswordChangeReqVO {

    @NotBlank(message = "유저 아이디는 필수입니다.")
    private String email;

    @NotBlank(message = "변경할 비밀번호는 필수입니다.")
    private String password;


}
