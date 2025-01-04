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
public class RecordNumParamVO {

    @Schema(description = "단답형 문제 번호", example = "1")
    @NotNull(message = "단답형 문제 번호는 필수입니다.")
    private Integer strNum;
}
