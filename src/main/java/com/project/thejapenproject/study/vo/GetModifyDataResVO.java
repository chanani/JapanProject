package com.project.thejapenproject.study.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetModifyDataResVO {

    @Schema(description = "단어장 번호")
    private Integer wsNum;

    @Schema(description = "단어장 제목")
    private String wsTitle;

    @Schema(description = "단어장 목록")
    private ArrayList<WordInfo> wordList;

}
