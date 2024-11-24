package com.project.thejapenproject.gpt.vo;

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

    // 상세 기록 테이블 상세 번호
    private Integer aiRecordDetailNum;

    // 질문
    private String aiRecordSendData;

    // 답변
    private String aiRecordAnswerData;

}
