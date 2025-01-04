package com.project.thejapenproject.mypage.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ShortRecordListResVO {

    @Schema(description = "시험 정보")
    private String strNum;

    @Schema(description = "총 점수")
    private Integer strAnswerPoint;

    @Schema(description = "아이디")
    private String userName;

    @Schema(description = "전체 문제 수")
    private String strTotalCount;

    @Schema(description = "정답 수")
    private String strAnswerCount;

    @Schema(description = "오답 수")
    private String strInAnswerCount;

    @Schema(description = "풀이 시간")
    private Integer strTime;

    @Schema(description = "테스트 종류")
    private String strType;

    @Schema(description = "생성일")
    private String createdAt;

    @Schema(description = "총 데이터 수")
    private Integer totalElements;

}
