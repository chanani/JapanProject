package com.project.thejapenproject.admin.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddWordListVO {

    @Schema(description = "단어", example = "ねこ")
    private String wordContent;

    @Schema(description = "뜻", example = "고양이")
    private String wordMeaning;

    @Schema(description = "레벨", example = "1")
    private Integer wordLevel = 1;

    @Schema(description = "한자", example = "猫")
    private String wordChinese;

    @Schema(description = "주차", example = "1")
    private Integer wordWeek = 0;

    @Schema(description = "예제 목록")
    private ArrayList<WordExampleInfoVO> exampleList;

    // 단어 등록 후 selectKey로 조회해서 예제 등록에 사용
    @Schema(description = "단어 번호", hidden = true)
    private Integer wordNum;

}
