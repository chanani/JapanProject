package com.project.thejapenproject.test.vo;

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

    private Integer wordNum;
    private String wordMeaning;
    private String wordContent;
    private String wordChinese;
}
