package com.project.thejapenproject.test.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetTestListResVO {

    @Schema(description = "단어 번호")
    private Integer wordNum;

    @Schema(description = "단어 뜻")
    private String wordMeaning;

    @Schema(description = "단어 내용")
    private String wordContent;

    @Schema(description = "단어 한자")
    private String wordChinese;
}
