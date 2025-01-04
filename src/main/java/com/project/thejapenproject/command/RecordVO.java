package com.project.thejapenproject.command;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecordVO {

    @Schema(description = "테스트 번호")
    private Integer recordNum;

    @Schema(description = "레벨")
    private Integer recordLevel;

    @Schema(description = "등록일")
    private Date recordDate;

    @Schema(description = "점수")
    private Integer recordPoint;

    @Schema(description = "종류")
    private boolean recordKind;

    @Schema(description = "총 문제 수")
    private Integer totalElements;

}
