package com.project.thejapenproject.study.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SoloStudyRemoveReqVO {

    @NotNull(message = "단어 세트 번호는 필수입니다.")
    private Integer wsNum;

    @NotBlank(message = "아이디는 필수입니다.")
    private String username;

}
