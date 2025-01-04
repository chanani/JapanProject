package com.project.thejapenproject.mypage.vo;

import io.swagger.v3.oas.annotations.media.Schema;
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

    @Schema(description = "예문 번호")
    private Integer weNum;

    @Schema(description = "단어 번호")
    private Integer wordNum;

    @Schema(description = "예문 내용")
    private String weContent;

    @Schema(description = "예문 뜻")
    private String weMeaning;

}
