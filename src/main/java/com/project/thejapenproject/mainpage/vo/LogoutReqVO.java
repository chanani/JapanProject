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
public class LogoutReqVO {

    @NotBlank(message = "유저 아이디는 필수입니다.")
    private String username;


}
