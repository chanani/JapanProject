package com.project.thejapenproject.study.vo;

import io.swagger.v3.oas.annotations.media.Schema;
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

    @Schema(description = "아이디", example = "chanhan")
    @NotBlank(message = "아이디는 필수입니다.")
    private String username;

    @Schema(description = "제목", example = "오늘의 단어")
    @NotBlank(message = "제목은 필수입니다.")
    private String setTitle;

    @Schema(description = "단어 목록")
    @NotNull(message = "단어 목록은 필수입니다.")
    private ArrayList<WordInfo> wordList;

    @Schema(description = "단어장 번호", example = "1")
    private Integer wsNum;
}
