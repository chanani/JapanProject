package com.project.thejapenproject.command;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class UserAccessToken {

    @Schema(description = "access token")
    @JsonProperty("accessToken")
    private String accessToken;

    @Schema(description = "refresh token")
    @JsonProperty("refreshToken")
    private String refreshToken;

    @Schema(description = "아이디")
    @JsonProperty("username")
    private String username;
}
