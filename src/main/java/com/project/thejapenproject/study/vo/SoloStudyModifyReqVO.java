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
public class SoloStudyModifyReqVO {

    @Schema(description = "단어장 번호", example = "1")
    @NotNull(message = "단어 세트 번호는 필수입니다.")
    private Integer wsNum;

    @Schema(description = "아이디", example = "chanhan")
    @NotBlank(message = "아이디는 필수입니다.")
    private String username;

    @Schema(description = "제목", example = "오늘의 단어장")
    @NotBlank(message = "제목은 필수입니다.")
    private String setTitle;

    @Schema(description = "비공계 여부", example = "1")
    // @NotBlank(message = "비공개 여부는 필수입니다.")
    private Boolean wsSecret;

    @Schema(description = "단어 목록")
    @NotNull(message = "단어 목록는 필수입니다.")
    private ArrayList<WordInfo> wordList;
}
