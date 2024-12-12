package com.project.thejapenproject.mypage.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

/**
 * 단어 예문 정보 VO
 *
 * @author chanhan
 * @class : ExampleInfoVO
 * @since 2024-12-11 오후 09:19
 */
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ExampleInfoVO {

    // 예문 번호
    private Integer weNum;
    // 단어 번호
    private Integer wordNum;
    // 예문 내용
    private String weContent;
    // 예문 뜻
    private String weMeaning;
}
