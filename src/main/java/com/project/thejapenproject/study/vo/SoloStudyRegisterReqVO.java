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
public class SoloStudyRegisterReqVO {

    @NotBlank(message = "아이디는 필수입니다.")
    private String username;

    @NotBlank(message = "제목은 필수입니다.")
    private String setTitle;

    @NotNull(message = "아이디는 필수입니다.")
    private ArrayList<WordInfo> wordList;

    private Integer wsNum;
}
