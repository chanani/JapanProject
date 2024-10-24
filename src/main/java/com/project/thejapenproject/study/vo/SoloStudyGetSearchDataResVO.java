package com.project.thejapenproject.study.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SoloStudyGetSearchDataResVO {

    private Integer wordNum;
    private String wordContent;
    private String wordMeaning;
    private String wordChinese;

    private Integer totalElements;

}
