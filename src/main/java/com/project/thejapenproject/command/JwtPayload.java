package com.project.thejapenproject.command;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class JwtPayload {
    @JsonProperty("data")
    private String data;

    @JsonProperty("sub")
    private String subject;

    @JsonProperty("iss")
    private String domain;

    @JsonProperty("iat")
    private Long iat;

    @JsonProperty("exp")
    private Long exp;
}
