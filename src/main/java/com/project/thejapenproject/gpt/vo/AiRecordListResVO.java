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
 * @since 2024-11-23 오후 01:49
 */
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class AiRecordListResVO {

    // 기록 테이블 상세 번호
    private Integer aiRecordNum;
    // 제목
    private String aiRecordTitle;
    // 등록 기간(오늘, 지난 7일, 이 외로 반환)
    private String createdAt;

}