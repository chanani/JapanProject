package com.project.thejapenproject.admin.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

/**
 * 단어 추가 시 예제 목록 VO
 *
 * @author chanhan
 * @class WordExampleInfoVO
 * @since 2024-12-10 오후 11:23
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WordExampleInfoVO {

    // 예제
    private String wordExampleContent;

    // 예제 풀이
    private String wordExampleMeaning;


}
