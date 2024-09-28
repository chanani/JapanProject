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
    private Integer record_num;
    private Integer record_level;
    private Date record_date;
    private Integer record_point;
    private boolean record_kind;

}
