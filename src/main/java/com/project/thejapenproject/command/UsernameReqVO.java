package com.project.thejapenproject.command;

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
public class UsernameReqVO {

    @Schema(description = "아이디", example = "chanhan")
    @NotBlank(message = "아이디는 필수 입니다.")
    private String username;

}
