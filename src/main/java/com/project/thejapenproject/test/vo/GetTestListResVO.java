package com.project.thejapenproject.test.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetTestListResVO {

    private Integer wordNum;
    private String wordMeaning;
    private String wordContent;
    private String wordChinese;
}
