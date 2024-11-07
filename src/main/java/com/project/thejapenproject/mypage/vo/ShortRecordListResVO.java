package com.project.thejapenproject.mypage.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ShortRecordListResVO {

    private String strNum;
    private Integer strAnswerPoint; // 총 점수
    private String userName;
    private String strTotalCount; // 전체 문제 수
    private String strAnswerCount; // 정답 수
    private String strInAnswerCount; // 오답 수
    private Integer strTime; // 풀이 시간
    private String strType; // 테스트 종류
    private String createdAt;
    private Integer totalElements;

}
