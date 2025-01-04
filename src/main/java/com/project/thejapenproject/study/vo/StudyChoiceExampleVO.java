package com.project.thejapenproject.study.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StudyChoiceExampleVO {

    @Schema(description = "단어 내용")
    private String wordContent;

    @Schema(description = "단어 한자")
    private String wordChinese;
}

