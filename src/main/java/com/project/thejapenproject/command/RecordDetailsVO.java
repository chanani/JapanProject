package com.project.thejapenproject.command;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecordDetailsVO {
    private  Integer rdNum;
    private Integer recordNum;
    private Integer wordNum;
    private boolean rdCheck;
    private String recordValue;

    private WordVO wordVO;
}
