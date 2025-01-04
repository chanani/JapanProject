package com.project.thejapenproject.mypage.vo.param;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class UsernameParamVO {

    @Schema(description = "아이디", example = "chanhan")
    @NotBlank(message = "유저 아이디는 필수입니다.")
    private String username;

}
