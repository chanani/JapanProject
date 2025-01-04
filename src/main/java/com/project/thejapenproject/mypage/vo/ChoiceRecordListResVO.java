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
public class ChoiceRecordListResVO {

    @Schema(description = "단어 선택 테스트 번호")
    private String ctrNum;

    @Schema(description = "총 점수")
    private Integer ctrAnswerPoint;

    @Schema(description = "아이디")
    private String userName;

    @Schema(description = "전체 문제 수")
    private String ctrTotalCount;

    @Schema(description = "정답 수")
    private String ctrAnswerCount;

    @Schema(description = "오답 수")
    private String ctrInAnswerCount;

    @Schema(description = "풀이 시간")
    private Integer ctrTime;

    @Schema(description = "생성일")
    private String createdAt;

    @Schema(description = "총 데이터 수")
    private Integer totalElements;

}
