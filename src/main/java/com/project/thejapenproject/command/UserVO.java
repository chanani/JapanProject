package com.project.thejapenproject.command;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserVO {

    @Schema(description = "아이디")
    private String username;

    @Schema(description = "비밀번호")
    private String password;

    @Schema(description = "이름")
    private String user_name;

    @Schema(description = "이메일")
    private String user_email;

    @Schema(description = "연락처")
    private String user_phone;

    @Schema(description = "권한")
    private String role;

    @Schema(description = "가입일")
    private Timestamp user_regdate;

    @Schema(description = "마지막 접속일")
    private Timestamp user_logdate;

    @Schema(description = "이미지 경로")
    private String image_path;


}
