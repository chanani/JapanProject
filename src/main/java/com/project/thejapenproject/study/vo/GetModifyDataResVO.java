package com.project.thejapenproject.study.vo;

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

    private Integer wsNum;
    private String wsTitle;
    private ArrayList<WordInfo> wordList;

}
