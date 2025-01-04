package com.project.thejapenproject.admin.vo;

import io.swagger.v3.oas.annotations.media.Schema;
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

    @Schema(description = "예문", example = "私は猫です。")
    private String wordExampleContent;

    @Schema(description = "예문 풀이", example = "저는 고양이입니다.")
    private String wordExampleMeaning;


}
