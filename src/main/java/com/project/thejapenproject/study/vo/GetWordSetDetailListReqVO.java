package com.project.thejapenproject.study.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetWordSetDetailListReqVO {

    @Schema(description = "단어장 번호", example = "1")
    @NotNull(message = "단어장 번호는 필수입니다.")
    private Integer wsNum;

    @Schema(description = "아이디", example = "chanhan")
    private String username;
}
