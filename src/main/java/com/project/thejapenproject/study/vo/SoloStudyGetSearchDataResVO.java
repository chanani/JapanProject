package com.project.thejapenproject.study.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SoloStudyGetSearchDataResVO {

    @Schema(description = "1")
    private Integer wordNum;

    @Schema(description = "단어 내용")
    private String wordContent;

    @Schema(description = "단어 뜻")
    private String wordMeaning;

    @Schema(description = "단어 한자")
    private String wordChinese;

    @Schema(description = "총 데이터 수")
    private Integer totalElements;

}
