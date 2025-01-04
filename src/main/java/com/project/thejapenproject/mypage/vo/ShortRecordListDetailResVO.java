package com.project.thejapenproject.mypage.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 단답형 단어 테스트 상세 내역 반환 VO
 *
 * @author chanhan
 * @class : ShortRecordListDetailResVO
 * @since 2024-11-06 오후 08:44
 */
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ShortRecordListDetailResVO {

    @Schema(description = "문제 고유번호")
    private Integer strdNum;

    @Schema(description = "단어 번호")
    private Integer wordNum;

    @Schema(description = "입력한 답")
    private String strdChoiceWord;

    @Schema(description = "정답 단어")
    private String strdAnswerContent;

    @Schema(description = "정답 뜻")
    private String strdAnswerMeaning;

    @Schema(description = "정답 한자")
    private String strdAnswerChinese;

    @Schema(description = "정답 여부")
    private String strdResult;

    @Schema(description = "등록일")
    private String createdAt;

}
