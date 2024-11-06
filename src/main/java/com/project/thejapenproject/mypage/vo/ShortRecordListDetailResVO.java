package com.project.thejapenproject.mypage.vo;

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

    private Integer strdNum; // 문제 고유번호
    private Integer wordNum; // 단어 번호
    private String strdChoiceWord; // 입력한 답
    private String strdAnswerContent; // 정답 단어
    private String strdAnswerMeaning; // 정답 뜻
    private String strdAnswerChinese; // 정답 한자
    private String strdResult; // 정답 여부
    private String createdAt;

}
