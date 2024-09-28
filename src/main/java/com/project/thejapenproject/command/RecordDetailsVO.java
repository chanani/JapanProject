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
    private  Integer rd_num;
    private Integer record_num;
    private Integer word_num;
    private boolean rd_check;
    private String record_value;
    private WordVO wordVO;
}
