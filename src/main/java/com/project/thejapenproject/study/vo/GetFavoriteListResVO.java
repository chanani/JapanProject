package com.project.thejapenproject.study.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * 즐겨찾기 목록 응답 VO
 *
 * @author chanhan
 * @class : GetFavoriteListResVO
 * @since 2024-10-30 오후 09:18
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetFavoriteListResVO {

    // 단어 번호
    private Integer wordNum;

    // 단어 뜻
    private String wordMeaning;

    // 단어 한자
    private String wordChinese;

    // 단어 내용
    private String wordContent;

    // 토탈 수
    private Integer totalElements;

}
