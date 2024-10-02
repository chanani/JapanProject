package com.project.thejapenproject.command;

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

    private Integer recordNum;
    private Integer recordLevel;
    private Date recordDate;
    private Integer recordPoint;
    private boolean recordKind;

}
