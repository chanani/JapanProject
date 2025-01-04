package com.project.thejapenproject.mypage.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

/**
 * 단어 목록 반환 VO
 *
 * @author chanhan
 * @class : WordSearchListResVO
 * @since 2024-12-06 오후 10:01
 */


@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class WordSearchListResVO {

    @Schema(description = "단어 번호")
    private Integer wordNum;

    @Schema(description = "단어 뜻")
    private String wordMeaning;

    @Schema(description = "단어 내용")
    private String wordContent;

    @Schema(description = "단어 한자")
    private String wordChinese;

    @Schema(description = "단어 주차")
    private String wordWeek;

    @Schema(description = "예문 목록")
    private ArrayList<ExampleInfoVO> exampleList;

    @Schema(description = "전체 데이터 수")
    private Integer totalElements;

}
