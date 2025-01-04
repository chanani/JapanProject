package com.project.thejapenproject.test.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 단어 단답형 테스트 목록 반환 VO
 *
 * @author chanhan
 * @class ShortTestListResVO
 * @since 2024-10-31 오후 10:17
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShortTestListResVO {

    @Schema(description = "단어 번호")
    private Integer wordNum;

    @Schema(description = "단어 뜻")
    private String wordMeaning;

    @Schema(description = "단어 내용")
    private String wordContent;

    @Schema(description = "단어 한자")
    private String wordChinese;
}
