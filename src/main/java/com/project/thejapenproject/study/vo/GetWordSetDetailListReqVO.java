package com.project.thejapenproject.study.vo;

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

    @NotNull(message = "단어 세트 번호는 필수입니다.")
    private Integer wsNum;

    private String username;
}
