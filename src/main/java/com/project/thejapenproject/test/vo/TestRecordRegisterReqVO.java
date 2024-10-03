package com.project.thejapenproject.test.vo;

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
public class TestRecordRegisterReqVO {

    @NotBlank(message = "유저 아이디는 필수입니다.")
    private String username;

    @NotNull(message = "단계는 필수입니다.")
    private Integer level;

    @NotNull(message = "점수는 필수입니다.")
    private Integer point;

    @NotNull(message = "시험 내용은 필수입니다.")
    private ArrayList<Object> answer;

    @NotBlank(message = "종류는 필수입니다.")
    private String kind;

}
