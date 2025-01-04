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
public class UserMypageResVO {

    @Schema(description = "아이디")
    private String username;

    @Schema(description = "이름")
    private String userName;

    @Schema(description = "이메일")
    private String userEmail;

    @Schema(description = "연락처")
    private String userPhone;

    @Schema(description = "이미지 경로")
    private String imagePath;
}
