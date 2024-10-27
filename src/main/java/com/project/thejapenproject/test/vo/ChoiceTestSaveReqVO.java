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
public class ChoiceTestSaveReqVO {

    @NotBlank(message = "유저아이디는 필수입니다.")
    private String username;

    @NotNull(message = "전체 문제 수는 필수입니다.")
    private Integer ctrTotalCount;

    @NotNull(message = "맞춘 문제 수는 필수입니다.")
    private Integer ctrAnswerCount;

    @NotNull(message = "오답 문제 수는 필수입니다.")
    private Integer ctrInAnswerCount;

    @NotNull(message = "문제 정보는 필수입니다.")
    private ArrayList<ChoiceTestDetailVO> ctrdContent;

    private Integer ctrNum;
}
