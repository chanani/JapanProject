package com.project.thejapenproject.study.vo;

import io.swagger.v3.oas.annotations.media.Schema;
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

    @Schema(description = "단어 번호")
    private Integer wordNum;

    @Schema(description = "단어 뜻")
    private String wordMeaning;

    @Schema(description = "단어 한자")
    private String wordChinese;

    @Schema(description = "단어 내용")
    private String wordContent;

    @Schema(description = "총 데이터 수")
    private Integer totalElements;

}
