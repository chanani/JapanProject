package com.project.thejapenproject.command;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WordVO {

    @Schema(description = "단어 번호")
    private Integer wordNum;

    @Schema(description = "레벨")
    private Integer wordLevel;

    @Schema(description = "뜻")
    private String wordMeaning;

    @Schema(description = "내용")
    private String wordContent;

    @Schema(description = "한자")
    private String wordChinese;

    @Schema(description = "단어 즐겨찾기 여부")
    private boolean wordFavorite;
}
