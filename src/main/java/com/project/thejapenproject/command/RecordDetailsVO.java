package com.project.thejapenproject.command;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecordDetailsVO {

    @Schema(description = "테스트 상세 번호")
    private  Integer rdNum;

    @Schema(description = "테스트 번호")
    private Integer recordNum;

    @Schema(description = "단어 번호")
    private Integer wordNum;

    @Schema(description = "제출 여부")
    private boolean rdCheck;

    @Schema(description = "입력한 답")
    private String recordValue;

    @Schema(description = "단어 목록")
    private WordVO wordVO;
}
