package com.project.thejapenproject.admin.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddWordListVO {

    private String wordContent;
    private String wordMeaning;
    private Integer wordLevel;
    private String wordChinese;
    private Integer wordWeek;


}
