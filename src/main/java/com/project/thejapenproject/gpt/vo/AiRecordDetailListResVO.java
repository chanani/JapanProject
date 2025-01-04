package com.project.thejapenproject.gpt.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


/**
 * ai 학습 기록 목록 요청 VO
 *
 * @author chanhan
 * @class : AiRecordListResVO
 * @since 2024-11-24 오후 06:06
 */
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class AiRecordDetailListResVO {

    @Schema(description = "상세 기록 테이블 상세 번호", example = "1")
    private Integer aiRecordDetailNum;

    @Schema(description = "질문", example = "질문할께요")
    private String aiRecordSendData;

    @Schema(description = "답변", example = "답변합니다.")
    private String aiRecordAnswerData;
}
