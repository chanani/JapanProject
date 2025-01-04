package com.project.thejapenproject.study.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StudyChoiceResVO {

    @Schema(description = "단어 번호")
    private Integer wordNum;

    @Schema(description = "단어 뜻")
    private String wordMeaning;

    @Schema(description = "단어 내용")
    private String wordContent;

    @Schema(description = "단어 한자")
    private String wordChinese;

    @Schema(description = "예제 목록 + 정답 포함 목록")
    private ArrayList<String> wordContentList;

}
