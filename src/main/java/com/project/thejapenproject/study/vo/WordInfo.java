package com.project.thejapenproject.study.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WordInfo {


    // 히라가나
    private String wordContent;

    // 히라가나
    private String wordMeaning;

    // 한자
    private String wordChinese;
}

